// push body setter definition

import configs from "../../configs/generals.json";

const getPushBody = async ({
  receiverMsisdn,
  payerMsisdn,
  bundlePrice,
  offerCode,
  currency,
  offerComName,
}) => {
  return `<?xml version=\'1.0\'?>\r\n<methodCall>\r\n\t<methodName>push.ussdbyMsisdn</methodName>\r\n\t<params>\r\n\t\t<param>\r\n\t\t\t<value>\r\n\t\t\t\t<string>+243${payerMsisdn?.slice(
    -9
  )}</string>\r\n\t\t\t</value>\r\n\t\t</param>\r\n\t\t<param>\r\n\t\t\t<value>\r\n\t\t\t\t<struct>\r\n\t\t\t\t\t<member>\r\n\t\t\t\t\t\t<name>message</name>\r\n\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t<string>${
    configs?.pushUssdPath
  }</string>\r\n\t\t\t\t\t\t</value>\r\n\t\t\t\t\t</member>\r\n\t\t\t\t\t<member>\r\n\t\t\t\t\t\t<name>variable</name>\r\n\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t<array>\r\n\t\t\t\t\t\t\t\t<data>\r\n\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t<struct>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>service_name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>tango</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>MSISDN</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>value</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>${payerMsisdn?.slice(
    -9
  )}</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t</struct>\r\n\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t<struct>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>service_name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>tango</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>MSISDN2</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>value</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>0${receiverMsisdn?.slice(
    -9
  )}</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t</struct>\r\n\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t<struct>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>service_name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>tango</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>offerCode</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>value</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>${offerCode?.trim()}</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t</struct>\r\n\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t<struct>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>service_name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>tango</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>amount</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>value</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>${bundlePrice}</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t</struct>\r\n\t\t\t\t\t\t\t\t\t</value>\r\n\r\n\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t<struct>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>service_name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>tango</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>currency</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>value</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>${currency?.toUpperCase()}</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t</struct>\r\n\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t<struct>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>service_name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>tango</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>name</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>offerComName</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t\t<member>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<name>value</name>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<value>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<string>${offerComName}</string>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t\t\t\t</member>\r\n\t\t\t\t\t\t\t\t\t\t</struct>\r\n\t\t\t\t\t\t\t\t\t</value>\r\n\t\t\t\t\t\t\t\t</data>\r\n\t\t\t\t\t\t\t</array>\r\n\t\t\t\t\t\t</value>\r\n\t\t\t\t\t</member>\r\n\t\t\t\t</struct>\r\n\t\t\t</value>\r\n\t\t</param>\r\n\t</params>\r\n</methodCall>`;
};

export default getPushBody;
