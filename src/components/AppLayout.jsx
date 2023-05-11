"use client";

// app layout definition

import * as React from "react";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import Menu from "@mui/icons-material/Menu";
import Chat from "@mui/icons-material/Chat";
import Info from "@mui/icons-material/Info";
import LiveTv from "@mui/icons-material/LiveTv";
import MeetingRoom from "@mui/icons-material/MeetingRoom";
import Person from "@mui/icons-material/Person";
import ViewAgenda from "@mui/icons-material/ViewAgenda";
import QrCode from "@mui/icons-material/QrCode";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import People from "@mui/icons-material/People";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";

const AppLayout = ({ children }) => {
  const theme = useTheme();

  const router = useRouter();

  React.useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []);

  const apps = [
    {
      title: "Profile",
      link: `/guests/${router?.query?.guest}/profile`,
      icon: (props) => <Person {...props} />,
    },
    {
      title: "QR Code",
      link: `/guests/${router?.query?.guest}/qrcode`,
      icon: (props) => <QrCode {...props} />,
    },
    {
      title: "Agenda",
      link: `/guests/${router?.query?.guest}/agenda`,
      icon: (props) => <ViewAgenda {...props} />,
    },
    {
      title: "Contacts",
      link: `/guests/${router?.query?.guest}/contacts`,
      icon: (props) => <People {...props} />,
    },
    {
      title: "Informations",
      link: `/guests/${router?.query?.guest}/infos`,
      icon: (props) => <Info {...props} />,
    },
    {
      title: "Q&A",
      link: `/guests/${router?.query?.guest}/qa`,
      icon: (props) => <QuestionAnswer {...props} />,
    },
    {
      title: "Networking",
      link: `/guests/${router?.query?.guest}/chat`,
      icon: (props) => <Chat {...props} />,
    },
    {
      title: "Meeting",
      link: `/guests/${router?.query?.guest}/meeting`,
      icon: (props) => <MeetingRoom {...props} />,
    },
    {
      title: "Publications",
      link: `/guests/${router?.query?.guest}/meeting`,
      icon: (props) => <LiveTv {...props} />,
    },
  ];

  const loggedIn = React.useContext(GuestCtx)?.loggedIn;

  const isMenuCollapsed = React.useContext(LangCtx)?.isMenuCollapsed;
  const setIsMenuCollapsed = React.useContext(LangCtx)?.setIsMenuCollapsed;

  console.log("log in guest status", { loggedIn });

  React.useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "flex-start",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          position: "fixed",
          alignItems: "center",
          p: "2rem",
          bgcolor: theme.palette.common.black,
          top: 0,
          bottom: 0,
          width: isMenuCollapsed ? "70px" : "300px",
          left: 0,
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src="/orange-less.png"
            alt="ordc"
            style={{
              width: isMenuCollapsed ? "30px" : "50px",
            }}
          />
          {!isMenuCollapsed ? (
            <Typography
              component={"h2"}
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                textAlign: "center",
                mt: ".5rem",
              }}
            >
              Orange RDC
            </Typography>
          ) : (
            ""
          )}
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            mt: "10vh",
          }}
        >
          {apps?.map((target, index) => {
            return (
              <Stack
                key={index}
                direction={"coulumn"}
                onClick={(event) => {
                  event?.preventDefault();

                  router.push(target?.link);
                }}
                sx={{
                  alignItems: "center",
                  bgcolor: router?.asPath?.includes(target?.link)
                    ? "#FFFFFF10"
                    : theme.palette.common.black,
                  // flexGrow: 1,
                  width: "100%",
                  px: ".5rem",
                  py: ".5rem",
                  cursor: "pointer",
                  justifySelf: "flex-start",
                  my: ".5rem",
                }}
              >
                {target?.icon({
                  sx: {
                    fontSize: "28px",
                    color: isMenuCollapsed
                      ? router?.asPath?.includes(target?.link)
                        ? theme.palette.common.white
                        : theme.palette.grey[500]
                      : theme.palette.primary.main,
                  },
                })}
                {!isMenuCollapsed ? (
                  <Typography
                    component={"span"}
                    sx={{
                      fontWeight: theme.typography.fontWeightMedium,
                      color: router?.asPath?.includes(target?.link)
                        ? theme.palette.common.white
                        : theme.palette.grey[500],
                      fontSize: "16px",
                      ml: ".7rem",
                      textAlign: "center",
                    }}
                  >
                    {target?.title}
                  </Typography>
                ) : (
                  ""
                )}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack
        direction={"column"}
        sx={{
          ml: isMenuCollapsed ? "70px" : "300px",
          bgcolor: theme.palette.grey[100],
          width: "100%",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            height: "70px",
            justifyContent: "space-between",
            bgcolor: theme.palette.common.white,
            px: "1rem",
            position: "fixed",
            top: 0,
            right: 0,
            left: isMenuCollapsed ? "70px" : "300px",
            boxShadow: theme.shadows[1],
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              width: "100%",
            }}
          >
            <Menu
              onClick={(event) => {
                event?.preventDefault();
                setIsMenuCollapsed(!isMenuCollapsed);
              }}
              sx={{
                fontSize: "22px",
                color: theme.palette.common.black,
                mr: "1rem",
                cursor: "pointer",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontSize: "18px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              DIGITAL EVENTS
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 80px)",
            pt: "70px",
            maxHeight: "calc(100vh - 80px)",
          }}
        >
          {loggedIn ? (
            children
          ) : (
            <Stack
              spacing={5}
              direction={"row"}
              sx={{
                width: "100%",
                justifyContent: "center",
                p: "5rem",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={"45%"}
                height={260}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={"45%"}
                height={260}
                animation="wave"
              />
            </Stack>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default AppLayout;
