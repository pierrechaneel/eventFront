// Qr code component definition

import * as React from "react";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import Home from "@mui/icons-material/Home";
import LocationOn from "@mui/icons-material/LocationOn";
import AccessTime from "@mui/icons-material/PunchClock";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FormatQuote from "@mui/icons-material/FormatQuote";
import { GuestCtx } from "../../context/guest";

const QrCode = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx)?.guest;

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "flex-start",
        height: "100%",
        px: "5vw",
        py: "2rem",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontSize: "24px",
          fontWeight: theme.typography.fontWeightBold,
        }}
      >
        BIENVENUE ENCORE !
      </Typography>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          mt: "1rem",
          px: "5vw",
        }}
      >
        <Paper
          direction={"column"}
          sx={{
            p: "2rem",
            width: "45%",
            bgcolor: theme.palette.common.white,
            pb: "4rem",
            display: "flex",
            flexDirection: "column",
            m: "1rem",
            alignItems: "center",
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
                fontSize: "34px",
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
              color: theme.palette.common.black,
              fontWeight: theme.typography.fontWeightMedium,
              fontSize: "14px",
              fontStyle: "italic",
              mt: "1rem",
            }}
          >
            Prière de présenter ce code aux hotesses
          </Typography>
        </Paper>
        <Paper
          direction={"column"}
          sx={{
            p: "2rem",
            width: "45%",
            bgcolor: theme.palette.common.white,
            pb: "4rem",
            m: "1rem",
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
                fontSize: "34px",
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
            <FormatQuote />
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontSize: "22px",
                fontWeight: theme.typography.fontWeightBlack,
                textAlign: "center",
                maxWidth: "70%",
                mx: ".0rem",
                p: 0,
                mt: "1rem",
              }}
            >
              {guest?.event?.subject}
            </Typography>
            <FormatQuote />
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
                color: theme.palette.black,
                fontSize: "24px",
                mr: "1rem",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "16px",
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
                color: theme.palette.black,
                fontSize: "24px",
                mr: "1rem",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "16px",
              }}
            >
              {new Date(guest?.event?.date).toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default QrCode;
