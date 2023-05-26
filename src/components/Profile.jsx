// self edition component definition

import * as React from "react";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { GuestCtx } from "../../context/guest";
import SnackMessage from "./SnackMessage";
import UploadProfile from "./UploadProfile";
import axios from "axios";

import configs from "../../configs/generals.json";
import { LangCtx } from "../../context/lang";

const Profile = ({ setSecondaryMenu }) => {
  const theme = useTheme();

  const handleLangChange = async (event) => {
    event?.preventDefault();
  };

  const [isEditProfileVisible, setISEditProfileVisible] = React.useState(false);

  const guest = React.useContext(GuestCtx)?.guest;
  const setGuest = React.useContext(GuestCtx)?.setGuest;

  const handleSubmit = async (imageBlob) => {
    const form = new FormData();

    form.append("profile", imageBlob);

    // upload media file

    await axios
      .post("/api/uploads/profile", form, {
        headers: {
          user: "BQJR9400",
        },
      })
      .then(async (results) => {
        console.log("file uploading results", { res: results?.data });

        let mediaFile = results?.data?.path;

        let submitObject = {
          accessKey: guest?.accessKey,
          profileLink: mediaFile,
        };

        console.log("submit obj for profile update", submitObject);

        await axios
          .post(`/api/profile?author=${"BQJR9400"}`, submitObject, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${"BQJR9400"}`,
              user: "BQJR9400",
            },
          })
          .then(async (res) => {
            await axios
              .get(
                `${configs?.backendUrl}/api/guests/properties?accessKey=${
                  window.location.pathname.split("/")[2]
                }`
              )
              .then(async (result) => {
                console.log("guest found ", result?.data);

                const guestDatum = result.data?.guestInfo[0];

                setGuest(guestDatum);

                setISEditProfileVisible(false);

                setSnackMessage("Votre profil a été mis à jour");
                setSeverity("success");
                setIsnackVisible(true);
              });
          })
          .catch((error) => {
            console.error(
              "An error has occured when trying to update guest profile",
              error
            );
            // setIsCreateRowModalOpen(false);

            setSnackMessage("Une erreur est survenue!! Réessayez");
            setSeverity("error");
            setIsnackVisible(true);
          });
      })
      .catch((error) => {
        console.log(
          "an error has occured when uploading the media file",
          error
        );
        setSnackMessage("Une erreur est survenue!! Réessayez");
        setSeverity("error");
        setIsnackVisible(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsnackVisible(false);
  };

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const currentLanguage = React.useContext(LangCtx).lang;

  const setCurrentLanguage = React.useContext(LangCtx).setLang;

  const handleLnChange = (event) => {
    event?.preventDefault();

    setCurrentLanguage(event?.target?.value);
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        height: "max-content",
        //bgcolor: theme.palette.common.white,
        pb: "5rem",
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

      {isEditProfileVisible ? (
        <UploadProfile
          handleSubmit={handleSubmit}
          onClose={(event) => {
            event?.preventDefault();
            setISEditProfileVisible(false);
          }}
        />
      ) : (
        ""
      )}
      <Stack
        direction={"row"}
        sx={{
          bgcolor: theme.palette.common.black,
          height: "100px",
          position: "relative",
          top: 0,
          borderRadius: "2.5rem",
        }}
      >
        <Avatar
          src={guest?.profile}
          onClick={(event) => {
            event?.preventDefault();
            setISEditProfileVisible(true);
          }}
          sx={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "absolute",
            bottom: "-2.5rem",
            left: "5vw",
          }}
        />
      </Stack>

      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          alignItem: "flex-start",
          //bgcolor: theme.palette.common.white,
          pt: "1rem",
        }}
      ></Stack>
      <Stack
        direction={"column"}
        sx={{
          alignItems: "flex-end",
          width: "100%",
          px: "10%",
          mt: "2rem",
          "& *": {
            color: "#ffffff!important",
            borderColor: "#ffffff!important",
          },
        }}
      >
        <form
          onSubmit={handleLangChange}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-start",
              "& *": {
                color: theme.palette.common.white,
              },
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                // textAlign: "center",
                fontSize: "18px",
              }}
            >
              {guest?.fullName}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightRegular,
                //textAlign: "center",
                fontSize: "12px",
              }}
            >
              {guest?.title}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            {" "}
            <Typography
              sx={{
                color: theme.palette.grey[500],
                fontWeight: theme.palette.fontWeightLight,
                fontSize: "14px",
                mr: "1rem",
              }}
            >
              {currentLanguage === "en" ? "Language" : "Langue"}
            </Typography>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              defaultValue={currentLanguage}
              name={"language"}
              size={"small"}
              onChange={handleLnChange}
              SelectDisplayProps={{
                style: {
                  paddingTop: ".2rem",
                  paddingBottom: ".2rem",
                  fontSize: "12px",
                  width: "70px",
                },
              }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                }}
                value={"fr"}
              >
                Français
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                }}
                value={"en"}
              >
                Anglais
              </MenuItem>
            </Select>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Profile;
