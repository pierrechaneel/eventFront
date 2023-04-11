// external payments controller  definition

import PaymentManager from "../../../src/helpers/PaymentManager";
import logger from "../../../src/utils/logger";

const requestHandler = async (req, res) => {
  const payerMsisdn = req?.query?.payer;
  const receiverMsisdn = req?.query?.receiver;
  const offerCode = req?.query?.offerCode;
  const offerComName = req?.query?.offerComName;

  await PaymentManager?.checkEligibility({
    receiverMsisdn,
    offerCode,
  })
    .then(async (checkResults) => {
      if (checkResults?.isCustomerAllowed === true) {
        await PaymentManager.processMyriadPay({
          offerCode,
          offerComName,
          payerMsisdn,
          receiverMsisdn,
        })
          ?.then((paymentResults) => {
            if (paymentResults?.processed == true) {
              res.status(200).json({
                code: 200,
                message: "Paiement effectué avec succès",
              });
            } else {
              res?.status(400)?.json({
                code: 400,
                message: "Une erreur est survenue. Réessayer plus tard .",
              });
            }
          })
          .catch((error) => {
            logger.error(
              `an error has occured when trying to process external payment ${receiverMsisdn} for ${receiverMsisdn} ${error}`
            );

            res?.status(400)?.json({
              code: 400,
              message: "Une erreur est survenue. Réessayer plus tard .",
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
        `an error has occured when checking the eligibility of the customer ${receiverMsisdn} ono external payment ${error}`
      );

      res?.status(400)?.json({
        code: 400,
        message: "Une erreur est survenue. Réessayer plus tard .",
      });
    });
};

export default requestHandler;
