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
import DownloadContacts from "./DownloadContacts";

const Info = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;

  const lang = React.useContext(LangCtx).lang;

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const contacts = [
    {
      name: "Numéro Vert",
      title: lang === "fr" ? `Urgence Santé` : `Health Emergency`,
      phoneNumber: "+243 851 727 547",
      emailAdress: "",
    },
    {
      name: "Dieu Merci MUEMBO",
      title:
        lang === "fr"
          ? "Sécurité physique et Sureté"
          : "Head of Human Ressources and Security",
      phoneNumber: "+243 898 900 910",
      emailAdress: "dmuembo.ext@orange.com",
    },
    {
      name: "Guelord MAKITU",
      title: lang === "fr" ? "Responsable charroi" : "Transport manager",
      phoneNumber: "+243 898 900 557",
      emailAdress: "Gmakitu.ext@orange.com",
    },
    {
      name: "Toto ",
      title:
        lang === "fr" ? "Président du comité" : "Committee Chairman",
      phoneNumber: "+243 844 275 050",
      emailAdress: "SMukenge.ext@orange.com",
    },
    {
      name: "Julie KOFFI",
      title: lang === "fr" ? "Coordination" : "Coordination",
      phoneNumber: "+243 898 900 018",
      emailAdress: "Richard.MUKENDI@orange.com",
    },
    {
      name: "HelpDesk",
      title:
        lang === "fr"
          ? "HelpDesk"
          : "HelpDesk",
      phoneNumber: "500",
      emailAdress: "",
    },
   
  ];

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
        pb: screen660 ? "2.1rem" : undefined,

        //bgcolor: theme.palette.common.black,
      }}
    >
      <Box
        sx={{
          height: "max-content",
          maxHeight: "max-content",
          width: screen870 ? "100%" : "70%",
          p: screen870 ? "1rem" : "2rem",
          bgcolor: theme.palette.common.black,
          overflowX: "hidden",
          borderRadius: "1.5rem",
          mr: screen870 ? undefined : "1.5rem",
        }}
      >
        <img
          src="/carte.jpg"
          alt="safe zones"
          style={{
            width: "100%",
            borderRadius: "1.5rem",
            marginTop: screen660 ? ".5rem" : screen870 ? "1rem" : "1.5rem",
            marginBottom: screen660 ? ".5rem" : screen870 ? "1rem" : "1.5rem",
          }}
        />
        <DownloadContacts contacts={contacts} />
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            borderRadius: "1.5rem",
            bgcolor: "#FFFFFF10",
            p: screen660 ? ".5rem" : screen870 ? "1rem" : "2rem",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: "14px",
              mb: screen660 ? ".5rem" : "1rem",
            }}
          >
            {lang === "fr" ? "Numéros importants" : "Imrtant phone numbers"}
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
            {contacts.map((target, index) => {
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
                        fontWeight: theme.typography.fontWeightBold,
                      }}
                    >
                      {target?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightBold,
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
                            color: theme.palette.grey[300],
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightBold,
                          }}
                        >
                          Téléphone
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightBold,
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
                            color: theme.palette.grey[300],
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightBold,
                          }}
                        >
                          Addresse Email
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                            fontWeight: theme.typography.fontWeightBold,
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
          mt: screen660 ? ".5rem" : screen870 ? "1rem" : undefined,
        }}
      >
        <img
          src="/kongo.jpeg"
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
            p: screen660 ? ".5rem" : "1rem",
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
              mb: screen660 ? "0rem" : undefined,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? " A l'arrivée" : "At the arrival"}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "12px",
              }}
            >
              {lang === "fr"
                ? `En
              cas de problème, contactez les personnes en charge de la sécurité
              (Responsable de la Sécurité, Protocole ou Assistante du Directeur
              Général).`
                : `In
              in the event of a problem, contact the people in charge of security
              (Head of Security, Protocol or Assistant to the Director
              General).`}
            </Typography>
          </Stack>

          <DownloadContacts contacts={contacts} />
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
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? "Vos déplacements" : "Your movements"}
            </Typography>
            <Stack>
              {[
                lang === "fr"
                  ? "Quitter la ville de Kinshasa avant 6 heures du matin pour éviter les embouteillages et surtout sur la route Matadi Kibala, Mitendi et celle du péage de Kasangulu"
                  : `Leave the city of Kinshasa before 6 a.m. to avoid traffic jams and especially on the Matadi Kibala, Mitendi and Kasangulu toll roads`,
                lang === "fr"
                  ? "Portez votre ceinture de sécurité en voiture et verrouillez vos portières "
                  : "Wear your seat belt in the car and lock your doors",
                lang === "fr"
                  ? "Toujours circuler à bord des véhicules vitres fermées et portes verrouillées"
                  : "Always travel in vehicles with windows closed and doors locked",
                lang === "fr"
                  ? "Eviter si possible les déplacements de nuit "
                  : "Avoid traveling at night if possible",
                lang === "fr"
                  ? "Eviter les déplacements à pied et ce, même sur une distance courte "
                  : "Avoid traveling on foot, even over a short distance",
                lang === "fr"
                  ? "En cas de sortie véhiculée hors des limites de la ville, essayez de partir à plusieurs véhicules "
                  : "In the event of a vehicle exit outside the city limits, try to leave with several vehicles",
                lang === "fr"
                  ? "Eviter de vous déplacer avec des sommes d’argent importante pour éviter la convoitise, ne porter pas de signes ostentatoires (bijoux, montre de valeur)."
                  : "Avoid carrying large sums of money to avoid covetousness, do not wear ostentatious symbols (jewelry, valuable watches).",
              
                  lang === "fr"
                  ? "Pour la visite des marchés se faire toujours accompagner par les éléments PNC/Delta."
                  : "When visiting the markets, always be accompanied by PNC/Delta elements.",
                  lang === "fr"
                  ? "Ayez toujours sur vous une copie de vos documents d’identité (Carte d’électeur, passeport muni du visa, billet d’avion, etc.) et ayez une copie électronique de vos cartes d’identités sur votre smartphone "
                  : "Always carry a copy of your identity documents with you (voter card, passport with visa, plane ticket, etc.) and have an electronic copy of your identity cards on your smartphone",
                  lang === "fr"
                  ? "Ayez toujours avec vous vos médicaments"
                  : "Always have your medications with you",
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
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: "12px",
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
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "12px",
              }}
            >
              {lang === "fr" ? "Votre comportement" : "Your behaviour"}
            </Typography>
            <Stack>
              {[
                lang === "fr"
                  ? "Ne laisser aucune personne inconnue entrer dans votre habitation, recevez- les à la porte"
                  : "Do not let any unknown person enter your home, receive them at the door",
                lang === "fr"
                  ? "Lorsque vous quittez vos locaux ou habitations, pensez à fermer toutes les portes et fenêtres"
                  : "When you leave your premises or homes, remember to close all doors and windows",
                lang === "fr"
                  ? "Vérifiez régulièrement, les issues et systèmes de fermetures ainsi que la sécurité passive de vos sites (serrure, fenêtre, porte etc.)"
                  : "Regularly check the exits and closing systems as well as the passive security of your sites (lock, window, door, etc.)",
                  lang === "fr"
                  ? "Restez maître de vous en cas de contrôle et n’élevez jamais le ton"
                  : "Remain in control if controlled and never raise your voice",
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
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: "12px",
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
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "12px",
              }}
            >
            
            </Typography>

            <Stack
              sx={{
                p: "1rem",
              }}
            >
              {/*
              [
                {
                  name: "Fleuve Congo Hôtel",
                  addresse: "119 Bd Colonel Tshatshi, Kinshasa",
                  contact: "+243 0815 090 153",
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
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: "12px",
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
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: "12px",
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
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: "12px",
                          p: 0,
                          m: 0,
                        }}
                      >
                        {target?.contact}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })
              
              */}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Info;
