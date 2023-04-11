// balance manager class definition

import axios from "axios";

import developmentApiParams from "../../configs/development/apis.json";
import testingApiParams from "../../configs/testing/apis.json";
import productionApiParams from "../../configs/production/apis.json";
import logger from "../../src/utils/logger";

import configs from "../../configs/generals.json";

class BalanceManager {
  static async getCustomerBalances(customerMsisdn) {
    let balanceEndpoint = ``;

    switch (process.env.NODE_ENV) {
      case "development":
        balanceEndpoint = developmentApiParams?.checkBalance;

        break;

      case "testing":
        balanceEndpoint = testingApiParams?.checkBalance;

        break;

      case "production":
        balanceEndpoint = productionApiParams?.checkBalance;

        break;

      default:
        break;
    }

    let customerBalances = [];
    let balanceStr = "";

    await axios
      .post(
        `${balanceEndpoint}/api/v1/check/type`,
        {
          msisdn: customerMsisdn,
          sms: false,
          type: "Internet",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (results) => {
        console.log("balance results", results?.data, { customerMsisdn });

        balanceStr = results?.data?.response?.split("Vous avez : ")[1];
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying to get the data balance for ${customerMsisdn} ${error}`
        );
      });

    console.log("balance str", { balanceStr });

    if (balanceStr?.includes("MB")) {
      customerBalances = balanceStr
        ?.split(" , ")
        ?.filter((str) => str?.includes("MB"))
        ?.map((target) => {
          let balanceObj = {
            expiryDate: "",
            balance: "",
            offerName: "",
          };

          const targetTab = target?.split("exp:");

          console.log("here it is", targetTab[0]?.split(":"));

          balanceObj["expiryDate"] = targetTab[1]?.trim();
          balanceObj["offerName"] = targetTab[0]?.split("(")[1].split(")")[0];
          balanceObj["balance"] = targetTab[0]?.split(" ")[0];

          return balanceObj;
        });

      return {
        processed: true,
        result: customerBalances,
      };
    } else {
      return {
        processed: false,
        result: null,
      };
    }
  }
}

export default BalanceManager;
