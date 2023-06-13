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
        pb: screen660 ? "2rem" : undefined,
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
          mt: screen660 ? "0rem" : "1rem",
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
            direction={"row"}
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
              justifyContent: "space-between",
            }}
          >
            <img
              style={{
                height: screen660 ? "65px" : "100px",
                marginRight: screen660 ? undefined : "1rem",
                marginBottom: screen660 ? "1rem" : undefined,
                border: `2px solid ${theme.palette.common.white}`,
                borderRadius: "1rem",
              }}
              src="/ceo.jpg"
              alt="CEO"
            />
            <Stack
              direction={"column"}
              sx={{
                flexGrow: 1,
                height: "max-content",
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
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: "12px",
                  textAlign: "justify",
                  lineHeight: "1.2",
                }}
              >
                {lang === "fr" ? "Cher (ère)" : "Dear"}{" "}
                <Typography
                  component={"span"}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "12px",
                    textAlign: "justify",
                    lineHeight: "1.2",
                  }}
                >
                  {guest?.fullName}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "12px",
                    textAlign: "justify",
                    lineHeight: "1.2",
                  }}
                  component={"span"}
                >
                  {lang === "fr"
                    ? [
                        `, Je te souhaite la bienvenue en République Démocratique
                du Congo, un pays avec beaucoup de ressources naturelles
                (Diamant, Cobalt, Cuivre, Or, Coltant etc…). `,
                        `La République
                Démocratique du Congo (RDC) est organisée en 26 Provinces
                administratives et entourée de 9 pays frontaliers : République
                du Congo, République Centrafricaine, Sud-Soudan, Ouganda,
                Rwanda, Burundi, Tanzanie, Zambie et Angola.`,
                        `Du fait de sa position géographique, elle est à la fois membre de la Communauté de Développement de l’Afrique Australe et de la Communauté de l’Afrique de l’Est. `,
                        <br />,
                        <br />,
                        `Au nom du `,
                      ]
                    : [
                        `, I welcome you to the Democratic Republic
                of the Congo, a country with many natural resources
                (Diamond, Cobalt, Copper, Gold, Coltant etc…). `,
                        `The Republic
                Democratic Republic of the Congo (DRC) is organized into 26 Provinces
                administrative and surrounded by 9 border countries: Republic
                of Congo, Central African Republic, South Sudan, Uganda,
                Rwanda, Burundi, Tanzania, Zambia and Angola.`,
                        `Due to its geographical position, it is both a member of the Southern African Development Community and the East African Community.
           `,
                        <br />,
                        <br />,
                        `On behalf of the`,
                        ` `,
                      ]}
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "12px",
                    textAlign: "justify",
                    lineHeight: "1.2",
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
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "12px",
                    textAlign: "justify",
                    lineHeight: "1.2",
                  }}
                >
                  {lang === "fr" ? `collègues` : `collegues`}
                </Typography>{" "}
                {lang === "fr"
                  ? [
                      ` , je te souhaite une chaleureuse bienvenue à Kinshasa, capitale de la République Démocratique du Congo.`,
                      <br />,
                      <br />,
                      ` A toutes fins utiles, la rubrique « Sécurité et contacts utiles » te donne accès à des personnes ressources qui se tiendront avec plaisir à ta disposition pour rendre ta visite agréable chez `,
                    ]
                  : [
                      `, I wish you a warm welcome to Kinshasa, capital of the Democratic Republic of Congo.`,
                      <br />,
                      <br />,
                      ` For all intents and purposes, the "Safety and useful contacts" menu gives you access to resource persons who will be happy to be at your disposal to make your visit pleasant at `,
                    ]}
                <Typography
                  component={"span"}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "12px",
                    textAlign: "justify",
                    lineHeight: "1.2",
                  }}
                >
                  {lang === "fr" ? " Orange RDC" : "Orange DRC"}
                </Typography>{" "}
                .
              </Typography>
              <Stack
                direction={"column"}
                sx={{
                  width: "100%",
                }}
              >
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
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "12px",
                  }}
                >
                  {lang === "fr" ? `Directeur Général` : `CEO`}
                </Typography>
              </Stack>
            </Stack>
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
                pt: 0,
                "@keyframes bump": {
                  "0%": {
                    transform: "scale(.8)",
                  },
                  "50%": {
                    transform: "scale(1)",
                  },
                  "100%": {
                    transform: "scale(.8)",
                  },
                },
              }}
            >
              <img
                src={"/okapisaio.png"}
                alt="qrcode"
                style={{
                  width: screen870 ? "150px" : "300px",
                  mx: "auto",
                  animation: "bump 3s linear infinite",
                }}
              />
              <Typography
                sx={{
                  color: theme.palette.grey[200],
                  fontWeight: theme.typography.fontWeightBold,
                  textAlign: "center",
                  fontSize: screen660 ? "12px" : "12px",
                }}
              >
                Code Wi-Fi
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightBold,
                  textAlign: "center",
                  fontSize: screen660 ? "14px" : "16px",
                  transition: "all 2s",
                }}
              >
                {guest?.event?.wifiCode}
              </Typography>
              {/**<Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.t(ypography.fontWeightBold,
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
                    color: theme.palette.grey[400],
                    fontWeight: theme.typography.fontWeightBold,
                    mr: screen870 ? ".2rem" : ".5rem",
                    color: theme.palette.common.white,
                    fontSize: screen870 ? "12px" : "12px",
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
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: screen870 ? "12px" : "12px",
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
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: screen870 ? "12px" : "12px",
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
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: screen870 ? "12px" : "12px",
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
