// PurchasResult component definition

import * as React from "react";
import {
  Stack,
  useTheme,
  Typography,
  Button,
  Box,
  IconButton,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import configs from "../../configs/generals.json";
import { PaymentParameters } from "../../context/paymentParameters";
import { useRouter } from "next/router";
import SnackMessage from "./SnackMessage";
import OTPCode from "./OTPCode";
import pkgConfigs from "../../package.json";

const PurchasResult = ({}) => {
  const theme = useTheme();

  const router = useRouter();

  const customerParams = React.useContext(PaymentParameters).paymentParameters;

  const transitState = React.useContext(PaymentParameters).transitState;

  const customerMsisdn = React?.useContext(PaymentParameters)?.customerMsisdn;
  const payerMsisdn =
    React.useContext(PaymentParameters).paymentParameters?.payerMsisdn;

  const [isSnackVisible, setIsSnackVisible] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const [isOTPCodeVisible, setISOTPCodeVisible] = React.useState();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackVisible(false);
    setSnackMessage("");
  };

  // console.log("url for payment", { customerParams, customerMsisdn });

  const handlePurchaseOut = async (event) => {
    event?.preventDefault();

    customerParams.offerCode = customerParams?.offerCode?.toString();

    setIsLoading(true);

    let requestUrl = ``;

    if (customerParams?.canal === "Orange Money") {
      requestUrl = `/api/payments/om?payerMsisdn=${
        customerParams?.paymentSource === "external"
          ? customerParams?.payerMsisdn
          : customerMsisdn
      }&offerCode=${customerParams?.offerCode?.trim()}&offerComName=${
        customerParams?.offerName
      }&receiverMsisdn=${customerMsisdn}&bundlePrice=${
        customerParams?.bundlePrice
      }&currency=${customerParams?.currency}`;
    } else if (customerParams?.paymentSource === "external") {
      const otpRecipient =
        customerParams["paymentSource"] !== "external"
          ? customerMsisdn
          : customerParams?.payerMsisdn;

      console.log("otp recipient", {
        reference: otpRecipient,
        origin: pkgConfigs?.name,
        senderName: configs?.otpSender,
      });

      await axios
        .post(
          `${configs?.otpEndpoint}/generate`,
          {
            reference: otpRecipient,
            origin: pkgConfigs?.name,
            senderName: configs?.otpSender,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((results) => {
          setSnackMessage(`Le code OTP a été envoyé au ${otpRecipient}`);
          setSeverity("info");
          setIsSnackVisible(true);

          setIsLoading(false);

          setISOTPCodeVisible(true);
        })
        .catch((error) => {
          console.error(
            `an error has occured when trying to generate otp code`,
            error
          );

          setIsLoading(false);

          setSnackMessage(
            `Le code OTP n'a pu être envoyé au ${customerMsisdn}. Veuillez réessayer`
          );
          setSeverity("warning");
          setIsSnackVisible(true);

          setISOTPCodeVisible(true);
        });
    } else {
      requestUrl = `/api/payments/homebox?homeboxMsisdn=${customerMsisdn}&offerCode=${customerParams?.offerCode?.trim()}`;
    }

    if (
      customerParams?.canal === "Orange Money" ||
      (customerParams?.canal === "Unités" &&
        customerParams?.paymentSource !== "external")
    ) {
      console.log("frontend params for bundle payment", {
        link: requestUrl,
        source: customerParams,
      });

      await axios
        .get(requestUrl)
        ?.then((result) => {
          console.log("payment results", { result });

          setIsSnackVisible(true);
          setSeverity("success");
          setSnackMessage(
            customerParams?.canal === "Orange Money"
              ? "Veuillez poursuivre le paiement sur votre téléphone"
              : "Paiement effectué avec succès"
          );

          setIsLoading(false);

          setISOTPCodeVisible(false);

          router.push("/consumption");
        })
        .catch((error) => {
          console.log("an error has occured when processing payments", error);

          setIsSnackVisible(true);
          setSeverity("error");
          setSnackMessage("Erreur! Veuillez réessayer plus tard");

          setISOTPCodeVisible(false);

          setIsLoading(false);
        });
    }
  };

  const externalMyriadPay = async () => {
    setIsLoading(true);

    await axios
      .get(
        `/api/payments/external?payer=${
          customerParams?.payerMsisdn
        }&receiver=${customerMsisdn}&offerComName=${
          customerParams?.offerName
        }&offerCode=${customerParams?.offerCode?.trim()}`
      )
      ?.then((result) => {
        console.log("payment results", { result });

        setIsLoading(false);

        setIsLoading(false);

        setIsSnackVisible(true);
        setSeverity("success");
        setSnackMessage("Paiment effectué avec succès");

        router.push("/consumption");
      })
      .catch((error) => {
        console.log("an error has occured when processing payments", error);

        setIsLoading(false);

        setIsSnackVisible(true);
        setSeverity("error");
        setSnackMessage("Erreur! Veuillez réessayer plus tard");
      });
  };

  const handleSwitch = (event) => {
    event?.preventDefault();

    if (transitState) {
      router.push("/offers");
    } else {
      router.push(
        `/consumption/price-list?group=${customerParams?.offerDuration}`
      );
    }
  };

  return (
    <>
      {isOTPCodeVisible ? (
        <OTPCode
          callback={externalMyriadPay}
          close={() => {
            setISOTPCodeVisible(false);
          }}
          customerMsisdn={
            customerParams?.paymentSource === "external"
              ? customerParams?.payerMsisdn
              : customerMsisdn
          }
        />
      ) : (
        ""
      )}
      {isSnackVisible ? (
        <SnackMessage
          handleClose={handleClose}
          message={snackMessage}
          severity={severity}
        />
      ) : (
        ""
      )}
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            mb: "1rem",
          }}
        >
          <IconButton
            onClick={handleSwitch}
            sx={{
              width: "min-content",
              position: "relative",
              left: "-.7rem",
              mr: "1rem",
            }}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.grey[700],
              flexGrow: 1,
              textAlign: "center",
              p: 0,
              m: 0,
            }}
          >
            Confirmation
          </Typography>
        </Stack>
        <Stack
          sx={{
            mt: "1rem",
          }}
        >
          <Stack
            sx={{
              boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
              borderRadius: "0.3rem",
              bgcolor: theme.palette.common.white,
              p: 0,
              m: 0,
              height: "max-content",
              width: "100%",
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                width: "100%",
                p: 0,
              }}
            >
              {Object.keys(customerParams)
                ?.filter(
                  (target) =>
                    !["offerCode", "paymentSource", ""]?.includes(target)
                )
                ?.map((key, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        width: "100%",
                        borderBottom: `1px solid ${theme?.palette?.grey[300]}`,
                        "&:hover": {
                          bgcolor: theme.palette.common.white,
                        },
                        cursor: "unset",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: "1rem",
                          py: "0.5rem",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.common.black,
                            fontWeight: theme.typography.fontWeightBold,
                            fontSize: "14px",
                          }}
                        >
                          {configs["translates"][key]}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.common.black,
                            fontWeight: theme.typography.fontWeightBold,
                            fontSize: "14px",
                          }}
                        >
                          {customerParams["paymentSource"] !== "external" &&
                          key === "payerMsisdn"
                            ? customerMsisdn
                            : customerParams[key]}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  );
                })}
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                //mt: "1rem",
                py: "1rem",
                px: "1rem",
              }}
            >
              <Button
                onClick={handlePurchaseOut}
                sx={{
                  bgcolor: theme.palette.common.white,
                  color: theme.palette.common.black,
                  borderRadius: "0rem",
                  px: ".7rem",
                  py: ".1rem",
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: "14px",
                  border: `2px solid ${theme.palette.common.black}`,
                  "&:hover": {
                    transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                    bgcolor: theme.palette.common.black,
                    color: theme.palette.common.white,
                    "& span": {
                      color: theme.palette.common.white,
                    },
                  },
                  height: "27px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "70px",
                }}
              >
                {isLoading ? (
                  <CircularProgress
                    size={16}
                    sx={{
                      color: theme.palette.common.black,
                    }}
                  />
                ) : (
                  "Envoyer"
                )}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PurchasResult;
