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

const Contacts = ({}) => {
  const theme = useTheme();

  const [searchKey, setSearchKey] = React.useState("");

  const [chatSubject, setChatSubject] = React.useState({});

  const [chatMsgs, setChatMsgs] = React.useState([
    {
      time: Date.now(),
      content: "Hello, how are you doing",
      from: "self",
    },
    {
      time: Date.now(),
      content:
        "Oh, this is just incredible. I thought you were strength enough to pul that shit down on the floor",
      from: "else",
    },
    {
      time: Date.now(),
      content: "Hello, how are you doing",
      from: "self",
    },
    {
      time: Date.now(),
      content: "Ok",
      from: "else",
    },
    {
      time: Date.now(),
      content:
        "We always *have thought* but reality is very very different bro. Despite this, we still fighting",
      from: "self",
    },
    {
      time: Date.now(),
      content: "Oh, this is just incredible",
      from: "else",
    },
  ]);

  const [guests, setguests] = React.useState(
    new Array(55)
      .fill({
        fullName: "Zeon Iowa",
        profession: "Développeur quantique",
        iod: null,
      })
      ?.map((target, id) => {
        return { ...target, id };
      })
  );

  const [filterGuests, setFilteGuests] = React.useState(guests);

  const handleSearch = (event) => {
    event?.preventDefault();

    const search = event?.target?.value;

    console.log(
      "search key found",
      { search },
      guests?.filter((target) => {
        console.log("fullname found", target?.fullName);
        return (
          target?.fullName?.includes(search) ||
          target?.profession?.includes(search)
        );
      })
    );

    setSearchKey(search);

    setFilteGuests(
      guests?.filter((target) => {
        return (
          target?.fullName?.includes(search) ||
          target?.profession?.includes(search)
        );
      })
    );
  };

  const handleSearchSubmit = async (event) => {
    event?.preventDefault();
  };

  const handleChat = async (event) => {
    event.preventDefault();
  };

  const guest = React.useContext(GuestCtx)?.guest;

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "flex-start",
        width: "100%",
        px: "5vw",
        py: "2rem",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontSize: "24px",
          fontWeight: theme.typography.fontWeightBold,
        }}
      >
        ILS PARTICIPENT
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "flex-start",
          alignItems: "shrink",
          width: "100%",
          flexWrap: "wrap",
          mt: "1rem",
          px: "2rem",
          maxHeight: "100%",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            alignItems: "center",
            p: "1.5rem",
            minWidth: "300px",
            maxHeight: "100%",
            width: "30%",
            bgcolor: theme.palette.common.white,
            m: "1rem",
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
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.common.black,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: "14px",
                  mr: ".5rem",
                }}
              >
                Rechercher
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  px: ".5rem",
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
                    fontSize: "14px",
                    color: theme.palette.grey[700],
                    width: "100%",
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
                }}
              >
                Envoyer
              </Button>
            </Stack>
          </form>

          <Stack
            direction={"column"}
            sx={{
              mt: "2rem",
              width: "100%",
              maxHeight: "100%",
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
                    borderLeft: `5px solid ${theme.palette.common.white}`,
                    borderColor:
                      target?.id === chatSubject?.id
                        ? theme.palette.primary.main
                        : undefined,
                    bgcolor:
                      target?.id === chatSubject?.id
                        ? theme.palette.grey[100]
                        : undefined,
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      px: ".3rem",
                      py: ".2rem",
                    }}
                  >
                    <Avatar
                      src={"/"}
                      alt="Profile"
                      sx={{
                        mr: ".5rem",
                        width: "50px",
                        height: "50px",
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
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: "16px",
                          mb: ".2rem",
                        }}
                      >
                        {target?.fullName}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightThin,
                          fontSize: "14px",
                        }}
                      >
                        {target?.profession}
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
            bgcolor: theme.palette.common.white,
            m: "1rem",
            position: "relative",
            minHeight: "100%",
            overflowY: "auto",
            maxHeight: "100%",
          }}
        >
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
                  color: theme.palette.common.black,
                  mb: ".5rem",
                  fontSize: "74px",
                }}
              />
              <Typography
                sx={{
                  textAlign: "center",
                  color: theme.palette.grey[700],
                  fontWeight: theme.typography.fontWeightMedium,
                  fontSize: "16px",
                }}
              >
                Aucune discussion <br /> selectionée
              </Typography>
            </Stack>
          ) : (
            <Stack
              sx={{
                width: "100%",
                flexGrow: 1,
                mb: "3rem",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  py: ".65rem",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  px: "1rem",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "24px",
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  Discussion
                </Typography>
                <Badge color="success" badgeContent=" " variant="dot">
                  <Typography
                    sx={{
                      color: theme.palette.common.black,
                      fontSize: "14px",
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {chatSubject?.fullName}
                  </Typography>
                </Badge>
              </Stack>
              <Stack
                direction={"column"}
                sx={{
                  width: "100%",
                  maxHeight: "100%",
                  overflowY: "auto",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                  pt: "1rem",
                  pb: "3rem",
                  px: "2rem",
                }}
              >
                {chatMsgs?.map((target) => {
                  return (
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        width: "100%",
                        my: "0.3rem",
                        justifyContent:
                          target?.from === "self" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Stack
                        direction={"column"}
                        sx={{
                          width: "max-content",
                          bgcolor:
                            target?.from === "self"
                              ? theme.palette.primary.main
                              : theme.palette.common.black,
                          py: ".5rem",
                          px: ".7rem",
                          borderRadius: "1rem",
                          maxWidth: "40%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: theme.typography.fontWeightRegular,
                            color: theme.palette.common.white,
                            textAlign: "left",
                          }}
                        >
                          {target?.content}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          )}

          <form
            onSubmit={handleChat}
            style={{
              width: "100%",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "flex-end",
                width: "100%",
                py: "0.7rem",
                px: "1rem",
                bgcolor: theme.palette.grey[50],
                position: "absolute",
                right: 0,
                bottom: 0,
                left: 0,
                borderTop: `1px solid ${theme.palette.grey[300]}`,
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  px: ".5rem",
                  py: ".0rem",
                  border: `2px solid ${theme.palette.grey[700]}`,
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <InputBase
                  name={"contact_search"}
                  placeholder="Taper quelque chose"
                  multiline={true}
                  rows={1}
                  // value={searchKey}
                  sx={{
                    fontSize: "14px",
                    //color: theme.palette.grey[700],
                    width: "100%",
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
                }}
              >
                Envoyer
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contacts;
