// Qa component definition

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

const Qa = ({}) => {
  const theme = useTheme();

  const [qas, setQas] = React.useState([]);

  const guest = React.useContext(GuestCtx).guest;

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`${configs?.backendUrl}/api/qa?eventId=${guest?.eventId}`)
        .then((results) => {
          console.log("Qa data gotten", results.data);

          setQas(results?.data?.result);
        })
        .catch((error) => {
          console.log("an error has occured when trying to get Qa data", error);
        });
    })();
  }, []);

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
        height: "100%",
        maxHeight: "100%",
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
          borderRadius: "1.5rem",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontSize: "24px",
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          FAQ
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-start",
          width: "100%",
          flexWrap: "wrap",
          mt: "2rem",
          p: "1.5rem",
          height: "100%",
          maxHeight: "100%",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            width: "100%",
          }}
        >
          {qas?.map((target, id) => {
            return (
              <Accordion
                expanded={expanded === id}
                sx={{
                  width: "100%",
                }}
                onChange={handleChange(id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      color: theme.palette.grey[400],
                      fontSize: "12px",
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: "14px",
                      my: ".5rem",
                    }}
                  >
                    {target?.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      color: theme.palette.common.black,
                      fontSize: "12px",
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: "14px",
                      my: ".5rem",
                    }}
                  >
                    {target?.answer}
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

export default Qa;
