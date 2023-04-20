// customer manager class definition

import axios from "axios";

import developmentApiParams from "../../configs/development/apis.json";
import testingApiParams from "../../configs/testing/apis.json";
import productionApiParams from "../../configs/production/apis.json";
import logger from "../../src/utils/logger";
import configs from "../../configs/generals.json";

import XMLConvert from "xml-js";
import { v4 as uuid } from "uuid";

class CustomerManager {
  static async getMainAccountProperties({ customerMsisdn }) {
    let ocsUrl = ``;

    let processed = false;
    let accountCode = "";
    let customerName = "";
    let serviceClass = "";
    let mainBalance = "";

    console.log("received msisdn ", { customerMsisdn });

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

    let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com">\r\n   <soapenv:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${
      configs?.ocs?.user
    }</con:Username>\r\n         <con:Password>${
      configs?.ocs?.pwd
    }</con:Password>\r\n         <con:ActionID>queryProfileAndBal</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <con:queryProfileAndBal>\r\n         <con:QueryProfileAndBalReqDto>\r\n            <con:MSISDN>243${customerMsisdn?.slice(
      -9
    )}</con:MSISDN>\r\n            <con:CustAttrInputDtoList>\r\n               <con:CustAttrInputDto>\r\n                  <con:CustAttrCode></con:CustAttrCode>\r\n               </con:CustAttrInputDto>\r\n            </con:CustAttrInputDtoList>\r\n            <con:AcctAttrInputDtoList>\r\n               <con:AcctAttrInputDto>\r\n                  <con:AcctAttrCode></con:AcctAttrCode>\r\n               </con:AcctAttrInputDto>\r\n            </con:AcctAttrInputDtoList>\r\n            <con:SubsAttrInputDtoList>\r\n               <con:SubsAttrInputDto>\r\n                  <con:SubsAttrCode></con:SubsAttrCode>\r\n               </con:SubsAttrInputDto>\r\n            </con:SubsAttrInputDtoList>\r\n         </con:QueryProfileAndBalReqDto>\r\n      </con:queryProfileAndBal>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

