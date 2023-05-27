// welcome page definition

import * as React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import { LangCtx } from "../../context/lang";
import configs from "../../configs/generals.json";
import Mail from "@mui/icons-material/Mail";
import Pin from "@mui/icons-material/Pin";
import Link from "@mui/icons-material/Link";

const Welcome = ({}) => {
  const theme = useTheme();

  const currentLang = React.useContext(LangCtx)?.lang;

  const talkMaterials = [
    {
      text: "Avant tout, vous devriez avoir reçu l'invitation de Orange RDC",
      icon: (props) => <Mail {...props} />,
    },
    {
      text: "Alors ouvrez le lien récu dans votre invitation",
      icon: (props) => <Link {...props} />,
    },
    {
      text: "Renseigner le OTP reçu sur votre téléphone à l'intant",
      icon: (props) => <Pin {...props} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Head>
        <title>{configs?.lang[currentLang]["welcome.page.title"]}</title>
      </Head>
      <Box
        sx={{
          width: "100vw",
          height: "100%",
          backgroundImage: "url('/web_events_okapi.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // bacgroundAttachement: "fixed",
          minHeight: "100vh",
          m: 0,
          p: 0,
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            bgcolor: `#000000CF`,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              fontSize: "24px",
              fontWeight: theme.typography.fontWeightThin,
              textAlign: "center",
              color: theme.palette.primary.main,
              m: 0,
              textAlign: "center",
            }}
          >
            LET'S CONNECT
          </Typography>
          <Typography
            component={"h1"}
            sx={{
              color: theme.palette.common.white,
              fontSize: "50px",
              fontWeight: theme.typography.fontWeightBlack,
              m: 0,
              textAlign: "center",
            }}
          >
            Digitizing our events
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "1px",
                bgcolor: theme.palette.grey[500],
                mr: "2rem",
                width: "5vw",
              }}
            ></Box>
            <Typography
              component={"h3"}
              sx={{
                color: theme.palette.grey[500],
                fontSize: "16px",
                fopntWeight: theme.typography.fontWeightLight,
                m: 0,
                textAlign: "center",
              }}
            >
              Vous rapprocher de l'essentiel
            </Typography>

            <Box
              sx={{
                height: "1px",
                bgcolor: theme.palette.grey[500],
                ml: "2rem",
                width: "5vw",
              }}
            ></Box>
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "stretch",
              width: "100%",
              justifyContent: "center",
              my: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {talkMaterials?.map((target, id) => {
              return (
                <Stack
                  direction={"column"}
                  key={id}
                  sx={{
                    p: "2rem",
                    border: `2px solid ${theme.palette.primary.main}`,
                    alignItems: "center",
                    minWidth: "150px",
                    maxWidth: "300px",
                    "&:hover": {
                      transition: `all .3s`,
                      bgcolor: theme.palette.common.black,
                      borderColor: theme.palette.common.black,
                      "& p": {
                        color: theme.palette.primary.main,
                        fontWeight: theme.typography.fontWeightMedium,
                      },
                    },
                    m: "1vw",
                  }}
                >
                  {target?.icon({
                    sx: {
                      color: theme.palette.primary.main,
                      fontSize: "42px",
                      mb: "1rem",
                    },
                  })}
                  <Typography
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: theme.typography.fontWeightLight,
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    {target?.text}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontWeight: theme.typography.fontWeightLight,
              textAlign: "center",
              fontSize: "14px",
              maxWidth: "100%",
              my: "1rem",
            }}
          >
            Powered by Orange RDC Developers Team. All rights reserved &copy;
            <br />
            Orange RDC SA {new Date().getFullYear()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Welcome;