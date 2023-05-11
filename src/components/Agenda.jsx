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

const Agenda = ({}) => {
  const theme = useTheme();

  const [daysList, setDaysList] = React.useState(new Array(28).fill(""));

  React.useEffect(() => {
    setDaysList(
      daysList?.map((day, index) => {
        return `Mardi, le ${index + 1} mars 2003`;
      })
    );
  }, []);

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

  const [currentMenu, setCurrentMenu] = React.useState("");

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "flex-start",
        width: "100%",
        px: "5vw",
        py: "2rem",
        height: "100%",
        maxHeight: "100%",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontSize: "24px",
          fontWeight: theme.typography.fontWeightBold,
        }}
      >
        MON AGENDA
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-start",
          width: "100%",
          flexWrap: "wrap",
          mt: "1rem",
          px: "2rem",
          height: "100%",
          maxHeight: "100%",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            p: "1.5rem",
            minWidth: "200px",
            width: "max-content",
            bgcolor: theme.palette.common.white,
            maxHeight: "100%",
            overflowY: "auto",
            height: "100%",
            m: "1rem",
          }}
        >
          {daysList?.map((target, index) => {
            return (
              <Stack
                onClick={(event) => {
                  event?.preventDefault();

                  setCurrentMenu(target);
                }}
                direction={"row"}
                key={index}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  px: "1.5rem",
                  bgcolor:
                    currentMenu === target
                      ? theme.palette.primary.main
                      : undefined,
                  my: ".3rem",
                  cursor: "pointer",
                }}
              >
                <CalendarToday
                  sx={{
                    color:
                      currentMenu === target
                        ? theme.palette.common.white
                        : theme.palette.common["black"],
                    fontSize: "18px",
                    mr: ".5rem",
                  }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    color:
                      theme.palette.common[
                        currentMenu === target ? "white" : "black"
                      ],
                    fontWeight:
                      currentMenu === target
                        ? theme.typography.fontWeightMedium
                        : theme.typography.fontWeightLight,
                    fontSize: "14px",
                    px: "1rem",
                    py: ".5rem",
                  }}
                >
                  {target}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            flexGrow: 1,
            p: "2rem",
            bgcolor: theme.palette.common.white,
            m: "1rem",
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          {new Array(7).fill(programsData[0])?.map((target, id) => {
            return (
              <Accordion
                expanded={expanded === id}
                sx={{
                  mb: ".5rem",
                }}
                onChange={handleChange(id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    borderLeft: `5px solid ${
                      target?.time >= Date.now()
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
                      width: "45%",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        px: ".5rem",
                        py: ".2rem",
                        borderRadius: "10px",
                        bgcolor:
                          target?.time >= Date.now()
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
                          fontSize: "9px",
                        }}
                      >
                        {target?.title}
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
                          color: theme.palette.common.black,
                          fontSize: "24px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightMedium,
                        }}
                      >
                        {target?.duration}
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
                          color: theme.palette.common.black,
                          fontSize: "24px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightMedium,
                        }}
                      >
                        {target?.location}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignITems: "center",
                      height: "100%",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          target?.time >= Date.now()
                            ? theme.palette.primary.main
                            : theme.palette.grey[700],
                        fontSize: "14px",
                        fontWeight: theme.typography.fontWeightBold,
                      }}
                    >
                      {target?.description?.title}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      color: theme.palette.common.black,
                      fontSize: "14px",
                      fontWeight: theme.typography.fontWeightRegular,
                    }}
                  >
                    {target?.description?.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Agenda;
