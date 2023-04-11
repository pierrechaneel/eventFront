// modify contact number controller definition

import CustomerManager from "../../../src/helpers/CustomerManager";

const requestHandler = async (req, res) => {
  const {
    newContactAddr,
    newContactFN,
    newContactGender,
    newContactPN,
    newContactSN,
    accountCode,
    customerMsisdn,
    newContactNbr,
    level,
    newContactEmail,
  } = req?.query;

  console.log("req query", {
    newContactAddr,
    newContactFN,
    newContactGender,
    newContactPN,
    newContactSN,
    accountCode,
    customerMsisdn,
    newContactNbr,
    level,
    newContactEmail,
  });

  let processed = false;

  if (Number.parseInt(level) === 1) {
    await CustomerManager.setContactNbr1({
      customerMsisdn: customerMsisdn,
      newContactValue: newContactNbr,
    }).then((results) => {
      if (results?.processed) {
        processed = true;
      }
    });
  } else if (Number.parseInt(level) === 2) {
    await CustomerManager.getMainAccountProperties({
      customerMsisdn: customerMsisdn,
    })?.then(async (accountResults) => {
      if (accountResults?.processed) {
        await CustomerManager.setContactNbr2({
          newContactAddr,
          newContactFN,
          newContactGender,
          newContactNbr,
          newContactPN,
          newContactSN,
          accountCode: accountResults?.accountCode,
          newContactEmail,
        }).then(async (results) => {
          if (results?.processed) {
            processed = true;
          } else {
            await CustomerManager.createContactMan({
              newContactAddr,
              newContactFN,
              newContactGender,
              newContactNbr,
              newContactPN,
              newContactSN,
              accountCode: accountResults?.accountCode,
              newContactEmail,
            }).then((results) => {
              if (results?.processed) {
                processed = true;
              }
            });
          }
        });
      } else {
      }
    });
  }

  if (processed) {
    res.status(200).json({
      code: 200,
      message: "Modification effectuée avec success",
    });
  } else {
    res.status(400).json({
      code: 400,
      message: "La modification a échoué",
    });
  }
};

export default requestHandler;
