// component definition

import * as React from "react";
import {
  useTheme,
  Stack,
  Box,
  Typography,
  InputBase,
  MenuItem,
  Avatar,
} from "@mui/material";
import { contactsCtx } from "../../context/contacts";
import { LangCtx } from "../../context/lang";

const ContactsList = ({ screen870, screen660, setIsSwippeableVisible }) => {
  const chatSubject = React.useContext(contactsCtx)?.chatSubject;
  const setChatSubject = React.useContext(contactsCtx)?.setChatSubject;
  const filterGuests = React.useContext(contactsCtx)?.filterGuests;
  const setFilteGuests = React.useContext(contactsCtx)?.setFilteGuests;
  const setguests = React.useContext(contactsCtx)?.setguests;
  const guests = React.useContext(contactsCtx)?.guests;

  const lang = React.useContext(LangCtx)?.lang;

  const theme = useTheme();

  const handleSearchSubmit = async (event) => {
    event?.preventDefault();
  };

  const [searchKey, setSearchKey] = React.useState("");

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

  return (
    <Stack
      direction={"column"}
      sx={{
        alignItems: "center",
        py: "1.5rem",
        mx: screen870 ? ".5rem" : "1rem",
        minWidth: "150px",
        height: "max-content",
        maxHeight: screen660 ? "70%" : "100%",
        minHeight: screen660 ? "60%" : undefined,
        overflowY: screen660 ? "auto" : "auto",
        width: screen660 ? "90%" : "25%",
        maxWidth: screen660 ? "90%" : "25%",
        // bgcolor: theme.palette.grey[900],
        borderRadius: "2rem",
        mx: screen660 ? "auto" : "1rem",
        border: `1px solid ${theme.palette.grey[900]}`,
        boxShadow:
          "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
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
              autoFocus={true}
              sx={{
                fontSize: "12px",
                color: theme.palette.grey[300],
                width: "100%",
              }}
            />
          </Stack>

          {/***!screen870 ? (
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
            ) */}
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

                console.log(target);

                setIsSwippeableVisible(false);
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
                      color:
                        target?.id === chatSubject?.id
                          ? theme.palette.primary.main
                          : theme.palette.common.white,
                      fontWeight: theme.typography.fontWeightRegular,
                      fontSize: "14px",
                      mb: ".2rem",
                    }}
                  >
                    {target?.fullName}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        target?.id === chatSubject?.id
                          ? theme.palette.primary.main
                          : theme.palette.common.white,
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
  );
};

export default ContactsList;
