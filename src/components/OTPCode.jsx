// otp code component definition

import * as React from "react";
import {
  useTheme,
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import pkgConfigs from "../../package.json";
import SnackMessage from "./SnackMessage";
import configs from "../../configs/generals.json";

const OTPCode = ({ customerMsisdn, close, callback }) => {
  const theme = useTheme();

  const [snackMessage, setsnackMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [messageVisible, setMessageVisible] = React.useState(true);

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessageVisible(false);
    setsnackMessage("");
    setSeverity("");
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();

    let otpCode = 0;

    Array.from(event?.target?.elements)?.forEach((target) => {
      if (target?.name === "otpCode") {
        otpCode = target?.value;
      }
    });

    console.log(`${configs?.otpEndpoint}/check`, otpCode);

    await axios
      .post(
        `${configs?.otpEndpoint}/check`,
        {
          reference: customerMsisdn,
          origin: pkgConfigs?.name,
          receivedOtp: otpCode,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (results) => {
        console.log("received data res otp", {
          data: results?.data,
          ...{
            reference: customerMsisdn,
            origin: pkgConfigs?.name,
            receivedOtp: otpCode?.trim(),
          },
        });

        if (results?.data?.diagnosticResult === true) {
          await callback().catch((error) => {
            console.log(
              "an error has occured when trying to execute otp callback function",
              error
            );

            setsnackMessage(
              "Une erreur est survenue, veuillez réessayer plus tard"
            );
            setMessageVisible(true);
            setSeverity("error");
          });
        } else {
          setsnackMessage("Le code entré est incorrect");
          setMessageVisible(true);
          setSeverity("error");
        }
      })
      .catch((error) => {
        console.log(
          "an error has occured when trying to send otp code for checking",
          error
        );

        setsnackMessage(
          "Une erreur est survenue, veuillez réessayer plus tard"
        );
        setMessageVisible(true);
        setSeverity("error");
      });
  };

  const handleClose = async (event) => {
    event?.preventDefault();

    await close();
  };

  return (
    <>
      {messageVisible ? (
        <SnackMessage
          handleClose={handleSnackClose}
          message={snackMessage}
          severity={severity}
        />
      ) : (
        ""
      )}
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 900,
        }}
      >
        <Box
          sx={{
            width: "30%",
            minWidth: "200px",
            maxWidth: "300px",
            borderRadius: "0rem",
            overflowX: "hidden",
            border: `1px solid ${theme.palette.common.black}`,
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              py: ".2rem",
              bgcolor: theme.palette.common.black,
              justifyContent: "space-between",
              width: "100%",
              px: "1rem",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "16px",
              }}
            >
              Entrer le OTP réçu
            </Typography>
            <IconButton onClick={handleClose}>
              <Close
                sx={{
                  color: theme.palette.common.white,
                  fontSize: screen750 ? "16px" : "18px",
                }}
              />
            </IconButton>
          </Stack>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                alignItems: "center",
                p: "1.5rem",
                width: "100%",
                bgcolor: theme.palette.common.white,
              }}
            >
              <TextField
                size={"small"}
                label={"Code OTP"}
                name="otpCode"
                sx={{
                  width: "100%",
                  my: "0.5rem",
                }}
              />

              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: "1rem",
                  width: "100%",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    bgcolor: theme.palette.common.white,
                    color: theme.palette.common.black,
                    borderradius: "0px",
                    px: "0.3rem",
                    py: "0.2rem",
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "14px",
                    border: `2px solid ${theme.palette.common.black}`,
                    "&:hover": {
                      transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                      bgcolor: theme.palette.common.black,
                      color: theme.palette.common.white,
                    },
                    width: "100%",
                  }}
                >
                  Envoyer
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </>
  );
};

export default OTPCode;
