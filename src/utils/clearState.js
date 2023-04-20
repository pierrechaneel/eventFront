// clear state function definiton

import * as React from "react";

import PaymentParameters from "../../context/paymentParameters";

const clearState = () => {
  const setCustomerParams =
    React.useContext(PaymentParameters).setPaymentParameters;
  const customerParams = React.useContext(PaymentParameters).paymentParameters;

  const setTransitState = React.useContext(PaymentParameters).setTransitState;

  console.log("initial payment parameters", { customerParams });

  // clearing

  setTransitState(false);

  Object.keys(customerParams)?.forEach((target) => {
    customerParams[key] = "";
  });

  console.log("final payment parameters", { customerParams });

  setCustomerParams(customerParams);

  return true;
};

export default clearState;
