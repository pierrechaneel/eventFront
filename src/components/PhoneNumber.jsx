// phoneNumber component definition

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
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { PaymentParameters } from "../../context/paymentParameters";

const PhoneNumber = ({}) => {
  const theme = useTheme();

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const setCustomerParams =
    React.useContext(PaymentParameters).setpaymentParameters;
  const customerParams = React.useContext(PaymentParameters).paymentParameters;

  const handleChange = (event) => {
    event.preventDefault();

    const custParams = {
      ...customerParams,
      payerMsisdn: event?.target?.value,
      paymentSource: "external",
    };

    setCustomerParams(custParams);

    window.localStorage?.setItem("custParams", JSON.stringify(custParams));
  };

  return (
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
        <Link
          href={"/consumption/cost-payer"}
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            sx={{
              width: "min-content",
              position: "relative",
              left: "-.7rem",
              mr: "1rem",
            }}
          >
            <ArrowBack />
          </IconButton>
        </Link>

        <Typography
          sx={{
            fontSize: screen750 ? "16px" : "14px",
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.grey[700],
            flexGrow: 1,
            textAlign: "center",
            p: 0,
            m: 0,
          }}
        >
          Insérer le numéro de paiment
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
            p: "1rem",
          }}
        >
          <TextField
            onChange={handleChange}
            size={"small"}
            label={"Numéro de téléphone"}
            sx={{
              width: "100%",
              my: "0.5rem",
              fontSize: screen750 ? "16px" : "14px",
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
            <Link
              href={"/consumption/canal"}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
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
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PhoneNumber;
