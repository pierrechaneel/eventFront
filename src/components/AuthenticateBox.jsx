// authenticate box compoent definition

import * as React from "react";
import {
  useTheme,
  Typography,
  Stack,
  TextField,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import configs from "../../configs/generals.json";
import { PromoPubs } from ".";

const AuthenticateBox = ({}) => {
  const theme = useTheme();

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let customerMsisdn = null;
    let triggerMessage = configs?.defaultTriggerMessage;

    Array.from(event.target?.elements)
      ?.filter((elt) => elt?.name !== "")
      ?.forEach((element) => {
        console.log("element name", element?.name);

        if (element?.name === "custMsisdn") {
          customerMsisdn = element?.value;
        }
      });

    router.push(`/?msisdn=${customerMsisdn}&triggerMessage=${triggerMessage}`);
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 80px)",
        alignItems: "flex-start",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          mt: "60px",
          maxHeight: "70vh",
          overflow: "hidden",
          px: !screen750 ? "5%" : undefined,
        }}
      >
        <PromoPubs />
      </Stack>
      <Typography
        sx={{
          textAlign: "left",
          fontWeight: theme.typography.fontWeightBold,
          fontSize: screen750 ? "16px" : "14px",
          color: theme.palette.grey[700],
          //alignSelf: "flex-start",
          px: "5%",
          width: screen750 ? "90%" : "50%",
          my: "2rem",
        }}
      >
        ECHEC DE RECONNAISSANCE DE VOTRE SIM
      </Typography>
      <Stack
        direction={"column"}
        sx={{
          //boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
          bgcolor: theme.palette.common.white,
          width: screen750 ? "90%" : "50%",
          p: "1rem",
          // p: screen750 ? "1rem" : "2rem",
          mx: "5%",
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <img
          src="/phone-taken-with-hand.svg"
          alt="phone"
          style={{
            width: "100px",
            marginBottom: "1rem",
          }}
        />
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontWeight: theme.typography.fontWeightBold,
            textAlign: "left",
            fontSize: screen750 ? "16px" : "14px",
            mb: "1rem",
          }}
        >
          Entre votre numéro connecté à Orange
        </Typography>
        <Stack
          direction={"column"}
          sx={
            {
              //p: "1rem",
            }
          }
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <TextField
              size={"small"}
              label={"Numéro de téléphone"}
              fullWidth
              name={"custMsisdn"}
              sx={{
                width: "100%",
                fontSize: screen750 ? "16px" : "14px",
                my: "0.5rem",
              }}
            />
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                mt: "1rem",
              }}
            >
              <Button
                type={"submit"}
                sx={{
                  bgcolor: theme.palette.common.white,
                  color: theme.palette.common.black,
                  borderRadius: "0rem",
                  px: "0.7rem",
                  py: "0.15rem",
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: "14px",
                  border: `2px solid ${theme.palette.common.black}`,
                  "&:hover": {
                    transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                    bgcolor: theme.palette.common.black,
                    color: theme.palette.common.white,
                  },
                }}
              >
                Envoyer
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
      <Stack
        direction={"row-reverse"}
        sx={{
          width: "100%",
          py: "2rem",
          px: "5%",
        }}
      >
        <img
          src={"/bottom-rign-corner.svg"}
          style={{
            width: "150px",
            transform: "rotate(90deg)",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AuthenticateBox;
