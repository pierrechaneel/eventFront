// Orange Whaat Manger class definition
import axios from "axios";

import developmentApiParams from "../configs/development/apis.json";
import productionApiParams from "../configs/production/apis.json";
import logger from "../utils/logs";

import configs from "../../configs/generals.json";

class WhaatManager {
  static async getMsisidn(ipAdress) {
    let whaatUrl = ``;

    switch (process.env.NODE_ENV) {
      case "development":
        if (purpose === "status") {
          whaatUrl = developmentApiParams?.oseStatus;
        } else {
          whaatUrl = developmentApiParams?.oseTopup;
        }
        break;
      case "testing":
        if (purpose === "status") {
          whaatUrl = testingApiParams?.oseStatus;
        } else {
          whaatUrl = testingApiParams?.oseTopup;
        }
        break;
      case "production":
        if (purpose === "status") {
          whaatUrl = productionApiParams?.oseStatus;
        } else {
          whaatUrl = productionApiParams?.oseTopup;
        }
        break;

      default:
        break;
    }
  }
}

export default WhaatManager;
