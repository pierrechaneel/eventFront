import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";
import {
  ArrowRightAlt,
  Call,
  ExpandMore,
  Home,
  LocationOn,
} from "@mui/icons-material";
import { viewportsCtx } from "../../context/viewports";

const Info = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;

  const lang = React.useContext(LangCtx).lang;

  const screen870 = React.useContext(viewportsCtx)?.screen870;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        p: 0,
        m: 0,
        height: "100%",
        maxHeight: "100%",
        flexGrow: 1,
        borderRadius: "1.5rem",
        overflowX: "hidden",
        overflowY: "auto",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: screen870 ? "wrap" : undefined,
        alignItems: "stretch",

        //bgcolor: theme.palette.common.black,
      }}
    >
      <Box
        sx={{
          height: "max-content",
          maxHeight: "max-content",
          width: screen870 ? "100%" : "70%",
          p: "2rem",
          bgcolor: theme.palette.common.black,
          overflowX: "hidden",
          borderRadius: "1.5rem",
          mr: screen870 ? undefined : "1.5rem",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            bgcolor: "#FFFFFF10",
            overflowX: "hidden",
            height: "max-content",
            maxHeight: "max-content",
            borderRadius: "1.5rem",
            p: "1.5rem",
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
            Mot du Directeur Général
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
            useful, the Physical Security Manager is at your disposal.
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
        <img
          src="/kinSafeZones.png"
          alt="safe zones"
          style={{
            width: "100%",
            borderRadius: "1.5rem",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        />
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            borderRadius: "1.5rem",
            bgcolor: "#FFFFFF10",
            p: "2rem",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightRegular,
              fontSize: "14px",
              mb: "1rem",
            }}
          >
            {lang === "fr" ? "Numéros importants" : "Impoertant phone numbers"}
          </Typography>
          <Stack
            direction={"column"}
            sx={{
              width: "100%",
              "& *": {
                bgcolor: "transparent!important",
              },
              borderRadius: "1.5rem",
            }}
          >
            {[
              {
                name: "Ben Cheick HAIDARA",
                title: lang === "fr" ? `Directeur Général` : `CEO`,
                phoneNumber: "+243 852 400 045",
                emailAdress: "Ben-Cheick.HAIDARA@orange.com",
              },
              {
                name: "Nancy  MBUNGU",
                title:
                  lang === "fr"
                    ? "Directrice des Ressources Humaines et Sécurité"
                    : "Head of Human Ressources and Security",
                phoneNumber: "+243 898 900 257",
                emailAdress: "Nancy.MBUNGU@orange.com",
              },
              {
                name: "Dieumerci MUEMBO",
                title:
                  lang === "fr"
                    ? "Officier de sûreté / sécurité (OSS)"
                    : "Security Officer",
                phoneNumber: "+243 898 900 910",
                emailAdress: "DMUEMBO.ext@orange.com",
              },
              {
                name: "Julie KOFFI",
                title:
                  lang === "fr" ? "PMO du Directeur Général" : "PMO Officer",
                phoneNumber: "+243 898 900 018",
                emailAdress: "julie.KOFFI@orange.com",
              },
              {
                name: "Jules KWETUTUKA",
                title:
                  lang === "fr" ? "Responsable Protocole" : "Protocol Manager",
                phoneNumber: "+243 894 448 767",
                emailAdress: "JKWETUTUKA.ext@orange.com",
              },
              {
                name: "Samantha MUKENGE",
                title:
                  lang === "fr"
                    ? "Assistante du Directeur Général"
                    : "CEO's Assistant",
                phoneNumber: "+243 898900566",
                emailAdress: "SMukenge.ext@orange.com",
              },
              {
                name: "Richard MUKENDI",
                title: lang === "fr" ? "Chauffeur du DG" : "CEO's Driver",
                phoneNumber: "+243 852 100 223",
                emailAdress: "Richard.MUKENDI@orange.com",
              },
              {
                name: "Guelord MAKITU",
                title:
                  lang === "fr"
                    ? "Responsable charroi"
                    : "Transportation Manager",
                phoneNumber: "+243 898 900 557",
                emailAdress: "GMAKITU.ext@orange.com",
              },
              {
                name: "Numéro Vert",
                title: lang === "fr" ? "Urgence Santé" : "Health Emergency",
                phoneNumber: "+243 851 727 547",
                emailAdress: "",
              },
              {
                name: "Junior BILO",
                title: lang === "fr" ? "IT/Connectivité" : "IT/Internet",
                phoneNumber: "+243 898 900 362",
                emailAdress: "",
              },
              {
                name: "Godefroid GONDA",
                title: lang === "fr" ? "Moyens Généraux" : "General services",
                phoneNumber: "+243 848 410 167",
                emailAdress: "",
              },
              {
                name: "Helpdesk",
                title: "Helpdesk",
                phoneNumber: "500",
                emailAdress: "",
              },
            ].map((target, index) => {
              return (
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  sx={{
                    bgcolor: "transparent!important",
                    boxShadow: "none",
                    "& *": {
                      bgcolor: "transparent!important",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{
                      bgcolor: "transparent!important",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "50%",
                        fontSize: "12px",
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightThin,
                      }}
                    >
                      {target?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightRegular,
                      }}
                    >
                      {target?.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      bgcolor: "transparent!important",
                    }}
                  >
                    <MenuItem
                      sx={{
                        bgcolor: "transparent!important",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.grey[500],
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightLight,
                          }}
                        >
                          Téléphone
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightMedium,
                          }}
                        >
                          {target?.phoneNumber}
                        </Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        bgcolor: theme.palette.common.black,
                      }}
                    >
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.grey[500],
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightLight,
                          }}
                        >
                          Addresse Email
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightMedium,
                          }}
                        >
                          {target?.emailAdress}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </Stack>
      </Box>
      <Stack
        sx={{
          width: screen870 ? "100" : "30%",
          height: "max-content",
          bgcolor: theme.palette.common.black,
          borderRadius: "1.5rem",
          overflow: "hidden",
          mt: screen870 ? "1.5rem" : undefined,
        }}
      >
        <img
          src="/kinCity.png"
          alt="Kin the best"
          style={{
            width: "100%",
            height: "max-content",
          }}
        />

        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            p: "1rem",
            overflowX: "hidden",
            flexGrow: 1,
            height: "max-content",
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              // overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? " A l'arrivée" : "At the arrival"}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightThin,
                fontSize: "10px",
              }}
            >
              {lang === "fr"
                ? ` Vous serez pris en charge à l’aéroport par le protocole ORDC. En
              cas de problème, contactez les personnes en charge de la sécurité
              (Responsable de la Sécurité, Protocole ou Assistante du Directeur
              Général).`
                : `You will be picked up at the airport by the ORDC protocol. In
              in the event of a problem, contact the people in charge of security
              (Head of Security, Protocol or Assistant to the Director
              General).`}
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              //overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? "Vos déplacements" : "Your movements"}
            </Typography>
            <Stack>
              {[
                lang === "fr"
                  ? "Ne prenez jamais de taxi. Des véhicules seront mis à votre disposition"
                  : `Never take a taxi. Vehicles will be made available to you`,
                lang === "fr"
                  ? "Portez votre ceinture de sécurité en voiture et verrouillez vos portières"
                  : "Wear your seat belt in the car and lock your doors",
                lang === "fr"
                  ? "Ne vous déplacez jamais seul(e) mais accompagné(e) d’un chauffeur ou d’un collaborateur de Orange RDC"
                  : "Never travel alone but accompanied by a driver or an Orange DRC employee",
                lang === "fr"
                  ? "Pour tout trajet vers un site non RDC, informez le Responsable de la Sécurité ou le DG ORDC"
                  : "For any trip to a non-RDC site, inform the Security Manager or the CEO ORDC",
                lang === "fr"
                  ? "Mémorisez les adresses clés (hébergement, siège de la société, Ambassade de France, etc.) "
                  : "Memorize the key addresses (accommodation, company headquarters, French Embassy, ​​etc.)",
                lang === "fr"
                  ? "Ayez toujours sur vous une copie de vos documents d’identité (passeport muni du visa, billet d’avion, etc.) et ayez une copie électronique de votre passeport sur votre smartphone"
                  : "Always carry a copy of your identity documents with you (passport with visa, plane ticket, etc.) and have an electronic copy of your passport on your smartphone",
                lang === "fr"
                  ? "Ayez toujours avec vous vos médicaments"
                  : "Always have your medication with you",
              ]?.map((target) => {
                return (
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      my: ".5rem",
                    }}
                  >
                    <ArrowRightAlt
                      sx={{
                        color: theme.palette.common.white,
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightThin,
                        fontSize: "10px",
                        p: 0,
                        m: 0,
                      }}
                    >
                      {target}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              //overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? "Votre comportement" : "Your behaviour"}
            </Typography>
            <Stack>
              {[
                lang === "fr"
                  ? "Respectez strictement les lois en vigueur dans le pays. Certaines interdictions sont strictement réprimées (usage de stupéfiants et commerce de pierres précieuses). En cas de doute, questionnez le Responsable de la Sécurité"
                  : "Strictly respect the laws in force in the country. Certain prohibitions are strictly repressed (use of narcotics and trade in precious stones). If in doubt, ask the Security Manager",
                lang === "fr"
                  ? "Restez maître de vous en cas de contrôle et n’élevez jamais le ton"
                  : "Stay in control in case of control and never raise your voice",
                lang === "fr"
                  ? "La prise de photographies du palais présidentiel, aéroports, sites militaires, maisons d’arrêt, centrales d’énergie, cérémonies et cortèges officiels où est présent le Chef de l’Etat peut entraîner une arrestation. La prise de clichés de scènes de mendicité ou obscènes peut également entraîner des poursuites"
                  : "Taking photographs of the presidential palace, airports, military sites, remand prisons, power stations, ceremonies and official processions where the Head of State is present may lead to an arrest. Taking pictures of scenes of begging or obscene may also result in prosecution",
              ]?.map((target) => {
                return (
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      my: ".5rem",
                    }}
                  >
                    <ArrowRightAlt
                      sx={{
                        color: theme.palette.common.white,
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightThin,
                        fontSize: "10px",
                        p: 0,
                        m: 0,
                      }}
                    >
                      {target}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              //overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? "En cas de danger" : "In case of danger"}
            </Typography>
            <Stack>
              {[
                lang === "fr"
                  ? "Si vous êtes seul(e) et que vous vous sentez en danger, rejoignez l’un des points connus (hébergement, siège de la société, Ambassade de France) et prévenez le plus vite possible le Responsable de la Sécurité ou votre contact local"
                  : "If you are alone and you feel in danger, go to one of the known points (accommodation, company headquarters, French Embassy) and notify the Security Manager or your local contact as soon as possible. ",
                lang === "fr"
                  ? "Appliquez immédiatement et strictement les consignes qui peuvent vous être données par le Responsable de la Sécurité ou par votre contact à Orange RDC"
                  : "Appliquez immédiatement et strictement les consignes qui peuvent vous être données par le Responsable de la Sécurité ou par votre contact à Orange RDC",
              ]?.map((target) => {
                return (
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      my: ".5rem",
                    }}
                  >
                    <ArrowRightAlt
                      sx={{
                        color: theme.palette.common.white,
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightThin,
                        fontSize: "10px",
                        p: 0,
                        m: 0,
                      }}
                    >
                      {target}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              p: ".5rem",
              borderRadius: "1rem",
              //overflow: "hidden",
              width: "100%",
              bgcolor: "#FFFFFF10",
              m: ".5rem",
              height: "max-content",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: "12px",
              }}
            >
              Addresses
            </Typography>

            <Stack
              sx={{
                p: "1rem",
              }}
            >
              {[
                {
                  name: "Fleuve Congo Hôtel",
                  addresse: "119 Bd Colonel Tshatshi, Kinshasa",
                  contact: "+ 243 0815 090 153",
                },
                {
                  name: "UTEX, ORDC HQ",
                  addresse: "372 Avenue Colonel Mondjiba, Ngaliema, Kinshasa",
                  contact: "+243 0848 400 100",
                },
                {
                  name: "Ambassade de France",
                  addresse: "Avenue Colonel Mondjiba",
                  contact: "+243 0815 559 999",
                },
                {
                  name: "Pullman Hôtel",
                  addresse: "4 Avenue Batetela, Gombe - KINSHASA, RD Congo",
                  contact: "+243815 553 023",
                },
              ]?.map((target) => {
                return (
                  <Stack
                    direction={"column"}
                    sx={{
                      width: "100%",
                      my: ".5rem",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                        my: ".1rem",
                      }}
                    >
                      <LocationOn
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.common.white,
                          fontWeight: theme.typography.fontWeightThin,
                          fontSize: "10px",
                          p: 0,
                          m: 0,
                        }}
                      >
                        {target?.name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                        my: ".1rem",
                      }}
                    >
                      <Home
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.common.white,
                          fontWeight: theme.typography.fontWeightThin,
                          fontSize: "10px",
                          p: 0,
                          m: 0,
                        }}
                      >
                        {target?.addresse}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                        my: ".1rem",
                      }}
                    >
                      <Call
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.common.white,
                          fontWeight: theme.typography.fontWeightThin,
                          fontSize: "10px",
                          p: 0,
                          m: 0,
                        }}
                      >
                        {target?.contact}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Info;
