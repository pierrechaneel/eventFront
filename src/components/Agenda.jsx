// agenda component definition

import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonBase,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationOn from "@mui/icons-material/LocationOn";
import AccessTime from "@mui/icons-material/PunchClock";
import CalendarToday from "@mui/icons-material/CalendarToday";
import axios from "axios";
import configs from "../../configs/generals.json";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";
import { EmojiPeople } from "@mui/icons-material";
import { viewportsCtx } from "../../context/viewports";

const Agenda = ({}) => {
  const theme = useTheme();

  const [programsData, setProgramsData] = React.useState([
    {
      title: "Petit Déjeûner",
      time: Date.now(),
      location: "Bones Room, Hugga Building",
      description: {
        title: "Déjeûner",
        content:
          "Vous profitez de bons moments avec les collègues tout en dégustant votre copulation au chaud",
      },
      duration: "5h - 11h",
    },
  ]);

  const lang = React.useContext(LangCtx).lang;

  const [currentMenu, setCurrentMenu] = React.useState("");

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [agenda, setAgenda] = React.useState({});

  const guest = React.useContext(GuestCtx).guest;

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`${configs?.backendUrl}/api/programs?eventId=${guest?.eventId}`)
        .then((results) => {
          console.log("agenda data gotten", results.data, { lang });

          let agendaData = {};

          results?.data?.result?.forEach((target) => {
            if (
              Object.keys(agendaData)?.includes(
                new Date(target?.date).toLocaleDateString(
                  `${lang}-${lang?.toUpperCase()}`,
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )
              )
            ) {
              agendaData[
                new Date(target?.date).toLocaleDateString(
                  `${lang}-${lang?.toUpperCase()}`,
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )
              ].push({
                ...target,
              });
            } else {
              const baseTime = new Date(target?.date);

              agendaData[
                new Date(baseTime).toLocaleDateString(
                  `${lang}-${lang?.toUpperCase()}`,
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )
              ] = [
                {
                  ...target,
                },
              ];
            }
          });

          setCurrentMenu(Object.keys(agendaData)[0]);

          setAgenda(agendaData);
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get agenda data",
            error
          );
        });
    })();
  }, []);

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  const isMenuCollapsed = React.useContext(viewportsCtx)?.isMenuCollapsed;

  const AgendaGroups = () => {
    return (
      <Stack
        direction={"column"}
        sx={{
          alignItems: "center",
          py: "1.5rem",
          px: screen870 ? ".7rem" : "1.5rem",
          minWidth: "150px",
          width: screen660 ? "90%" : "25%",
          //bgcolor: theme.palette.grey[900],
          maxHeight: screen660 ? "90%" : "100%",
          mx: screen660 ? "auto" : "1rem",
          minHeight: "200px",
          boxShadow:
            "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
          borderRadius: "1.5rem",
          border: `1px solid ${theme.palette.grey[900]}`,
          height: screen660 ? "max-content" : undefined,
        }}
      >
        <Stack
          sx={{
            width: "100%",
            overflowY: "auto",
            height: "100%",
          }}
        >
          {Object.keys(agenda)?.map((target, index) => {
            return (
              <Stack
                onClick={(event) => {
                  event?.preventDefault();

                  setCurrentMenu(target);

                  setIsSwippeableVisible(false);
                }}
                direction={"row"}
                key={index}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  px: "1rem",
                  bgcolor:
                    currentMenu === target
                      ? `${theme.palette.primary.main}20`
                      : undefined,
                  my: ".3rem",
                  cursor: "pointer",
                  borderRadius: "1rem",
                  height: "max-content!important",
                }}
              >
                <CalendarToday
                  sx={{
                    color: theme.palette.common["white"],
                    fontSize: "18px",
                    mr: ".1rem",
                  }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    color: theme.palette.primary.main,
                    fontWeight:
                      currentMenu === target
                        ? theme.typography.fontWeightBold
                        : theme.typography.fontWeightBold,
                    fontSize: "12px",
                    px: ".5rem",
                    py: ".5rem",
                    textTransform: "capitalize",
                  }}
                >
                  {target}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    );
  };

  const setDefaultSwippeableContent =
    React.useContext(viewportsCtx)?.setDefaultSwippeableContent;

  const setIsSwippeableVisible =
    React.useContext(viewportsCtx)?.setIsSwippeableVisible;

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        pb: screen660 ? "2.1rem" : undefined,
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-end",
          px: "2rem",
          pb: screen660 ? ".5rem" : "1rem",
          pt: screen660 ? "1rem" : "2rem",
          bgcolor: theme.palette.common.black,
          width: "100%",
          borderRadius: "1.5rem",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontSize: screen660 ? "14px" : "16px",
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          {lang === "fr" ? "Mon Agenda" : "My Agenda"}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-start",
          width: "100%",
          flexWrap: "no-wrap",
          mt: screen660 ? ".5rem" : "1rem",
          p: screen660 ? ".5rem" : screen870 ? "1rem" : "2rem",
          height: "100%",
          bgcolor: theme.palette.common.black,
          borderRadius: "1.5rem",
          overflow: "hidden",
        }}
      >
        {!screen660 ? <AgendaGroups /> : ""}
        <Stack
          direction={"column"}
          sx={{
            flexGrow: 1,
            py: screen660 ? "1rem" : "1.5rem",
            px: screen870 ? ".7rem" : "1.5rem",
            // bgcolor: theme.palette.grey[900],
            mx: screen660 ? ".5rem" : "1rem",
            height: "100%",
            maxHeight: "100%",
            boxShadow:
              "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
            borderRadius: "1.5rem",
            overflowY: "auto",
            border: `1px solid ${theme.palette.grey[900]}`,
          }}
        >
          {screen660 ? (
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                py: ".5rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: "12px",
                  fontWeight: theme.typography.fontWeightBold,
                  textTransform: "uppercase",
                }}
              >
                {currentMenu}
              </Typography>
              <Typography
                onClick={(event) => {
                  event?.preventDefault();

                  setDefaultSwippeableContent(AgendaGroups);

                  setIsSwippeableVisible(true);
                }}
                sx={{
                  color: theme.palette.grey[300],
                  fontSize: "12px",
                  fontWeight: theme.typography.fontWeightBold,
                  "&:hover": {
                    transition: `all .2s`,
                    color: theme.palette.common.white,
                  },
                  cursor: "pointer",
                }}
              >
                {lang === "fr" ? "Voir tous les jours" : "View all days"}
              </Typography>
            </Stack>
          ) : (
            ""
          )}
          {agenda[currentMenu]?.length > 0 ? (
            agenda[currentMenu]?.map((target, id) => {
              console.log("agendum data", target);
              return (
                <Accordion
                  expanded={expanded === id}
                  sx={{
                    my: ".5rem",
                    bgcolor: theme.palette.common.black,
                    border: `1px solid ${theme.palette.grey[900]}`,
                  }}
                  onChange={handleChange(id)}
                >
                  <AccordionSummary
                    expandIcon={false}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{
                      borderLeft: `5px solid ${
                        new Date(target?.date).getTime() < Date.now() &&
                        new Date(target?.date).getTime() +
                          Number.parseInt(target?.timing) * 60 * 1000 >
                          Date.now()
                          ? theme.palette.success.main
                          : new Date(target?.date).getTime() > Date.now()
                          ? theme.palette.primary.main
                          : theme.palette.grey[700]
                      }`,
                    }}
                  >
                    <Stack
                      direction={"column"}
                      spacing={1}
                      sx={{
                        alignItems: "flex-start",
                        width: "max-content",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          px: ".5rem",
                          py: ".2rem",
                          borderRadius: "12px",
                          bgcolor:
                            new Date(target?.date).getTime() < Date.now() &&
                            new Date(target?.date).getTime() +
                              Number.parseInt(target?.timing) * 60 * 1000 >
                              Date.now()
                              ? theme.palette.success.main
                              : new Date(target?.date).getTime() > Date.now()
                              ? theme.palette.primary.main
                              : theme.palette.grey[700],
                        }}
                      >
                        <CalendarToday
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                            mr: ".2rem",
                          }}
                        />

                        <Typography
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                          }}
                        >
                          {target?.label}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <AccessTime
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "24px",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: theme.palette.common.white,
                            fontWeight: theme.typography.fontWeightBold,
                          }}
                        >
                          {`${new Date(target?.date)?.toLocaleTimeString(
                            `${lang}-${lang?.toUpperCase()}`,
                            {
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )} - ${new Date(
                            new Date(target?.date).getTime() +
                              Number.parseInt(target?.timing) * 60 * 1000
                          )?.toLocaleTimeString(
                            `${lang}-${lang?.toUpperCase()}`,
                            {
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}`}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <LocationOn
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "24px",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: theme.palette.common.white,
                            fontWeight: theme.typography.fontWeightBold,
                          }}
                        >
                          {target?.place}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      direction={"column"}
                      sx={{
                        alignItems: "center",
                        height: "100%",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            new Date(target?.date).getTime() < Date.now() &&
                            new Date(target?.date).getTime() +
                              Number.parseInt(target?.timing) * 60 * 1000 >
                              Date.now()
                              ? theme.palette.success.main
                              : new Date(target?.date).getTime() > Date.now()
                              ? theme.palette.primary.main
                              : theme.palette.grey[700],
                          fontSize: "12px",
                          fontWeight: theme.typography.fontWeightBold,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {target?.subject}
                      </Typography>
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          mt: "1rem",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <EmojiPeople
                          sx={{
                            color:
                              new Date(target?.date).getTime() < Date.now() &&
                              new Date(target?.date).getTime() +
                                Number.parseInt(target?.timing) * 60 * 1000 >
                                Date.now()
                                ? theme.palette.success.main
                                : new Date(target?.date).getTime() > Date.now()
                                ? theme.palette.primary.main
                                : theme.palette.grey[700],
                            fontSize: "24px",
                            mr: ".2rem",
                          }}
                        />
                        <Typography
                          sx={{
                            color: theme.palette.grey[300],
                            fontWeight: theme.typography.fontWeightBold,
                            fontSize: "12px",
                          }}
                        >
                          {target?.speaker}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      direction={"column"}
                      sx={{
                        height: "100%",
                        justifyContent: "flex-end",
                        width: "max-content",
                        alignItems: "flex-end",
                      }}
                    >
                      {target?.description?.length > 0 ? (
                        <ExpandMore
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "18px",
                            mt: "4.5rem",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Stack>
                  </AccordionSummary>
                  {target?.description?.length > 0 ? (
                    <AccordionDetails>
                      <Typography
                        sx={{
                          color: theme.palette.grey[300],
                          fontSize: "12px",
                          fontWeight: theme.typography.fontWeightBold,
                        }}
                      >
                        {target?.description}
                      </Typography>
                    </AccordionDetails>
                  ) : (
                    ""
                  )}
                </Accordion>
              );
            })
          ) : (
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                my: "3rem",
                fontSize: "16px",
                color: theme.palette.common.white,
              }}
            >
              Loading ...
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Agenda;
