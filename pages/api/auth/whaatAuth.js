// whaat authentication controller definition

import AuthManager from "../../../src/helpers/AuthManager";
import logger from "../../../src/utils/logger";

const requestHandler = async (req, res) => {
  const customerMsisdn = req?.query?.msisdn;

  await AuthManager.whaatAuth({ customerMsisdn })
    .then((results) => {
      console.log("received whatt params", { customerMsisdn, results });

      if (results?.isAuthenticated) {
        res?.status(200).json({
          authenticated: true,
        });
      } else {
        res?.status(200)?.json({
          authenticated: false,
        });
      }
    })
    .catch((error) => {
      logger.error(
        `an error has occured when performing whaat authentication ${error}`
      );

      res?.status(403)?.json({
        authenticated: false,
      });
    });
};

export default requestHandler;
