// controller definition

import BalanceManager from "../../../src/helpers/balanceManager";
import logger from "../../../src/utils/logger";

const handler = async (req, res) => {
  let balances = [];

  await BalanceManager.getCustomerBalances(req?.query?.customerMsisdn)
    .then((results) => {
      console.log("results", { results });
      if (results?.processed === true) {
        balances = results.result;
      } else {
        balances = null;
      }
    })
    .catch((error) => {
      logger.error(
        `an error has occured when calling the balance manager class get customer balance method ${error}`
      );

      balances = null;
    });

  if (balances !== null) {
    res.status(200).json({
      code: 200,
      balances,
    });
  } else {
    res.status(400).json({
      code: 400,
      balances,
    });
  }
};

export default handler;
