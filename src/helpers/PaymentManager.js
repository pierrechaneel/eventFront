// payment manager class definition

import axios from "axios";

import developmentApiParams from "../../configs/development/apis.json";
import testingApiParams from "../../configs/testing/apis.json";
import productionApiParams from "../../configs/production/apis.json";
import logger from "../../src/utils/logger";

import configs from "../../configs/generals.json";
import XMLConvert from "xml-js";
import { v4 as uuid } from "uuid";
import getPushBody from "../utils/getPushBody";

class PaymentManager {
  static async processOMPay({
    receiverMsisdn,
    payerMsisdn,
    offerCode,
    offerComName,
    bundlePrice,
    currency,
  }) {
    let omPaymentUrl = ``;
    let processed = false;

    switch (process.env.NODE_ENV) {
      case "development":
        omPaymentUrl = developmentApiParams?.cellcubePush;

        break;
      case "testing":
        omPaymentUrl = testingApiParams?.cellcubePush;

        break;
      case "production":
        omPaymentUrl = productionApiParams?.cellcubePush;

        break;

      default:
        break;
    }

    const data = await getPushBody({
      bundlePrice,
      currency,
      offerCode,
      offerComName,
      payerMsisdn,
      receiverMsisdn,
    });

    let config = {
      method: "POST",
      url: omPaymentUrl,
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/xml",
      },
      data: data,
    };

    console.log("actually running on", { path: process.env.NODE_ENV });

    await axios(config)
      .then((results) => {
        console.log("cellcube push results", { results });

        processed = true;
      })
      .catch((error) => {
        logger.error(
          `an error has occured when performing push ussd payment ${error}`
        );

        console.log("cellcube push error", error);
      });

