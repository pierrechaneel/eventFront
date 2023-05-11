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

  return (
    <Stack
      direction={"column"}
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        height: "max-content",
        bgcolor: theme.palette.common.white,
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
          bgcolor: theme.palette.grey[500],
          height: "200px",
          position: "relative",
          top: 0,
        }}
      >
        <Avatar
          src={guest?.profile}
          onClick={(event) => {
            event?.preventDefault();
            setISEditProfileVisible(true);
          }}
          sx={{
            width: "150px",
            height: "150px",
            cursor: "pointer",
            position: "absolute",
            bottom: "-3.5rem",
            left: "5vw",
          }}
        />
      </Stack>

      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          alignItem: "flex-start",
          bgcolor: theme.palette.common.white,
          pt: "3rem",
        }}
      ></Stack>
      <Stack
        direction={"column"}
        sx={{
          alignItems: "flex-end",
          width: "100%",
          px: "10%",
          mt: "2rem",
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
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontWeight: theme.typography.fontWeightBold,
                // textAlign: "center",
                fontSize: "24px",
              }}
            >
              {guest?.fullName}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontWeight: theme.typography.fontWeightRegular,
                //textAlign: "center",
                fontSize: "14px",
              }}
            >
              {guest?.title}
            </Typography>
          </Stack>
          <FormControl
            size="small"
            sx={{
              width: "12rem",
              "&:hover": {
                borderColor: theme.palette.common.white,
                "& *": {
                  borderColor: theme.palette.common.white,
                },
              },
            }}
          >
            <InputLabel id="demo-select-small">Langue</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label={"Langue"}
              defaultValue={"fr"}
              name={"language"}
              size={"small"}
              fullWidth
            >
              <MenuItem value={"fr"}>Français</MenuItem>
              <MenuItem value={"en"}>Anglais</MenuItem>
            </Select>
          </FormControl>
          {/** <Button
            type={"submit"}
            sx={{
              color: theme.palette.common.black,
              fontSize: "14px",
              fontWeight: theme.typography.fontWeightBold,
              px: "1rem",
              py: ".3rem",
              mt: "1.5rem",
              bgcolor: theme.palette.common.white,
              borderRadius: "0px",
            }}
          >
            Appliquer
          </Button> */}
        </form>
      </Stack>
    </Stack>
  );
};

export default Profile;
