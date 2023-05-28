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

const Contacts = ({}) => {
  const theme = useTheme();

  const socket = React.useContext(SocketCtx).subsSocket;

  const [searchKey, setSearchKey] = React.useState("");

  const [chatSubject, setChatSubject] = React.useState({});

  const [chatMsgs, setChatMsgs] = React.useState({});

  const chats = React.useRef({});

  React.useEffect(() => {
    socket.on("NEW_PRIVATE_MSG", (payload) => {
      console.log("private message payload", payload);

      const groupKey = new Date(payload?.createdAt).toLocaleDateString();

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

  React.useEffect(() => {
    (async () => {
      console.log("chat thread base value", chatSubject);

      chats.current = {};

      await axios
        .get(
          `${configs.backendUrl}/api/messages?eventId=${guest?.event?.id}&from=${guest?.accessKey}&to=${chatSubject?.accessKey}`
        )
        .then((results) => {
          console.log("message data received", results?.data);

          results?.data?.messageData?.forEach((target) => {
            const groupKey = new Date(target?.createdAt).toLocaleDateString();

            if (Object.keys(chats?.current)?.includes(groupKey)) {
              chats.current[groupKey] = [target, ...chats?.current[groupKey]];
            } else {
              const newChats = { ...chats.current };

              newChats[groupKey] = [target];

              chats.current = newChats;
            }

            //   console.log("new chat messages", chats.current);
          });

          console.log("received stored chats", chats.current);

          setChatMsgs(chats.current);
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get messages",
            error
          );

          if (Object.keys(chatSubject).length > 0) {
            setSnackMessage("Erreur de chargement du chat");
            setSeverity("error");
            setIsnackVisible(true);
          }
        });
    })();
  }, [chatSubject]);

  const [guests, setguests] = React.useState([]);

  const [filterGuests, setFilteGuests] = React.useState([]);

  const handleSearch = (event) => {
    event?.preventDefault();

    const search = event?.target?.value;

    setSearchKey(search);

    console.log("search stat, ", guests, searchKey);

    setFilteGuests(
      guests?.filter((target) => {
        return (
          target?.fullName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          target?.title?.toLowerCase()?.includes(search?.toLowerCase())
        );
      })
    );
  };

  const handleSearchSubmit = async (event) => {
    event?.preventDefault();
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

          const groupKey = new Date(payload?.createdAt).toLocaleDateString();

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
          pb: "1rem",
          pt: "2rem",
          bgcolor: theme.palette.common.black,
          width: "100%",
          borderRadius: "1.5rem",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontSize: "16px",
            fontWeight: theme.typography.fontWeightThin,
          }}
        >
          {lang === "fr" ? "ILS PARTICIPENT" : "THEY ARE ATTENDING"}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-start",
          alignItems: "shrink",
          width: "100%",
          flexWrap: "no-wrap",
          mt: "1rem",
          p: "2rem",
          height: "100%",
          overflow: "hidden",
          bgcolor: theme.palette.common.black,
          borderRadius: "1.5rem",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            py: "1.5rem",
            mx: screen870 ? ".5rem" : "1rem",
            minWidth: "150px",
            height: "100%",
            width: "25%",
            maxWidth: "25%",
            // bgcolor: theme.palette.grey[900],
            borderRadius: "2rem",
            mx: "1rem",
            border: `1px solid ${theme.palette.grey[900]}`,
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            style={{
              width: "100%",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                px: ".5rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: "12px",
                  mr: ".2rem",
                }}
              >
                {lang === "fr" ? "Rechercher" : "Search"}
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  px: ".2rem",
                  py: ".0rem",
                  border: `2px solid ${theme.palette.common.black}`,
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <InputBase
                  name={"contact_search"}
                  placeholder="Taper un nom"
                  onChange={handleSearch}
                  value={searchKey}
                  sx={{
                    fontSize: "12px",
                    color: theme.palette.grey[500],
                    width: "100%",
                  }}
                />
              </Stack>

              {!screen870 ? (
                <Button
                  type={"submit"}
                  sx={{
                    color: theme.palette.common.black,
                    bgcolor: theme.palette.common.white,
                    px: ".5rem",
                    py: ".05rem",
                    "&:hover": {
                      bgcolor: theme.palette.common.white,
                    },
                    width: "max-content",
                    borderRadius: "0px",
                    ml: ".2rem",
                    fontSize: "12px",
                  }}
                >
                  Envoyer
                </Button>
              ) : (
                ""
              )}
            </Stack>
          </form>

          <Stack
            direction={"column"}
            sx={{
              mt: "2rem",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {filterGuests?.map((target) => {
              return (
                <MenuItem
                  onClick={(event) => {
                    event?.preventDefault();

                    setChatSubject(target);
                  }}
                  sx={{
                    width: "100%",
                    borderLeft: `5px solid ${theme.palette.grey[900]}`,
                    borderColor:
                      target?.id === chatSubject?.id
                        ? theme.palette.primary.main
                        : undefined,
                    bgcolor:
                      target?.id === chatSubject?.id
                        ? `${theme.palette.primary.main}10`
                        : undefined,
                    "&:hover": {
                      transition: "all .3s",
                    },
                    p: 0.3,
                    m: 0,
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      px: ".1rem",
                      py: ".0rem",
                    }}
                  >
                    <Avatar
                      src={target?.profile}
                      alt="Profile"
                      sx={{
                        mr: screen870 ? ".2rem" : ".5rem",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                    <Stack
                      direction={"column"}
                      sx={{
                        alignItems: "flex-start",
                        flexGrow: 1,
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.common.white,
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: "14px",
                          mb: ".2rem",
                        }}
                      >
                        {target?.fullName}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.common.white,
                          fontWeight: theme.typography.fontWeightThin,
                          fontSize: "12px",
                        }}
                      >
                        {target?.title}
                      </Typography>
                    </Stack>
                  </Stack>
                </MenuItem>
              );
            })}
          </Stack>
        </Stack>
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
            width: "73%",
            maxWidth: "73%",
            overflowX: "auto",
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
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontSize: screen870 ? "12px" : "14px",
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                {chatSubject?.fullName}
              </Typography>
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
                    color: theme.palette.grey[700],
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
                                fontSize: screen870 ? "10px" : "12px",
                                px: screen870 ? ".5rem" : "1rem",
                                py: ".15rem",
                                bgcolor: "#FFFFFF10",
                                borderRadius: "2rem",
                                width: "max-content",
                                py: ".7rem",
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
                                          py: ".5rem",
                                          px: screen870 ? ".3rem" : ".7rem",
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
                                              ? "10px"
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
                                          color: theme.palette.grey[500],
                                          fontSize: screen870 ? "8px" : "10px",
                                          mt: ".2rem",
                                          mx: ".5rem",
                                          fontWeight:
                                            theme.typography.fontWeightRegular,
                                        }}
                                      >
                                        {new Date(
                                          target?.createdAt
                                        ).toLocaleTimeString()}
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
