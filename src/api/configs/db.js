// db connection settings

import mysql from "mysql";
import developmentDbConfigs from "../.../../../../configs/development/database.json";
import testingDbConfigs from "../.../../../../configs/testing/database.json";
import productionDbConfigs from "../.../../../../configs/production/database.json";
import logger from "../../../src/utils/logger";

let dbConnection = {};

switch (process.env.NODE_ENV) {
  case "development":
    merchantsConfig = {
      server: developmentDbConfigs?.dbHost,
      authentication: {
        type: "default",
        options: {
          userName: developmentDbConfigs?.dbUsername,
          password: developmentDbConfigs?.dbPassword,
        },
      },
      options: {
        port: 1433,
        database: developmentDbConfigs?.dbName,
        trustServerCertificate: true,
      },
    };

    break;

  case "testing":
    merchantsConfig = {
      server: testingDbConfigs?.merchants?.dbHost,
      authentication: {
        type: "default",
        options: {
          userName: testingDbConfigs?.dbUsername,
          password: testingDbConfigs?.dbPassword,
        },
      },
      options: {
        port: 1433,
        database: testingDbConfigs?.dbName,
        trustServerCertificate: true,
      },
    };
    break;
  case "production":
    merchantsConfig = {
      server: productionDbConfigs?.merchants?.dbHost,
      authentication: {
        type: "default",
        options: {
          userName: productionDbConfigs?.dbUsername,
          password: productionDbConfigs?.dbPassword,
        },
      },
      options: {
        port: 1433,
        database: productionDbConfigs?.dbName,
        trustServerCertificate: true,
      },
    };
    break;

  default:
    break;
}

export default dbConnection;
