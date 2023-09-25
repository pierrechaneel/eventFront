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
import { Wifi } from "@mui/icons-material";

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
                        `, je suis très heureux de t’accueillir pour le 2ème Séminaire Codir de l’année  que nous avons baptisé « Séminaire KIAMBOTE  » au village éponyme « Mbuela », situé dans la province du Kongo Central, Secteur de Kisantu.`,
                        ``,
                        ` `,
                        <br />,
                        <br />,
                        ``,
                      ]
                    : [
                        `, i am very happy to welcome you for the 2nd Codir Seminar of the year which we have named “KIAMBOTE Seminar” in the eponymous village “Mbuela”, located in the province of Kongo Central, Kisantu Sector.`,
                        ``,
                        `
           `,
                        <br />,
                        <br />,
                        ``,
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
                    ? ``
                    : ``}
                </Typography>{" "}
                {lang === "fr" ? ` ` : ``}{" "}
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
                  {lang === "fr" ? `` : ``}
                </Typography>{" "}
                {lang === "fr"
                  ? [
                      `Je me réjouis d’avance de la qualité des échanges que nous aurons au sein de ce complexe agrotouristique où  j’en suis sûr au solde des ces quelques jours de communion, en ressortiront enrichis de belles nouvelles idées pour nos challenges et défis à venir.`,
                      <br />,
                      <br />,
                      `Je te souhaite la bienvenue à Kisantu. Nous découvrirons ensemble l'un des plus anciens jardin botanique d'Afrique centrale, domaine de 225 hectares abritant plus de 3 000 espèces lors de notre  team building !!`,
                      <br />,
                      <br />,
                      ``,
                  
                    ]
                  : [
                      `I am looking forward to the quality of the exchanges that we will have within this agrotourism complex where I am sure that at the end of  these few of communion, we will emerge enriched with great new ideas for our challenges and challenges to come.`,
                      <br />,
                      <br />,
                      `I welcome you to Kisantu. Together we will discover one of the oldest botanical gardens in Central Africa, an area of ​​225 hectares housing more than 3,000 species during our team building!!`, 
                      <br />,
                      <br />,
                      ``,
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
                  {lang === "fr" ? "Kuisa Kiamboté" : "Kuisa Kiamboté"}
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
                  width: screen870 ? "200px" : "350px",
                  mx: "auto",
                  animation: "bump 3s linear infinite",
                }}
              />
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
                    mb: ".5rem",
                  }}
                />
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  width: "100%",
                  mb: screen870 ? ".3rem" : ".5rem",
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
                  mb: screen870 ? ".3rem" : ".5rem",
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
                  mb: screen870 ? ".3rem" : ".5rem",
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
              {guest?.event?.wifiCode?.length >= 1 ? (
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    mb: screen870 ? ".3rem" : ".5rem",
                  }}
                >
                  <Wifi
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
                      transition: "3s all",
                    }}
                  >
                    {guest?.event?.wifiCode}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QrCode;
