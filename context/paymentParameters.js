// Socket context definition

import axios from "axios";
import * as React from "react";

const PaymentParameters = React.createContext({});

const PaymentParamsContext = ({ children }) => {
  const [paymentParameters, setpaymentParameters] = React.useState({
    canal: "",
    payerMsisdn: "",
    currency: "",
    bundlePrice: "",
    offerDuration: "",
    offerName: "",
    offerCode: "",
    paymentSource: "",
  });

  const [contactObject, setContactObject] = React.useState({});

  const [customerMsisdn, setCustomerMsisdn] = React.useState("");

  const [triggerMessage, setTriggerMessage] = React.useState("");

  const [customerProperties, setCustomerProperties] = React.useState({
    customerName: "",
    serviceClass: "",
    mainBalance: {},
  });

  const [customerMainAccount, setCustomerMainAccount] = React.useState({});

  const [transitState, setTransitState] = React.useState(false);

  return (
    <PaymentParameters.Provider
      value={{
        paymentParameters,
        setpaymentParameters,
        contactObject,
        setContactObject,
        customerProperties,
        setCustomerProperties,
        customerMsisdn,
        setCustomerMsisdn,
        triggerMessage,
        customerMainAccount,
        setCustomerMainAccount,
        transitState,
        setTransitState,
        setTriggerMessage,
      }}
    >
      {children}
    </PaymentParameters.Provider>
  );
};

export { PaymentParameters };
export default PaymentParamsContext;
