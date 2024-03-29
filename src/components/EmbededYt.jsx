// component definition

import * as React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";
import { viewportsCtx } from "../../context/viewports";

const EmbededYt = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;

  const screen660 = React.useContext(viewportsCtx)?.screen660;

  const lang = React.useContext(LangCtx).lang;

  return (
    <Stack
      sx={{
        width: "100%",
        p: 0,
        m: 0,
        height: "100%",
        flexGrow: 1,
        borderRadius: "1.5rem",
        overflow: "hidden",
        pb: screen660 ? "2.1rem" : undefined,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "90%",
          flexGrow: 1,
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${
            lang === "fr" ? guest?.event?.frYtKey : guest?.event?.enYtKey
          }`}
          title="Session Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Box>
      <Stack
        sx={{
          width: "100%",
          height: "max-content",
          bgcolor: theme.palette.common.black,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "12px",
            fontWeight: theme.typography.fontWeightBold,
            width: "100%",
            my: screen660 ? ".3rem" : "1rem",
            textAlign: "center",
            pb: screen660 ? ".8rem" : undefined,
            pt: screen660 ? ".8rem" : undefined,
          }}
        >
          {lang === "fr"
            ? "Nous vous souhaitons encore bon séjour en RDC"
            : "We wish you to pass your best moments in DRC"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EmbededYt;