    let config = {
      method: "POST",
      url: ocsUrl,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        SOAPAction: "urn:QueryProfileAndBal",
        "Accept-Encoding": "gzip,deflate",
      },
      data: data,
    };

    // console.log("customer request", { config });

    await axios(config)
      .then(function (response) {
        let requestRes = XMLConvert.xml2js(response?.data, {
          compact: true,
          spaces: 4,
        });

        processed = true;

        try {
          accountCode =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "queryProfileAndBalResponse"
            ]["queryProfileAndBalResponse"]["AccountCode"]["_text"];
        } catch (error) {
          logger.error(
            `an error has occured when getting the account code ${error}`
          );

          accountCode = null;
        }

        try {
          customerName =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "queryProfileAndBalResponse"
            ]["queryProfileAndBalResponse"]["CustomerName"]["_text"];
        } catch (error) {
          logger.error(
            `an error has occured when getting the customer name ${error}`
          );

          customerName = null;
        }

        try {
          serviceClass =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "queryProfileAndBalResponse"
            ]["queryProfileAndBalResponse"]["BrandCode"]["_text"];
        } catch (error) {
          logger.error(
            `an error has occured when getting the customer name ${error}`
          );

          serviceClass = null;
        }

        try {
          const balance =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "queryProfileAndBalResponse"
            ]["queryProfileAndBalResponse"]["BalDtoList"]["BalDto"][0][
              "Balance"
            ]["_text"];
          const expiryDate =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "queryProfileAndBalResponse"
            ]["queryProfileAndBalResponse"]["BalDtoList"]["BalDto"][0][
              "ExpDate"
            ]["_text"];

          const offerName = "Balance principale";

          mainBalance = {
            balance,
            expiryDate,
            offerName,
          };

          console.log("our balance obj", { mainBalance });
        } catch (error) {
          logger.error(
            `an error has occured when getting the customer name ${error}`
          );

          mainBalance = {};
        }
      })
      .catch(function (error) {
        logger.error(
          `an error has occured when trying to get the account code for customer ${customerMsisdn} ${error}`
        );

        customerName = null;
        accountCode = null;
      });

    return {
      processed,
      customerName,
      accountCode,
      serviceClass,
      mainBalance,
    };
  }

  static async getContactNbr1({ customerMsisdn }) {
    let ocsUrl = ``;

    // console.log("received customer msisdn", { customerMsisdn });

    let processed = false;
    let contactNumber = "";

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

    let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com">\r\n   <soapenv:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${
      configs?.ocs?.user
    }</con:Username>\r\n         <con:Password>${
      configs?.ocs?.pwd
    }</con:Password>\r\n         <con:ActionID>queryProdAttrValue</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <con:queryProdAttrValue>\r\n         <con:QueryProdAttrValueReqDto>\r\n            <con:MSISDN>243${customerMsisdn?.slice(
      -9
    )}</con:MSISDN>\r\n            <con:ProdAttrCode>${
      configs?.contactAttrName
    }</con:ProdAttrCode>\r\n         </con:QueryProdAttrValueReqDto>\r\n      </con:queryProdAttrValue>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'`;

    let config = {
      method: "POST",
      url: ocsUrl,
      headers: {
        SOAPAction:
          'queryProdAttrValue, \\"urn:schemas-upnp-org:service:WANIPConnection:1#ForceTermination\\"',
        "Content-Type": "text/xml",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        let requestRes = XMLConvert.xml2js(response?.data, {
          compact: true,
          spaces: 4,
        });

        processed = true;

        try {
          contactNumber =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "queryProdAttrValueResponse"
            ]["queryProdAttrValueResponse"]["AttrValue"]["_text"];
        } catch (error) {
          logger.error(
            `an error has occured when getting the contact number 1 ${error}`
          );

          contactNumber = null;
        }
      })
      .catch(function (error) {
        logger.error(
          `an error has occured when trying to get the contact number 1 for customer ${customerMsisdn} ${error}`
        );

        contactNumber = null;
      });

    return {
      processed,
      contactNumber: contactNumber ? contactNumber : null,
    };
  }

  static async getContactNbr2({ accountCode }) {
    let ocsUrl = ``;

    console.log("received account code: ", { accountCode });

    let processed = false;
    let contactNumber = null;
    let contactFirstName = null;
    let contactSurName = null;
    let contactPostName = null;
    let contactGender = null;
    let contactEmail = null;
    let contactAddress = null;

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

    let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com" xmlns:xsd="http://com.ztesoft.zsmart/xsd">\r\n   <soapenv:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${configs?.ocs?.user}</con:Username>\r\n         <con:Password>${configs?.ocs?.pwd}</con:Password>\r\n         <con:ActionID>queryAccountContactMan</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <xsd:QueryAccountContactManReqDto>\r\n         <xsd:AccountCode>${accountCode}</xsd:AccountCode>\r\n      </xsd:QueryAccountContactManReqDto>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

    let config = {
      method: "POST",
      url: ocsUrl,
      headers: {
        SOAPAction:
          'queryAccountContactMan, \\"urn:schemas-upnp-org:service:WANIPConnection:1#ForceTermination\\"',
        "Content-Type": "text/xml",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        let requestRes = XMLConvert.xml2js(response?.data, {
          compact: true,
          spaces: 4,
        });

        processed = true;

        try {
          contactNumber =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["ContactNum"]["_text"];

          contactFirstName =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["ContactFirstName"]["_text"];
          contactSurName =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["ContactSurName"]["_text"];
          contactPostName =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["ContactPostName"]["_text"];
          contactGender =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["Gender"]["_text"];
          contactEmail =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["Email"]["_text"];
          contactAddress =
            requestRes["soapenv:Envelope"]["soapenv:Body"][
              "ns:QueryAccountContactManRspDto"
            ]["Address"]["_text"];
        } catch (error) {
          logger.error(
            `an error has occured when getting the contact number 2 ${error}`
          );

          contactNumber = null;
        }
      })
      .catch(function (error) {
        logger.error(
          `an error has occured when trying to get the contact number 2 for customer ${customerMsisdn} ${error}`
        );

        contactNumber = null;
      });

    return {
      processed,
      contactNumber,
      contactAddress,
      contactFirstName,
      contactGender,
      contactPostName,
      contactSurName,
      contactEmail,
    };
  }

  static async setContactNbr1({ customerMsisdn, newContactValue }) {
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

    let data = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com">\r\n   <soap:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${
      configs?.ocs?.user
    }</con:Username>\r\n         <con:Password>${
      configs?.ocs?.pwd
    }</con:Password>\r\n         <con:ActionID>modProdAttrValue</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soap:Header>\r\n   <soap:Body>\r\n      <con:ModProdAttrValue>\r\n         <con:ModProdAttrValueReqDto>\r\n            <con:MSISDN>243${customerMsisdn?.slice(
      -9
    )}</con:MSISDN>\r\n            <con:ProdAttrCode>${
      configs?.contactAttrName
    }</con:ProdAttrCode>\r\n            <con:AttrValue>243${newContactValue?.slice(
      -9
    )}</con:AttrValue>\r\n         </con:ModProdAttrValueReqDto>\r\n      </con:ModProdAttrValue>\r\n   </soap:Body>\r\n</soap:Envelope>`;

    let config = {
      method: "POST",
      url: ocsUrl,
      headers: {
        SOAPAction: "modProdAttrValue",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        action: "urn:ModProdAttrValue",
        "Content-Type": "application/soap+xml",
        "Accept-Encoding": "gzip,deflate",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        let requestRes = XMLConvert.xml2js(response?.data, {
          compact: true,
          spaces: 4,
        });

        processed = true;
      })
      .catch(function (error) {
        logger.error(
          `an error has occured when trying to get the account code for customer ${customerMsisdn} ${error}`
        );
      });

    return {
      processed,
    };
  }

  static async setContactNbr2({
    newContactAddr,
    newContactFN,
    newContactPN,
    newContactSN,
    newContactGender,
    newContactNbr,
    newContactEmail,
    accountCode,
  }) {
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

    let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com" xmlns:xsd="http://com.ztesoft.zsmart/xsd">\r\n   <soapenv:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${
      configs?.ocs?.user
    }</con:Username>\r\n         <con:Password>${
      configs?.ocs?.pwd
    }</con:Password>\r\n         <con:ActionID>modifyAccountContactMan</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <xsd:ModifyAccountContactManReqDto>\r\n         <xsd:AccountCode>${accountCode}</xsd:AccountCode>\r\n         <xsd:ContactNum>${newContactNbr?.slice(
      -9
    )}</xsd:ContactNum>\r\n         <xsd:ContactFirstName>${newContactFN}</xsd:ContactFirstName>\r\n         <xsd:ContactSurName>${newContactSN}</xsd:ContactSurName>\r\n         <xsd:ContactPostName>${newContactPN}</xsd:ContactPostName>\r\n         <xsd:Gender>${newContactGender}</xsd:Gender>\r\n         <xsd:Email>${newContactEmail}</xsd:Email>\r\n         <xsd:Address>${newContactAddr}</xsd:Address>\r\n      </xsd:ModifyAccountContactManReqDto>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

    let config = {
      method: "POST",
      url: ocsUrl,
      headers: {
        SOAPAction: "urn:modifyAccountContactMan",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Content-Type": " text/xml;charset=UTF-8",
        "Accept-Encoding": "gzip,deflate",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        let requestRes = XMLConvert.xml2js(response?.data, {
          compact: true,
          spaces: 4,
        });

        processed =
          requestRes["soapenv:Envelope"]["soapenv:Header"]["ret:ReturnMessage"][
            "ret:ResultDesc"
          ]["_text"] === "SUCCESS_OK";
      })
      .catch(function (error) {
        logger.error(
          `an error has occured when trying to get the account code for customer ${customerMsisdn} ${error}`
        );
      });

    return {
      processed,
    };
  }

  static async createContactMan({
    newContactAddr,
    newContactFN,
    newContactPN,
    newContactSN,
    newContactGender,
    newContactNbr,
    newContactEmail,
    accountCode,
  }) {
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

    let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://congo.customization.ws.bss.zsmart.ztesoft.com" xmlns:xsd="http://com.ztesoft.zsmart/xsd">\r\n   <soapenv:Header>\r\n      <con:AuthHeader>\r\n         <con:Username>${
      configs?.ocs?.user
    }</con:Username>\r\n         <con:Password>${
      configs?.ocs?.pwd
    }</con:Password>\r\n         <con:ActionID>addAccountContactMan</con:ActionID>\r\n         <con:RequestID>${requestID}</con:RequestID>\r\n      </con:AuthHeader>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <xsd:AddAccountContactManReqDto>\r\n         <xsd:AccountCode>${accountCode}</xsd:AccountCode>\r\n         <xsd:ContactNum>${newContactNbr?.slice(
      -9
    )}</xsd:ContactNum>\r\n         <xsd:ContactFirstName>${newContactFN}</xsd:ContactFirstName>\r\n         <xsd:ContactSurName>${newContactSN}</xsd:ContactSurName>\r\n         <xsd:ContactPostName>${newContactPN}</xsd:ContactPostName>\r\n         <xsd:Gender>${newContactGender}</xsd:Gender>\r\n         <xsd:Email>${newContactEmail}</xsd:Email>\r\n         <xsd:Address>${newContactAddr}</xsd:Address>\r\n      </xsd:AddAccountContactManReqDto>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

    let config = {
      method: "POST",
      url: ocsUrl,
      headers: {
        SOAPAction: "urn:AddAccountContactMan",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Content-Type": " text/xml;charset=UTF-8",
        "Accept-Encoding": "gzip,deflate",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        let requestRes = XMLConvert.xml2js(response?.data, {
          compact: true,
          spaces: 4,
        });

        // console.log("received res from mod 2", JSON.stringify(requestRes));

        processed = true;
      })
      .catch(function (error) {
        logger.error(
          `an error has occured when trying to get the account code for customer ${customerMsisdn} ${error}`
        );
      });

    return {
      processed,
    };
  }
}

export default CustomerManager;
