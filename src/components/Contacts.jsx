// Contacts component definition

import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Button,
  ButtonBase,
  InputBase,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PersonAddDisabled from "@mui/icons-material/PersonAddDisabled";
import { GuestCtx } from "../../context/guest";
import axios from "axios";
import configs from "../../configs/generals.json";
import { LangCtx } from "../../context/lang";
import { SocketCtx } from "../../context/socket";
import SnackMessage from "./SnackMessage";
import { viewportsCtx } from "../../context/viewports";
import { contactsCtx } from "../../context/contacts";
import ContactsList from "./ContactsList";

const Contacts = ({}) => {
  const theme = useTheme();

  const chatSubject = React.useContext(contactsCtx)?.chatSubject;
  const setChatSubject = React.useContext(contactsCtx)?.setChatSubject;
  const filterGuests = React.useContext(contactsCtx)?.filterGuests;
  const setFilteGuests = React.useContext(contactsCtx)?.setFilteGuests;
  const setguests = React.useContext(contactsCtx)?.setguests;
  const guests = React.useContext(contactsCtx)?.guests;

  const socket = React.useContext(SocketCtx).subsSocket;

  const chatMsgs = React.useContext(contactsCtx)?.chatMsgs;
  const setChatMsgs = React.useContext(contactsCtx)?.setChatMsgs;

  const chats = React.useContext(contactsCtx)?.chats;

  React.useEffect(() => {
    socket.on("NEW_PRIVATE_MSG", (payload) => {
      console.log("private message payload", payload);

      const groupKey = new Date(payload?.createdAt).toLocaleDateString(
        `${lang}-${lang.toUpperCase()}`
      );

      if (Object.keys(chats?.current)?.includes(groupKey)) {
        const newChats = { ...chats.current };

        newChats[groupKey] = [payload, ...chats?.current[groupKey]];

        chats.current = newChats;
      } else {
        const newChats = { ...chats.current };

        newChats[groupKey] = [payload];

        chats.current = newChats;
      }

      // console.log("new chat messages", chats.current);

      new Audio("/sounds/post.mp3")?.play();

      setChatMsgs(chats.current);

      return () => {
        console.log("cleaning up handlers");

        socket.off("NEW_PRIVATE_MSG");
      };
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsnackVisible(false);
  };

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const handleSearch = (event) => {
    event?.preventDefault();

    const search = event?.target?.value;

    setSearchKey(search);

    // console.log("search stat, ", guests, searchKey);

    setFilteGuests(
      guests?.filter((target) => {
        return (
          target?.fullName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          target?.title?.toLowerCase()?.includes(search?.toLowerCase())
        );
      })
    );
  };

  const handleChat = async (event) => {
    event.preventDefault();

    const chatObj = {};

    Array.from(event?.target?.elements)
      ?.filter((chat) => chat?.name !== "")
      .forEach((element) => {
        chatObj[element?.name] = element?.value;
      });

    console.log("chat message", chatObj);

    if (chatObj?.message?.length > 0) {
      console.log("message post object", {
        content: chatObj?.message,
        from: guest?.accessKey,
        createdAt: new Date(),
        to: chatSubject?.accessKey,
        eventId: guest?.event?.id,
      });

      await axios
        .post(`${configs?.backendUrl}/api/messages`, {
          content: chatObj?.message,
          from: guest?.accessKey,
          createdAt: new Date(),
          to: chatSubject?.accessKey,
          eventId: guest?.event?.id,
        })
        .then((results) => {
          const payload = {
            content: chatObj?.message,
            from: guest?.accessKey,
            createdAt: new Date().toISOString(),
            to: chatSubject?.accessKey,
            id: Date.now(),
          };

          socket.emit("NEW_PRIVATE_MSG", payload);

          const groupKey = new Date(payload?.createdAt).toLocaleDateString(
            `${lang}-${lang.toUpperCase()}`
          );

          if (Object.keys(chats?.current)?.includes(groupKey)) {
            const newChats = { ...chats.current };

            newChats[groupKey] = [payload, ...chats?.current[groupKey]];

            console.log("we updated it ");

            chats.current = newChats;
          } else {
            const newChats = { ...chats.current };

            newChats[groupKey] = [payload];

            console.log("we updated it ");

            chats.current = newChats;
          }

          console.log("here the current computed chats", chats?.current);

          setChatMsgs(chats.current);
        })
        .catch((error) => {
          console.log(
            "an error has occured when adding a new chat message",
            error
          );

          setSnackMessage("Une erreur est survenue. Réessayez");
          setSeverity("error");
          setIsnackVisible(true);
        });

      event.target.reset();
    } else {
      setSnackMessage("Veuillez taper quelque chose");
      setSeverity("warning");
      setIsnackVisible(true);
    }
  };

  const guest = React.useContext(GuestCtx)?.guest;

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`${configs.backendUrl}/api/guests?eventId=${guest?.eventId}`)
        .then((results) => {
          console.log("contacts list to chat with", results.data);

          const contacts = results.data.result?.filter((target) => {
            return target?.accessKey !== guest?.accessKey;
          });

          setguests(contacts);
          setFilteGuests(contacts);
        })
        .catch((error) => {
          console.log(
            "an error has occured when tying to get contact list",
            error
          );
        });
    })();
  }, []);

  const lang = React.useContext(LangCtx).lang;

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

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
      }}
    >
      {" "}
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
        direction={"row"}
        sx={{
          alignItems: "flex-end",
          px: "2rem",
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
          {lang === "fr" ? "Ils participent" : "They are attending"}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-start",
          alignItems: "shrink",
          width: "100%",
          flexWrap: "no-wrap",
          mt: screen660 ? ".5rem" : "1rem",
          p: screen660 ? ".5rem" : screen870 ? "1rem" : "2rem",
          height: "100%",
          overflow: "hidden",
          bgcolor: theme.palette.common.black,
          borderRadius: "1.5rem",
          justifyContent: "space-between",
        }}
      >
        {!screen660 ? (
          <ContactsList
            screen660={screen660}
            setIsSwippeableVisible={setIsSwippeableVisible}
            screen870={screen870}
          />
        ) : (
          ""
        )}
        <Stack
          direction={"column"}
          sx={{
            flexGrow: 1,
            // p: "2rem",
            // bgcolor: theme.palette.grey[900],
            mx: screen870 ? ".5rem" : "1rem",
            // position: "relative",
            height: "100%",
            maxHeight: "100%",
            borderRadius: "2rem",
            border: `1px solid ${theme.palette.grey[900]}`,
            width: screen660 ? "100%" : "73%",
            maxWidth: screen660 ? "100%" : "73%",
            overflowX: "auto",
            boxShadow:
              "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              maxWidth: "100%",
              overflowX: "auto",
              height: "100%",
              //  mb: "3rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                py: ".65rem",
                borderBottom: `1px solid ${theme.palette.grey[500]}`,
                px: screen870 ? ".5rem" : "1rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: screen870 ? "12px" : "14px",
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                Discussion
              </Typography>
              {/*** <Badge color="success" badgeContent=" " variant="dot"> */}
              {screen660 ? (
                <Typography
                  onClick={(event) => {
                    event?.preventDefault();

                    setDefaultSwippeableContent(
                      <ContactsList
                        screen660={screen660}
                        screen870={screen870}
                        setIsSwippeableVisible={setIsSwippeableVisible}
                      />
                    );

                    setIsSwippeableVisible(true);
                  }}
                  sx={{
                    color: theme.palette.grey[300],
                    fontSize: "12px",
                    fontWeight: theme.typography.fontWeightLight,
                    "&:hover": {
                      transition: `all .2s`,
                      color: theme.palette.common.white,
                    },
                    cursor: "pointer",
                  }}
                >
                  View all contacts
                </Typography>
              ) : (
                ""
              )}
              {chatSubject?.fullName ? (
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: screen870 ? "12px" : "14px",
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {chatSubject?.fullName}
                </Typography>
              ) : (
                ""
              )}
              {/*** </Badge> */}
            </Stack>
            {Object.keys(chatSubject)?.length === 0 ? (
              <Stack
                direction={"column"}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <PersonAddDisabled
                  sx={{
                    color: theme.palette.grey[900],
                    mb: ".5rem",
                    fontSize: "74px",
                  }}
                />
                <Typography
                  sx={{
                    textAlign: "center",
                    color: theme.palette.grey[500],
                    fontWeight: theme.typography.fontWeightMedium,
                    fontSize: "14px",
                  }}
                >
                  {lang === "fr"
                    ? " Aucune discussion\nselectionée"
                    : "No thread is yet selected"}
                </Typography>
              </Stack>
            ) : (
              <Stack
                sx={{
                  height: "100%",
                  overflowY: "auto",
                  position: "relative",
                  pb: "4rem",
                  // justifyContent: "flex-end",
                  "&:first-child": {
                    marginTop: "auto!important",
                  },
                }}
              >
                <Stack
                  direction={"column-reverse"}
                  sx={{
                    width: "100%",
                    //flexGrow: 1,
                    //justifyContent: "flex-end",
                    //flexGrow: 1,
                    pt: "1rem",
                    // pb: "3rem",
                    px: screen870 ? "1rem" : "2rem",
                    maxHeight: "100%",
                    height: "100%",
                    overflowY: "auto",
                    // justifyContent: "flex-end",
                  }}
                >
                  <Stack
                    direction={"column-reverse"}
                    sx={{
                      width: "100%",
                      height: "100%",
                      // justifyContent: "flex-end",
                    }}
                  >
                    {Object.keys(chatMsgs)
                      ?.reverse()
                      ?.map((key) => {
                        return (
                          <Stack
                            direction={"column"}
                            sx={{
                              width: "100%",
                              //height: "100%",
                              alignItems: "center",
                              //justifyContent: "flex-end",
                              py: "1rem",
                            }}
                          >
                            <Typography
                              sx={{
                                textAlign: "center",
                                color: theme.palette.common.white,
                                fontWeight: theme.typography.fontWeightLight,
                                fontSize: screen870 ? "11px" : "12px",
                                bgcolor: "#FFFFFF10",
                                borderRadius: "2rem",
                                width: "max-content",
                                py: screen660 ? ".3" : ".5rem",
                                px: screen870 ? ".3rem" : ".7rem",
                              }}
                            >
                              {key}
                            </Typography>
                            <Stack
                              direction={"column-reverse"}
                              sx={{
                                width: "100%",
                                maxWidth: "100%",
                                overflowX: "hidden",
                                //height: "100%",
                                //  justifyContent: "flex-end",
                              }}
                            >
                              {chatMsgs[key]?.map((target) => {
                                return (
                                  <Stack
                                    direction={"row"}
                                    sx={{
                                      alignItems: "center",
                                      //height: "max-content",
                                      width: "100%",
                                      maxWidth: "100%",
                                      overflowX: "hidden",
                                      my: "0.3rem",
                                      justifyContent:
                                        target?.from === guest?.accessKey
                                          ? "flex-end"
                                          : "flex-start",
                                      justifySelf: "flex-end",
                                    }}
                                  >
                                    <Stack
                                      direction={"column"}
                                      sx={{
                                        alignItems:
                                          target?.from === guest?.accessKey
                                            ? "flex-end"
                                            : "flex-start",
                                        maxWidth: "40%",
                                        width: "40%",
                                        overflowX: "hidden",
                                      }}
                                    >
                                      <Stack
                                        direction={"column"}
                                        sx={{
                                          width: "max-content",
                                          bgcolor:
                                            target?.from === guest?.accessKey
                                              ? theme.palette.primary.main
                                              : theme.palette.common.black,
                                          py: screen660 ? ".5" : ".5rem",
                                          px: screen870 ? ".4rem" : ".8rem",
                                          borderRadius: screen870
                                            ? ".5rem"
                                            : "1rem",
                                          maxWidth: "100%",
                                          overflowX: "hidden",
                                          border:
                                            target?.from === guest?.accessKey
                                              ? undefined
                                              : `1px solid ${theme.palette?.grey[900]}`,
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: screen870
                                              ? "11px"
                                              : "12px",
                                            fontWeight:
                                              theme.typography
                                                .fontWeightRegular,
                                            color: theme.palette.common.white,
                                            textAlign: "left",
                                            width: "100%",
                                            maxWidth: "100%",
                                            overflowWrap: "break-word",
                                            //height: "max-content",
                                          }}
                                        >
                                          {target?.content}
                                        </Typography>
                                      </Stack>
                                      <Typography
                                        sx={{
                                          color: theme.palette.grey[300],
                                          fontSize: screen870 ? "8px" : "11px",
                                          mt: ".2rem",
                                          mx: ".5rem",
                                          fontWeight:
                                            theme.typography.fontWeightRegular,
                                        }}
                                      >
                                        {new Date(
                                          target?.createdAt
                                        ).toLocaleTimeString(
                                          `${lang}-${lang.toUpperCase()}`
                                        )}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                );
                              })}
                            </Stack>
                          </Stack>
                        );
                      })}
                  </Stack>
                </Stack>

                <form
                  onSubmit={handleChat}
                  style={{
                    width: "100%",
                    height: "max-content",
                    display: "flex",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "flex-end",
                      width: "100%",
                      py: "0.5rem",
                      px: "1rem",
                      //  bgcolor: theme.palette.grey[900],
                      height: "max-content",
                      borderTop: `1px solid ${theme.palette.grey[900]}`,
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        px: ".5rem",
                        py: ".0rem",
                        border: `1px solid ${theme.palette.grey[700]}`,
                        alignItems: "center",
                        flexGrow: 1,
                        borderRadius: "1rem",
                        overflow: "hidden",
                      }}
                    >
                      <InputBase
                        name={"message"}
                        placeholder="Taper quelque chose"
                        rows={1}
                        sx={{
                          fontSize: "14px",
                          color: theme.palette.common.white,
                          width: "100%",
                        }}
                        inputProps={{
                          style: {
                            fontSize: "12px",
                          },
                        }}
                      />
                    </Stack>
                    <Button
                      type={"submit"}
                      sx={{
                        color: theme.palette.common.white,
                        bgcolor: theme.palette.common.black,
                        px: "1rem",
                        py: ".3rem",
                        "&:hover": {
                          bgcolor: theme.palette.common.black,
                        },
                        width: "max-content",
                        borderRadius: "0px",
                        ml: "1rem",
                        fontSize: "12px",
                      }}
                    >
                      Envoyer
                    </Button>
                  </Stack>
                </form>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contacts;