    return {
      processed,
    };
  }

  static async checkEligibility({ receiverMsisdn, offerCode }) {
    let omPaymentUrl = ``;
    let processed = false;
    let isCustomerAllowed = false;

    switch (process.env.NODE_ENV) {
      case "development":
        omPaymentUrl = developmentApiParams?.cellcubePush;

        break;
      case "testing":
        omPaymentUrl = testingApiParams?.cellcubePush;

        break;
      case "production":
        omPaymentUrl = productionApiParams?.cellcubePush;

        break;

      default:
        break;
    }

    await axios
      .post(
        `${omPaymentUrl}/check/offer`,
        {
          msisdn: receiverMsisdn,
          offerCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((results) => {
        if (results?.data?.isAllowed === true) {
          processed = true;
          isCustomerAllowed = true;
        } else {
          processed = true;
          isCustomerAllowed = false;
        }
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to check eligibility for ${receiverMsisdn} ${error}`
        );
      });

    return {
      processed,
      isCustomerAllowed,
    };
  }

  static async processHomeBoxPay({ homeboxMsisdn, offerCode }) {
    let ocsUrl = ``;
    let processed = false;

    switch (process.env.NODE_ENV) {
      case "development":
        ocsUrl = developmentApiParams?.ocs;

        break;
      case "testing":
        ocsUrl = testingApiParams?.ocs;

        break;
      case "production":
        ocsUrl = productionApiParams?.ocs;

        break;

      default:
        break;
    }

    let requestID = `011aosPage${uuid().toString().replaceAll("-", "")}`;

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com">\r\n   <soapenv:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${
      configs?.ocs?.user
    }</con:Username>\r\n         <con:Password>${
      configs?.ocs?.pwd
    }</con:Password>\r\n         <con:ActionID>ModUserIndiPricePlanReqDto</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <con:modUserIndiPricePlan>\r\n         <con:ModUserIndiPricePlanReqDto>\r\n            <con:MSISDN>243${homeboxMsisdn?.slice(
      -9
    )}</con:MSISDN>\r\n            <con:UserPwd></con:UserPwd>\r\n            <con:PricePlanLevel></con:PricePlanLevel>\r\n            <con:PricePlanChgDtoList>\r\n               <con:PricePlanChgDto>\r\n                  <con:PricePlanCode>${offerCode}</con:PricePlanCode>\r\n                  <con:Action>1</con:Action>\r\n                  <con:EffType></con:EffType>\r\n                  <con:EffDate></con:EffDate>\r\n                  <con:ExpDate></con:ExpDate>\r\n                  <con:PricePlanAttrDtoList>\r\n                     <con:PricePlanAttrDto>\r\n                        <con:PricePlanAttrCode></con:PricePlanAttrCode>\r\n                        <con:PricePlanAttrValue></con:PricePlanAttrValue>\r\n                     </con:PricePlanAttrDto>\r\n                  </con:PricePlanAttrDtoList>\r\n               </con:PricePlanChgDto>\r\n            </con:PricePlanChgDtoList>\r\n            <con:ChargeFlag></con:ChargeFlag>\r\n            <con:Comments></con:Comments>\r\n            <con:Location></con:Location>\r\n         </con:ModUserIndiPricePlanReqDto>\r\n      </con:modUserIndiPricePlan>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

    await axios
      .post(`${ocsUrl}`, data, {
        headers: {
          SOAPAction: '"urn:modUserIndiPricePlan"',
          "Cache-Control": "no-cache",
          "Content-Type": "text/xml;charset=UTF-8",
          "Accept-Encoding": "gzip,deflate",
        },
      })
      .then((results) => {
        let requestRes = XMLConvert.xml2js(results?.data, {
          compact: true,
          spaces: 4,
        });

        try {
          processed =
            requestRes["soapenv:Envelope"]["soapenv:Header"][
              "ret:ReturnMessage"
            ]["ret:ResultDesc"]["_text"] === "SUCCESS_OK";
        } catch (error) {
          logger.error(
            `ocs homebox payment doesn't have description for ${homeboxMsisdn} ${error}`
          );
        }
      })
      .catch((error) => {
        logger.error(
          `an error has occured when performing homebox payment via modUserInd for ${homeboxMsisdn} ${error}`
        );
      });

    return {
      processed,
    };
  }

  static async processMyriadPay({
    offerCode,
    offerComName,
    payerMsisdn,
    receiverMsisdn,
  }) {
    let myriadPaymentUrl = ``;
    let processed = false;

    switch (process.env.NODE_ENV) {
      case "development":
        myriadPaymentUrl = developmentApiParams?.myriadBundlePayment;

        break;
      case "testing":
        myriadPaymentUrl = testingApiParams?.myriadBundlePayment;

        break;
      case "production":
        myriadPaymentUrl = productionApiParams?.myriadBundlePayment;

        break;

      default:
        break;
    }

    const data = `<COMMAND>\r\n  <TYPE> SaleBundleBoxMyriad</TYPE>\r\n  <MSISDN>0${receiverMsisdn?.slice(
      -9
    )}</MSISDN>\r\n  <MSISDN2>0${payerMsisdn?.slice(
      -9
    )}</MSISDN2>\r\n  <PPComName>${offerComName}</PPComName>\r\n  <PPCode1>${offerCode}</PPCode1>\r\n  <PPCode>${offerCode}</PPCode>\r\n  <DATE>${new Date()?.toLocaleString(
      "fr-FR"
    )}</DATE>\r\n</COMMAND>\r\n`;

    await axios
      .post(`${myriadPaymentUrl}/databox`, data, {
        headers: {
          "Content-Type": "application/xml",
        },
      })
      .then((results) => {
        let requestRes = XMLConvert.xml2js(results?.data, {
          compact: true,
          spaces: 4,
        });

        try {
          processed =
            requestRes["COMMAND"]["RESULTDESC"]["_text"] === "SUCCESS";
        } catch (error) {
          logger.error(
            `an error has occured when trying to get status of myriad payment external for ${receiverMsisdn} by ${payerMsisdn} ${error}`
          );
        }
      })
      .catch((error) => {
        logger.error(
          `an error has occured when performing myriad payment by ${payerMsisdn} for ${receiverMsisdn} ${error}`
        );
      });

    return {
      processed,
    };
  }
}

export default PaymentManager;
