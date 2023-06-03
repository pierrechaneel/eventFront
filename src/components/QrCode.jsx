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
import { viewportsCtx } from "../../context/viewports";
import axios from "axios";

const QrCode = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx)?.guest;

  const lang = React.useContext(LangCtx).lang;

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  const [enEventName, setEnEventName] = React.useState("");

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
          width: "100%",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          py: "2rem",
          px: "7vw",
          borderRadius: "1.5rem",
          bgcolor: theme.palette.common.black,
          mt: "1rem",
          flexGrow: 1,
          height: "max-content",
          maxHeight: "100%",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "shrink",
            justifyContent: "center",
            width: "100%",
            height: "max-content",
            maxHeight: "100%",
            overflowY: "auto",
            flexWrap: screen660 ? "wrap" : "no-wrap",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              p: screen870 ? "1rem" : "2rem",
              m: screen870 ? "0.5rem" : "1rem",
              width: screen660 ? "95%" : "45%",
              // bgcolor: theme.palette.grey[900],
              pb: "4rem",
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",

              alignItems: "center",
              borderRadius: "1.5rem",
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
                  fontSize: screen870 ? "24px" : "44px",
                  mb: "1rem",
                }}
              />
            </Stack>
            <img
              src={guest?.qrCodeLink}
              alt="qrcode"
              style={{
                width: screen870 ? "100px" : "200px",
                mx: "auto",
              }}
            />

            {/**<Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.t(ypography.fontWeightMedium,
              fontSize: "14px",
              fontStyle: "italic",
              mt: "1rem",
            }}
          >
            {lang === "fr"
              ? "Prière de présenter ce code aux hotesses"
              : "Please present this code to our hostesses"}
          </Typography> */}
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              p: screen870 ? "1rem" : "2rem",
              m: screen870 ? "0.5rem" : "1rem",
              width: screen660 ? "95%" : "45%",
              //  bgcolor: theme.palette.grey[900],
              pb: "4rem",
              boxShadow:
                "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",

              borderRadius: "1.5rem",
              overflow: "hidden",
              border: `1px solid ${theme.palette.grey[900]}`,
              maxHeight: "100%",
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
                  fontSize: screen870 ? "24px" : "44px",
                  mb: "1rem",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                width: "100%",
                mb: screen870 ? ".5rem" : "1.5rem",
                justifyContent: "center",
              }}
            >
              <FormatQuote
                sx={{
                  color: theme.palette.common.white,
                  fontSize: screen870 ? "14px" : "18px",
                }}
              />
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontSize: screen870 ? "18px" : "22px",
                  fontWeight: theme.typography.fontWeightBlack,
                  textAlign: "center",
                  maxWidth: "100%",
                  mx: screen870 ? ".3rem" : ".7rem",
                  p: 0,
                  mt: "1rem",
                  whiteSpace: "no-wrap",
                }}
              >
                {guest?.event?.subject}
              </Typography>
              <FormatQuote
                sx={{
                  color: theme.palette.common.white,
                  fontSize: "18px",
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
                  fontSize: screen870 ? "16px" : "24px",
                  mr: screen870 ? ".2rem" : ".5rem",
                }}
              />
              <Typography
                sx={{
                  color: theme.palette.grey[700],
                  fontWeight: theme.typography.fontWeightRegular,
                  mr: screen870 ? ".2rem" : ".5rem",
                  color: theme.palette.common.white,
                  fontSize: screen870 ? "10px" : "12px",
                }}
              >
                {guest?.event?.place}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                mb: "1rem",
              }}
            >
              <AccessTime
                sx={{
                  color: theme.palette.common.white,
                  fontSize: screen870 ? "16px" : "24px",
                  mr: screen870 ? ".2rem" : ".5rem",
                }}
              />
              <Typography
                sx={{
                  color: theme.palette.grey[200],
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: screen870 ? "10px" : "12px",
                  whiteSpace: "no-wrap",
                  textAlign: "center",
                }}
              >
                <Typography
                  component={"span"}
                  sx={{
                    textTransform: "capitalize",

                    color: theme.palette.grey[200],
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: screen870 ? "10px" : "12px",
                    whiteSpace: "no-wrap",
                    textAlign: "center",
                  }}
                >
                  {new Date(guest?.event?.date).toLocaleDateString(
                    `${lang}-${lang?.toUpperCase()}`,
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Typography>{" "}
                -{" "}
                <Typography
                  component={"span"}
                  sx={{
                    textTransform: "capitalize",
                    color: theme.palette.grey[200],
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: screen870 ? "10px" : "12px",
                    whiteSpace: "no-wrap",
                    textAlign: "center",
                  }}
                >
                  {new Date(guest?.event?.endDate).toLocaleDateString(
                    `${lang}-${lang?.toUpperCase()}`,
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QrCode;
