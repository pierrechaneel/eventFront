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
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          maxWidth: "100%",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          borderRadius: "1.5rem",
          bgcolor: theme.palette.common.black,
          mt: "1rem",
          flexGrow: 1,
          height: "max-content",
          maxHeight: "100%",
          maxWidth: "100%",
          //overflowX: "hidden",
          p: "1.5rem",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            p: "1rem",
          }}
        >
          <Stack
            sx={{
              // width: "97%",
              // maxWidth: "97%",
              //bgcolor: "#FFFFFF10",
              height: "max-content",
              maxHeight: "max-content",
              borderRadius: "1.5rem",
              p: screen660 ? ".5rem" : "1.5rem",
              boxShadow:
                "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
              border: `1px solid ${theme.palette.grey[900]}`,
              // m: screen870 ? "0.5rem" : "1rem",
              //overflowY: "auto",
              flexWrap: screen660 ? "wrap" : "no-wrap",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "14px",
                mb: "1rem",
              }}
            >
              {lang === "fr"
                ? "Mot du Directeur Général"
                : "Message from the CEO"}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightLight,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? "Cher" : "Dear"}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: "12px",
                }}
              >
                {guest?.fullName}
              </Typography>
              {lang === "fr"
                ? `, Je te souhaite la bienvenue en République Démocratique du Congo,
            un grand pays avec d’immenses ressources économiques. La République
            Démocratique du Congo est au centre du continent africain et se
            subdivise en 26 Provinces issues de la profonde réforme de
            l’organisation politique, administrative et territoriale. Elle est
            entourée de 9 pays frontaliers : République du Congo, République
            Centrafricaine, Sud-Soudan, Ouganda, Rwanda, Burundi, Tanzanie,
            Zambie et Angola. Au nom du`
                : `, I welcome you to the Democratic Republic of Congo,
            a large country with immense economic resources. The Republic
            Democratic Republic of the Congo is at the center of the African continent and is
            subdivided into 26 Provinces resulting from the profound reform of
            political, administrative and territorial organization. It is
            surrounded by 9 border countries: Republic of Congo, Republic
            Central African Republic, South Sudan, Uganda, Rwanda, Burundi, Tanzania,
            Zambia and Angola. On behalf of the`}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: "12px",
                }}
              >
                {lang === "fr"
                  ? `Comité de Direction d’Orange RDC`
                  : `Orange DRC Management Committee`}
              </Typography>{" "}
              {lang === "fr" ? ` et de tous les` : `and all the`}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: "12px",
                }}
              >
                {lang === "fr" ? `collègues` : `collegues`}
              </Typography>{" "}
              {lang === "fr"
                ? ` , je vous souhaite, à toi et ta délégation, la bienvenue à Kinshasa,
            capitale de la République Démocratique du Congo. A toutes fins
            utiles, le Responsable de la Sécurité physique se tient à votre
            disposition pour toute question liée à votre sécurité durant votre
            visite chez`
                : `, I wish you and your delegation a warm welcome to Kinshasa,
            capital of the Democratic Republic of Congo. For all purposes
            useful, the Physical Security Manager is at your
            disposal for any question related to your safety during your
            home visit`}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: "12px",
                }}
              >
                {lang === "fr" ? " Orange RDC" : "Orange DRC"}
              </Typography>{" "}
              .
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                textAlign: "right",
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "14px",
                mt: ".5rem",
              }}
            >
              Ben Cheick HAIDARA
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                textAlign: "right",
                fontWeight: theme.typography.fontWeightLight,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? `Directeur Général` : `CEO`}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              // alignItems: "shrink",
              justifyContent: "center",
              width: "100%",
              height: "max-content",
              maxHeight: "max-content",
              //  overflowY: "auto",
              flexWrap: screen660 ? "wrap" : "no-wrap",
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                p: screen870 ? "1rem" : "2rem",
                m: screen870 ? "0.5rem" : "1rem",
                ml: 0,

                width: screen660 ? "95%" : "45%",
                // bgcolor: theme.palette.grey[900],
                // pb: "2rem",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
                border: `1px solid ${theme.palette.grey[900]}`,

                alignItems: "center",
                borderRadius: "1.5rem",
                flexGrow: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={"/okapisaio.png"}
                alt="qrcode"
                style={{
                  width: screen870 ? "200px" : "350px",
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
                flexGrow: 1,
                mr: 0,
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
                    fontSize: screen870 ? "14px" : "16px",
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
                    fontSize: screen870 ? "14px" : "20px",
                    mr: screen870 ? ".2rem" : ".5rem",
                  }}
                />
                <Typography
                  sx={{
                    color: theme.palette.grey[500],
                    fontWeight: theme.typography.fontWeightRegular,
                    mr: screen870 ? ".2rem" : ".5rem",
                    color: theme.palette.common.white,
                    fontSize: screen870 ? "10px" : "12px",
                    textAlign: "justify",
                    width: "max-content",
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
                  width: "100%",
                }}
              >
                <AccessTime
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: screen870 ? "14px" : "20px",
                    mr: screen870 ? ".2rem" : ".5rem",
                  }}
                />
                <Typography
                  sx={{
                    color: theme.palette.grey[200],
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: screen870 ? "10px" : "12px",
                    whiteSpace: "no-wrap",
                    textAlign: "justify",
                    width: "max-content",
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
    </Stack>
  );
};

export default QrCode;
