// Qr code component definition

import * as React from "react";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import Home from "@mui/icons-material/Home";
import LocationOn from "@mui/icons-material/LocationOn";
import AccessTime from "@mui/icons-material/PunchClock";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FormatQuote from "@mui/icons-material/FormatQuote";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";

const QrCode = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx)?.guest;

  const lang = React.useContext(LangCtx).lang;

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "flex-start",
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-end",
          height: "200px",
          px: "5vw",
          py: "2rem",
          bgcolor: theme.palette.common.black,
          width: "100%",
          borderRadius: "2.5rem",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontSize: "24px",
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          {lang === "fr" ? " BIENVENUE ENCORE !" : "WELCOME AGAIN"}
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          py: "2rem",
          px: "5vw",
          borderRadius: "2.5rem",
          bgcolor: theme.palette.common.black,
          mt: "1.5rem",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            p: "2rem",
            width: "45%",
            // bgcolor: theme.palette.grey[900],
            pb: "4rem",
            display: "flex",
            flexDirection: "column",
            boxShadow:
              "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
            m: "1rem",
            alignItems: "center",
            borderRadius: "2.5rem",
            border: `1px solid ${theme.palette.grey[900]}`,
            overflow: "hidden",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCodeIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: "44px",
                mb: "1rem",
              }}
            />
          </Stack>
          <img
            src={guest?.qrCodeLink}
            alt="qrcode"
            style={{
              width: "200px",
              mx: "auto",
            }}
          />

          <Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightMedium,
              fontSize: "14px",
              fontStyle: "italic",
              mt: "1rem",
            }}
          >
            {lang === "fr"
              ? "Prière de présenter ce code aux hotesses"
              : "Please present this code to our hostesses"}
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            p: "2rem",
            width: "45%",
            //  bgcolor: theme.palette.grey[900],
            pb: "4rem",
            boxShadow:
              "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
            m: "1rem",
            borderRadius: "2.5rem",
            overflow: "hidden",
            border: `1px solid ${theme.palette.grey[900]}`,
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Home
              sx={{
                color: theme.palette.primary.main,
                fontSize: "44px",
                mb: "1rem",
              }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              width: "100%",
              mb: "1.5rem",
              justifyContent: "center",
            }}
          >
            <FormatQuote
              sx={{
                color: theme.palette.common.white,
                fontSize: "24px",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontSize: "22px",
                fontWeight: theme.typography.fontWeightBlack,
                textAlign: "center",
                maxWidth: "70%",
                mx: ".7rem",
                p: 0,
                mt: "1rem",
              }}
            >
              {guest?.event?.subject}
            </Typography>
            <FormatQuote
              sx={{
                color: theme.palette.common.white,
                fontSize: "24px",
              }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              mb: "1rem",
            }}
          >
            <LocationOn
              sx={{
                color: theme.palette.common.white,
                fontSize: "24px",
                mr: "1rem",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "16px",
                color: theme.palette.common.white,
              }}
            >
              {guest?.event?.place}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "flex-start",
              justifyContent: "center",
              mb: "1rem",
            }}
          >
            <AccessTime
              sx={{
                color: theme.palette.common.white,
                fontSize: "24px",
                mr: "1rem",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.grey[200],
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "16px",
              }}
            >
              {new Date(guest?.event?.date).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QrCode;
