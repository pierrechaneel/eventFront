// get contact controller definition

import CustomerManager from "../../../src/helpers/CustomerManager";

const requestHandler = async (req, res) => {
  const customerMsisdn = req?.query?.customerMsisdn;
  let customerContact1 = null;
  let customerContact2 = null;
  let contactFirstName = null;
  let contactSurName = null;
  let contactPostName = null;
  let contactGender = null;
  let contactEmail = null;
  let contactAddress = null;

  // console.log("received customer number", { customerMsisdn });

  await CustomerManager.getContactNbr1({ customerMsisdn })?.then(
    async (nbr1Results) => {
      if (nbr1Results?.processed) {
        customerContact1 = nbr1Results?.contactNumber;
      } else {
      }
    }
  );

  await CustomerManager.getMainAccountProperties({ customerMsisdn }).then(
    async (accountResults) => {
      if (accountResults?.processed) {
        await CustomerManager?.getContactNbr2({
          accountCode: accountResults?.accountCode,
        }).then(async (nb2Results) => {
          if (nb2Results?.processed) {
            customerContact2 = nb2Results?.contactNumber;
            contactFirstName = nb2Results?.contactFirstName;
            contactSurName = nb2Results?.contactSurName;
            contactPostName = nb2Results?.contactPostName;
            contactGender = nb2Results?.contactGender;
            contactEmail = nb2Results?.contactEmail;
            contactAddress = nb2Results?.contactAddress;
          } else {
          }
        });
      } else {
      }
    }
  );

  // console.log("results", { customerContact1, customerContact2 });

  if (customerContact1 !== null || customerContact2 !== null) {
    res.status(200).json({
      code: 200,
      message: "Les numéros associés à la box",
      contacts: [
        {
          msisdn: customerContact1,
          level: 1,
          title: "Mon 1er numéro",
          link: "/identity/contact-number",
        },
        {
          msisdn: customerContact2,
          firstName: contactFirstName,
          surName: contactSurName,
          postName: contactPostName,
          gender: contactGender,
          email: contactEmail,
          address: contactAddress,
          level: 2,
          title: "Mon 2nd numéro",
          link: "/identity/contact-number",
        },
      ],
    });
  } else {
    res?.status(300)?.json({
      code: 300,
      message: "Veuillez réessayer plus tard",
    });
  }
};

export default requestHandler;
