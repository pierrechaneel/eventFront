// customer account propoerties requirer

import CustomerManager from "../../../src/helpers/CustomerManager";

const requestHandler = async (req, res) => {
  const customerMsisdn = req?.query?.customerMsisdn;

  if (customerMsisdn?.length > 0) {
    let properties = {};

    await CustomerManager.getMainAccountProperties({ customerMsisdn }).then(
      (results) => {
        properties = results;
      }
    );

    res?.status(200).json({
      code: 200,
      properties,
    });
  } else {
    res?.status(400).json({
      code: 400,
      properties: null,
    });
  }
};

export default requestHandler;
