// OM payment controller definition

import PaymentManager from "../../../src/helpers/PaymentManager";
import logger from "../../../src/utils/logger";

const requestHandler = async (req, res) => {
  const offerCode = req?.query?.offerCode;
  const offerComName = req?.query?.offerComName;
  const payerMsisdn = req?.query?.payerMsisdn;
  const receiverMsisdn = req?.query?.receiverMsisdn;
  const bundlePrice = req?.query?.bundlePrice;
  const currency = req?.query?.currency?.toLowerCase();

  await PaymentManager?.checkEligibility({
    receiverMsisdn,
    offerCode,
  })
    .then(async (checkResults) => {
      if (checkResults?.isCustomerAllowed === true || true) {
        await PaymentManager?.processOMPay({
          receiverMsisdn,
          payerMsisdn,
          offerCode,
          offerComName,
          bundlePrice,
          currency,
        })
          ?.then((omResults) => {
            if (omResults?.processed === true) {
              res?.status(200)?.json({
                code: 200,
                message: "Redirection USSD effectuée",
              });
            } else {
              res?.status(400)?.json({
                code: 400,
                message: "Une erreur est survenue, réessayer plus tard",
              });
            }
          })
          ?.catch((error) => {
            logger.error(
              `an error has occured when processing OM payments ${payerMsisdn} for ${receiverMsisdn} ${error}`
            );

            res?.status(400)?.json({
              code: 400,
              message: "Une erreur est survenue, réessayer plus tard",
            });
          });
      } else {
        res?.status(300)?.json({
          code: 300,
          message: "Le bénéficiaire n'est pas éligible",
        });
      }
    })
    .catch((error) => {
      logger.error(
        `an error has occured when checking the eligibility ot the customer ${receiverMsisdn} on OM payment ${error}`
      );

      res?.status(400)?.json({
        code: 400,
        message: "Une erreur est survenue. Réessayer plus tard .",
      });
    });
};

export default requestHandler;
