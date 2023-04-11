// homebox payment controller definition

import PaymentManager from "../../../src/helpers/PaymentManager";
import logger from "../../../src/utils/logger";

const requestHandler = async (req, res) => {
  const homeboxMsisdn = req?.query?.homeboxMsisdn;
  const offerCode = req?.query?.offerCode;

  await PaymentManager?.checkEligibility({
    receiverMsisdn: homeboxMsisdn,
    offerCode,
  })
    .then(async (checkResults) => {
      if (checkResults?.isCustomerAllowed === true || true) {
        await PaymentManager?.processHomeBoxPay({ homeboxMsisdn, offerCode })
          ?.then((boxResults) => {
            if (boxResults?.processed) {
              res?.status(200).json({
                code: 200,
                message: "Paiement effectué avec succès",
              });
            } else {
              res.status(400).json({
                code: 400,
                message: "Une erreur est survenue. Réessayer plus tard",
              });
            }
          })
          .catch((error) => {
            logger.error(
              `an error has occured when processing homebox payment ${homeboxMsisdn} ${error}`
            );

            res.status(400).json({
              code: 400,
              message: "Une erreur est survenue. Réessayer plus tard",
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
        `an error has occured when checking the eligibility ot the customer ${receiverMsisdn} on homebox payment ${error}`
      );

      res?.status(400)?.json({
        code: 400,
        message: "Une erreur est survenue. Réessayer plus tard .",
      });
    });
};

export default requestHandler;
