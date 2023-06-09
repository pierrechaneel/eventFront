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
import SnackMessage from "./SnackMessage";
import { viewportsCtx } from "../../context/viewports";
import BottomSwippeable from "./BottomSwippeable";
import { Logout } from "@mui/icons-material";
import MenuItems from "./MenuItems";

import configs from "../../configs/generals.json";
import axios from "axios";
import Loader from "./Loader";

const AppLayout = ({ children }) => {
  const theme = useTheme();

  const router = useRouter();

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  /** React.useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []); */

  const apps = React.useContext(viewportsCtx)?.apps;

  const loggedIn = React.useContext(GuestCtx)?.loggedIn;
  const setLoggedIn = React.useContext(GuestCtx)?.setLoggedIn;
  const guest = React.useContext(GuestCtx)?.guest;
  const setGuest = React.useContext(GuestCtx)?.setGuest;
  const subsSocket = React.useContext(SocketCtx).subsSocket;
  const isConnected = React.useContext(SocketCtx).isConnected;
  const setIsConnected = React.useContext(SocketCtx).setIsConnected;

  const isMenuCollapsed = React.useContext(viewportsCtx)?.isMenuCollapsed;
  const setIsMenuCollapsed = React.useContext(viewportsCtx)?.setIsMenuCollapsed;
  const setIsSwippeableVisible =
    React?.useContext(viewportsCtx)?.setIsSwippeableVisible;
  const isSwippeableVisible =
    React.useContext(viewportsCtx)?.isSwippeableVisible;

  const setDefaultSwippeableContent =
    React.useContext(viewportsCtx)?.setDefaultSwippeableContent;

  console.log("log in guest status", { loggedIn });

  const [sentTrafficData, setSentTrafficData] = React.useState(false);

  React.useEffect(() => {
    if (!loggedIn || !sentTrafficData) {
      console.log("guest is not logged in");

      let guestObj = JSON.parse(window.sessionStorage.getItem("guest"));

      console.log("guest object def received", guestObj);

      (async () => {
        let trafficObj = {};

        // alert("ok, lemme see the next page, testing user data collection");

        window.navigator.geolocation.getCurrentPosition(
          async (position) => {
            trafficObj["longitude"] = position.coords.longitude;
            trafficObj["latitude"] = position.coords.latitude;
            trafficObj["accuracy"] = position.coords.accuracy;
            trafficObj["altitude"] = position.coords.altitude;
            trafficObj["altitudeAccuracy"] = position.coords.altitudeAccuracy;
            trafficObj["visitorName"] = guestObj.fullName;
            trafficObj["visitorEmail"] = guestObj.email;
            trafficObj["webPage"] = window.location.pathname;

            console.log("should send traffic data", trafficObj);

            await axios
              .post(`${configs?.backendUrl}/api/traffic`, trafficObj, {
                headers: { "Content-Type": "application/json" },
              })
              .then((results) => {
                setSentTrafficData(true);
              })
              .catch((error) => {
                console.log(
                  "an error has occured when sending user traffic data",
                  error
                );
              });
          },
          async (error) => {
            console.log(
              "has refused sending geographical personal data",
              error
            );

            trafficObj["longitude"] = 0;
            trafficObj["latitude"] = 0;
            trafficObj["accuracy"] = 0;
            trafficObj["altitude"] = 0;
            trafficObj["altitudeAccuracy"] = 0;
            trafficObj["visitorName"] = guestObj.fullName;
            trafficObj["visitorEmail"] = guestObj.email;
            trafficObj["webPage"] = window.location.pathname;

            console.log(
              "should send traffic data even if position data is null",
              trafficObj
            );

            await axios
              .post(`${configs?.backendUrl}/api/traffic`, trafficObj, {
                headers: { "Content-Type": "application/json" },
              })
              .then((results) => {
                setSentTrafficData(true);
              })
              .catch((error) => {
                console.log(
                  "an error has occured when sending user traffic data",
                  error
                );
              });
          }
        );
      })();

      if (guestObj) {
        setLoggedIn(true);

        setGuest(guestObj);

        console.log("updated guest loggin in status");

        if (!isConnected) {
          subsSocket.auth = {
            guest: {
              fullName: guestObj?.fullName,
              accessKey: guestObj?.accessKey,
              profile: guestObj?.profile,
              eventId: guestObj?.event?.id,
              eventSubject: guestObj?.event?.subject,
            },
          };

          console.log(
            "auth params we are sending to the io server for realtime communications",
            {
              guest: {
                fullName: guestObj?.fullName,
                accessKey: guestObj?.accessKey,
                profile: guestObj?.profile,
                eventId: guestObj?.event?.id,
                eventSubject: guestObj?.event?.subject,
              },
            }
          );

          subsSocket.connect();

          console.log("connected the server socket io successfully");

          setIsConnected(true);
        }

        subsSocket.on("connect_error", function () {
          console.log("Connection failed, please retry later");

          setIsConnected(false);

          setSnackMessage(
            lang === "fr" ? "Vous êtes hors connexion" : "You are affline"
          );
          setSeverity("warning");
          setIsnackVisible(true);
        });

        subsSocket.io.on("reconnect", (attempt) => {
          setIsConnected(false);

          setSnackMessage(
            lang === "fr"
              ? "Votre connection s'est retablie"
              : "Internet is back"
          );
          setSeverity("success");
          setIsnackVisible(true);
        });

        subsSocket.on("HELD_MESSAGES", (payload) => {
          console.log("current help messages from socket", payload);
        });

        console.log("current connection status", { isConnected, subsSocket });

        return () => {
          console.log("cleaning up handlers");

          subsSocket.off("connect_error");
          subsSocket.off("HELD_MESSAGES");
        };
      } else {
        router.push("/");

        console.log("No user data set, loggin out");
      }
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsnackVisible(false);
  };

  const handleLogout = (event) => {
    event?.preventDefault();

    window.sessionStorage.clear();

    router.push("/");
  };

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const lang = React.useContext(LangCtx)?.lang;
  const [transit, setTransit] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setTransit(false);
    }, 3000);
  }, []);

  return (
    <>
      {transit ? (
        <Loader />
      ) : (
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
          {isSnackVisible ? (
            <SnackMessage
              handleClose={handleClose}
              message={snackMessage}
              severity={severity}
            />
          ) : (
            ""
          )}
          <Stack
            direction={"column"}
            sx={{
              position: "fixed",
              alignItems: "center",
              p: "1.5rem",
              top: 0,
              bottom: 0,
              width: isMenuCollapsed ? "calc(50px + 1.5rem)" : "250px",
              left: 0,
              display: screen660 ? "none" : undefined,
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                alignItems: "center",
                bgcolor: theme.palette.common.black,
                width: "100%",
                height: "100%",
                p: "1.5rem",
                borderRadius: "1.5rem",
                position: "relative",
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
                    width: isMenuCollapsed ? "20px" : "30px",
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
                      fontSize: "12px",
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
                  mt: "4vh",
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
                        my: ".3rem",
                        borderRadius: "1rem",
                      }}
                    >
                      {target?.icon({
                        sx: {
                          fontSize: "18px",
                          width: "18px",
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
                            fontSize: "12px",
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
              <Stack
                onClick={handleLogout}
                direction={"row"}
                sx={{
                  alignItems: "center",
                  width: "max-content",
                  position: "absolute",
                  right: 0,
                  left: 0,
                  bottom: "1.5rem",
                  justifyContent: "center",
                  mx: "auto",
                  bgcolor: "#FFFFFF10",
                  py: ".2rem",
                  px: ".7rem",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover": {
                    "& *": {
                      transition: `all .3s`,
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <Logout
                  sx={{
                    color: theme.palette.grey[300],
                    fontSize: "18px",
                  }}
                />
                {isMenuCollapsed ? (
                  ""
                ) : (
                  <Typography
                    sx={{
                      color: theme.palette.grey[300],
                      fontSize: "13px",
                      ml: ".3rem",
                    }}
                  >
                    {lang === "fr" ? " Déconnnexion" : "Log out"}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              ml: screen660
                ? "1.5rem"
                : isMenuCollapsed
                ? "calc(50px + 1.5rem)"
                : "250px",
              bgcolor: theme.palette.grey[0],
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
              height: "100vh",
              maxHeight: "100vh",
              pt: screen660 ? "calc(50px + 1.5rem)" : "calc(50px + 2.5rem)",
              pr: "1.5rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                height: "50px",
                position: "fixed",
                top: 0,
                right: 0,
                left: screen660
                  ? "0rem"
                  : isMenuCollapsed
                  ? "calc(50px + 1.5rem)"
                  : "250px",
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
                  borderRadius: screen660 ? "0px 0px 1.5rem 1.5rem" : "1.5rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: screen660 ? "0rem" : "1.5rem",
                  mr: screen660 ? "0rem" : "1.5rem",
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

                      if (screen660) {
                        setDefaultSwippeableContent(<MenuItems apps={apps} />);
                        setIsSwippeableVisible(true);
                      } else {
                        setIsMenuCollapsed(!isMenuCollapsed);
                      }
                    }}
                    sx={{
                      mr: ".3rem",
                    }}
                  >
                    <Menu
                      sx={{
                        fontSize: "18px",
                        color: theme.palette.common.white,
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                  <img
                    src={"/saio.png"}
                    alt="orange zone saio"
                    style={{
                      width: screen660 ? "75px" : "120px",
                    }}
                  />
                </Stack>
                {screen870 ? (
                  ""
                ) : (
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
                        color: theme.palette.primary.main,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        fontSize: screen870 ? "14px" : "16px",
                      }}
                    >
                      {guest?.event?.subject
                        ? guest?.event?.subject?.split(" ")[0] + " "
                        : ""}
                    </Typography>
                    {"."}
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        fontSize: screen870 ? "14px" : "16px",
                      }}
                    >
                      {guest?.event?.subject?.split(" ").slice(1)?.join(" ")}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "calc(100vh - 80px)",
                maxHeight: "calc(100vh - 80px)",
                mr: "1.5rem",
                mb: screen660 ? "2rem" : "1.5rem",
                //borderRadius: "1.5rem",
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
                    variant="rounded"
                    width={"100%"}
                    height={"100%"}
                    animation="wave"
                  />
                </Stack>
              )}
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AppLayout;
