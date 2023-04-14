// app auth component definition

import * as React from "react";

import { AppLayout } from "./";
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { PaymentParameters } from "../../context/paymentParameters";
import configs from "../../configs/generals.json";

const AppAuth = ({}) => {
  const theme = useTheme();

  const router = useRouter();

  const whaatBody = React.useRef(null);

  React.useEffect(() => {
    const iframeBody = whaatBody?.current;

    console.log("whatt content", iframeBody?.contentWindow);
  }, []);

  const [isNotAuthenticated, setIsNotAuthenticated] = React.useState(false);

  const setCustomerMsisdn =
    React?.useContext(PaymentParameters)?.setCustomerMsisdn;

  const customerMsisdn = React?.useContext(PaymentParameters)?.customerMsisdn;

  const setTriggerMessage =
    React?.useContext(PaymentParameters)?.setTriggerMessage;

  const setCustomerProperties =
    React?.useContext(PaymentParameters)?.setCustomerProperties;

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const handleRetry = async (event) => {
    event?.preventDefault();

    let querystring = window?.location?.search;

    const queryObject = new URLSearchParams(querystring);

    const customerMsisdn = queryObject.get("msisdn");
    const triggerMessage = queryObject.get("triggerMessage");

    (async () => {
      setIsNotAuthenticated(false);

      await axios
        .get(configs?.whaatUrl, {
          headers: {
            "Content-Type": "text/html",
          },
        })
        ?.then((results) => {
          console.log("whaat data", results?.data?.split("\n"));

          let callingID = results?.data
            ?.split("\n")
            ?.find((header) => header?.includes("HTTP_X_CALLINGID"));

          callingID = callingID?.split("=")[1]?.split("");

          callingID?.pop();

          callingID?.shift();

          if (callingID === customerMsisdn?.toString()) {
            setCustomerMsisdn(customerMsisdn);

            window.localStorage.setItem("custMsisdn", customerMsisdn);
            window.localStorage.setItem("custMsg", triggerMessage);

            router.push("/consumption");
          } else {
            setIsNotAuthenticated(true);
          }
        })
        .catch((error) => {
          console.error(
            `an error has occured when trying authenticate customer with Whaat ${error}`
          );

          setIsNotAuthenticated(true);
        });

      router.push("/consumption");
      setCustomerMsisdn(customerMsisdn);

      setTriggerMessage(triggerMessage);
    })();
  };

  React.useEffect(() => {
    (async () => {
      let querystring = window?.location?.search;

      const queryObject = new URLSearchParams(querystring);

      const customerMsisdn = queryObject.get("msisdn");
      const triggerMessage = queryObject.get("triggerMessage");

      (async () => {
        await axios
          .get(`/api/customers/get-properties?customerMsisdn=${customerMsisdn}`)
          .then((results) => {
            const custProp = {
              customerName: results?.data?.properties?.customerName,
              serviceClass: results?.data?.properties?.serviceClass,
              mainBalance: results?.data?.properties?.mainBalance,
            };

            setCustomerProperties(custProp);

            window.localStorage.setItem("custProp", JSON.stringify(custProp));
          })
          .catch((error) => {
            console.log(
              "an error has occured when trying to get cust properties",
              error
            );
          });
      })();

      await axios
        .get(configs?.whaatUrl, {
          headers: {
            "Content-Type": "text/html",
          },
        })
        ?.then((results) => {
          console.log("whaat data", results?.data?.split("\n"));

          let callingID = results?.data
            ?.split("\n")
            ?.find((header) => header?.includes("HTTP_X_CALLINGID"));

          callingID = callingID?.split("=")[1]?.split("");

          callingID?.pop();

          callingID?.shift();

          if (callingID === customerMsisdn?.toString()) {
            setCustomerMsisdn(customerMsisdn);

            setTriggerMessage(triggerMessage);

            window.localStorage.setItem("custMsisdn", customerMsisdn);
            window.localStorage.setItem("custMsg", triggerMessage);

            router.push("/consumption");
          } else {
            setIsNotAuthenticated(true);
          }
        })
        .catch((error) => {
          console.error(
            `an error has occured when trying authenticate customer with Whaat ${error}`
          );

          setIsNotAuthenticated(true);
        });

      console.log({
        msisdn: customerMsisdn,
        message: triggerMessage,
      });
    })();
  }, []);

  return (
    <>
      <iframe
        src={configs?.whaatUrl}
        ref={whaatBody}
        style={{
          display: "none",
        }}
      />
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            borderradius: "0px",
            border: `1px solid ${theme.palette.grey[300]}`,
            py: "3rem",
            px: "10%",
          }}
        >
          <img
            style={{
              width: "50px",
              height: "50px",
            }}
            alt="logo orange"
            src="/orange-less.png"
          />
          {!isNotAuthenticated ? (
            <>
              <CircularProgress
                size={screen750 ? 16 : 18}
                sx={{
                  color: theme.palette.primary.main,
                  my: "2.5rem",
                }}
              />
              <Typography
                sx={{
                  color: theme.palette.grey[700],
                  fontWeight: theme.typography.fontWeightBold,
                  textAlign: "center",
                  fontSize: screen750 ? "14px" : "16px",
                }}
              >
                Authentification ...
              </Typography>
            </>
          ) : (
            <>
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  py: "0.5rem",
                  px: "2rem",
                  borderradius: "0px",
                  bgcolor: theme.palette.secondary.main,
                  my: "5vh",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: screen750 ? "14px" : "16px",
                    mr: "1.5rem",
                  }}
                >
                  Oups ... Echec d'authentification
                </Typography>
                <Button
                  onClick={(event) => {
                    handleRetry(event);
                  }}
                  sx={{
                    bgcolor: "transparent",
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightBold,

                    fontSize: screen750 ? "16px" : "14px",
                    py: "0.2rem",
                    px: "1rem",
                    fontSize: screen750 ? "14px" : "16px",
                    borderradius: "0px",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: theme.palette.common.white,
                    },
                  }}
                >
                  Réessayer
                </Button>
              </Stack>

              <a
                target="_blank"
                href={configs?.orangeWebsite}
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    color: theme?.palette.common.black,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: screen750 ? "14px" : "16px",
                    textAlign: "center",
                    m: 0,
                  }}
                >
                  Visiter notre{" "}
                  <Typography
                    component={"span"}
                    sx={{
                      color: theme?.palette.primary?.main,
                      fontWeight: theme.typography.fontWeightBold,

                      fontSize: screen750 ? "16px" : "14px",
                    }}
                  >
                    site web
                  </Typography>
                </Typography>
              </a>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default AppAuth;
