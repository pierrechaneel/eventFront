// component definition

import * as React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";

const EmbededYt = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;

  const lang = React.useContext(LangCtx).lang;

  return (
    <Stack
      sx={{
        width: "100%",
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "70vh",
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
          height: "100%",
          bgcolor: theme.palette.common.black,
          borderRadius: `0px 0px 2.5rem 2.5rem`,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[700],
            fontSize: "14px",
            fontWeight: theme.typography.fontWeightMedium,
            width: "100%",
            my: "2rem",
            textAlign: "center",
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
