"use client";

// app layout definition

import * as React from "react";
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
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
import PostAdd from "@mui/icons-material/PostAdd";
import { SocketCtx } from "../../context/socket";

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
      title: "Live",
      link: `/guests/${router?.query?.guest}/meeting`,
      icon: (props) => <LiveTv {...props} />,
    },
    {
      title: "Networking",
      link: `/guests/${router?.query?.guest}/social-wall`,
      icon: (props) => <PostAdd {...props} />,
    },
  ];

  const loggedIn = React.useContext(GuestCtx)?.loggedIn;
  const guest = React.useContext(GuestCtx)?.guest;
  const subsSocket = React.useContext(SocketCtx).subsSocket;
  const isConnected = React.useContext(SocketCtx).isConnected;
  const setIsConnected = React.useContext(SocketCtx).setIsConnected;

  const isMenuCollapsed = React.useContext(LangCtx)?.isMenuCollapsed;
  const setIsMenuCollapsed = React.useContext(LangCtx)?.setIsMenuCollapsed;

  console.log("log in guest status", { loggedIn });

  React.useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  React.useEffect(() => {
    if (!isConnected) {
      console.log("siata", subsSocket);

      subsSocket.auth = {
        guest: {
          fullName: guest?.fullName,
          accessKey: guest?.accessKey,
          profile: guest?.profile,
          eventId: guest?.event?.id,
          eventSubject: guest?.event?.subject,
        },
      };

      subsSocket.connect();

      setIsConnected(true);
    }

    subsSocket.on("connect_error", function () {
      console.log("Connection failed, please retry later");

      setIsConnected(false);
    });

    console.log("current connection status", { isConnected, subsSocket });
  }, []);

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "flex-start",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        bgcolor: theme.palette.grey[900],
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          position: "fixed",
          alignItems: "center",
          p: "1.5rem",
          top: 0,
          bottom: 0,
          width: isMenuCollapsed ? "calc(70px + 1.5rem)" : "300px",
          left: 0,
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            bgcolor: theme.palette.common.black,
            width: "100%",
            height: "100%",
            p: "2rem",
            borderRadius: "2.5rem",
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
                    px: ".7rem",
                    py: ".5rem",
                    cursor: "pointer",
                    justifySelf: "flex-start",
                    my: ".5rem",
                    borderRadius: "1rem",
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
      </Stack>
      <Stack
        direction={"column"}
        sx={{
          ml: isMenuCollapsed ? "calc(70px + 1.5rem)" : "300px",
          bgcolor: theme.palette.grey[0],
          width: "100%",
          height: "100vh",
          maxHeight: "100vh",
          pt: "calc(70px + 3rem)",
          pr: "1.5rem",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            height: "70px",
            position: "fixed",
            top: 0,
            right: 0,
            left: isMenuCollapsed ? "calc(70px + 1.5rem)" : "300px",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              height: "100%",
              width: "100%",
              justifyContent: "space-between",
              bgcolor: theme.palette.common.black,
              px: "1rem",
              boxShadow: theme.shadows[1],
              borderRadius: "2.5rem",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "1.5rem",
              mr: "1.5rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                width: "100%",
                heigth: "100%",
              }}
            >
              <IconButton
                onClick={(event) => {
                  event?.preventDefault();
                  setIsMenuCollapsed(!isMenuCollapsed);
                }}
                sx={{
                  mr: "1rem",
                }}
              >
                <Menu
                  sx={{
                    fontSize: "22px",
                    color: theme.palette.common.white,
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontSize: "18px",
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                DIGITIZING OUR EVENTS
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "flex-start",
                width: "max-content",
                mr: "1.5rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                }}
              >
                {guest?.event?.subject?.split(" ")[0]?.toUpperCase() + " "}
              </Typography>
              {"."}
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                }}
              >
                {guest?.event?.subject
                  ?.split(" ")
                  .slice(1)
                  ?.join(" ")
                  ?.toUpperCase()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 80px)",
            maxHeight: "calc(100vh - 80px)",
            mr: "1.5rem",
            mb: "1.5rem",
            borderRadius: "2.5rem",
            // p: "2rem",
            overflow: "hidden",
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
