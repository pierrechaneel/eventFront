// authentication manager class definition

import axios from "axios";

import developmentApiParams from "../../configs/development/apis.json";
import testingApiParams from "../../configs/testing/apis.json";
import productionApiParams from "../../configs/production/apis.json";
import logger from "../utils/logger";

class AuthManager {
  static async whaatAuth({ customerMsisdn }) {
    let whaatUrl = ``;

    let processed = false;

    let isAuthenticated = false;

    console.log("received customer", { customerMsisdn });

    switch (process.env.NODE_ENV) {
      case "development":
        whaatUrl = developmentApiParams?.whaatAuth;

        break;

      case "testing":
        whaatUrl = testingApiParams?.whaatAuth;

        break;

      case "production":
        whaatUrl = productionApiParams?.whaatAuth;

        break;

      default:
        break;
    }

    await axios
      .get(whaatUrl)
      ?.then((results) => {
        processed = true;

        let callingID = results?.data
          ?.split("\n")
          ?.find((header) => header?.includes("HTTP_X_CALLINGID"));

        callingID = callingID?.split("=")[1]?.split("");

        callingID?.pop();

        callingID?.shift();

        if (callingID === customerMsisdn?.toString()) {
          isAuthenticated = true;
        }
      })
      .catch((error) => {
        logger.error(
          `an error has occured when trying authenticate customer with Whaat ${error}`
        );
      });

    return {
      processed,
      isAuthenticated,
    };
  }
}

export default AuthManager;
