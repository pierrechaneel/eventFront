// welcome page definition

import * as React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import { LangCtx } from "../../context/lang";
import configs from "../../configs/generals.json";
import Mail from "@mui/icons-material/Mail";
import Pin from "@mui/icons-material/Pin";
import Link from "@mui/icons-material/Link";
import { viewportsCtx } from "../../context/viewports";

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
      text: "Renseigner le OTP reçu sur votre téléphone à l'instant",
      icon: (props) => <Pin {...props} />,
    },
  ];

  React.useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Head>
        <title>Welcome</title>
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
          minHeight: "100vh",
          m: 0,
          p: 0,
          overflow: "hidden",
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
            maxHeight: "100vh",
            minHeight: "100vh",
            overflowY: "auto",
            px: "2rem",
            pt: screen660 ? "10rem" : undefined,
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              fontSize: screen870 ? "14px" : "18px",
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
              fontSize: screen870 ? "26px" : "50px",
              fontWeight: theme.typography.fontWeightBlack,
              m: 0,
              textAlign: "center",
              lineHeight: 0.9,
              mb: ".5rem",
            }}
          >
            Digitizing our events
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              width: screen660 ? "90%" : screen870 ? "60%" : "30%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "1px",
                bgcolor: theme.palette.grey[300],
                flexGrow: 1,
                minWidth: "50px",
              }}
            ></Box>
            <Typography
              component={"h3"}
              sx={{
                color: theme.palette.grey[300],
                fontSize: screen660 ? "10px" : screen870 ? "12px" : "14px",
                fopntWeight: theme.typography.fontWeightLight,
                m: 0,
                textAlign: "center",
                mx: screen870 ? ".5rem" : "1rem",
              }}
            >
              Vous rapprocher de l'essentiel
            </Typography>

            <Box
              sx={{
                height: "1px",
                bgcolor: theme.palette.grey[300],
                flexGrow: 1,
                minWidth: "50px",
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
                    px: "2vw",
                    py: screen660 ? ".5rem" : "1.2rem",
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
                        //  fontWeight: theme.typography.fontWeightMedium,
                      },
                    },
                    m: "1vw",
                    my: screen660 ? ".5rem" : undefined,
                  }}
                >
                  {target?.icon({
                    sx: {
                      color: theme.palette.primary.main,
                      fontSize: "24px",
                      mb: ".2rem",
                    },
                  })}
                  <Typography
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: theme.typography.fontWeightRegular,
                      fontSize: "14px",
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
              color: theme.palette.grey[300],
              fontWeight: theme.typography.fontWeightLight,
              textAlign: "center",
              fontSize: "10px",
              maxWidth: screen870 ? "95%" : "60%",
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
