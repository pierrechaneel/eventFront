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
import {
  Accessibility,
  DateRange,
  DirectionsWalk,
  FlightLand,
  FlightTakeoff,
  LocalAirport,
  Restaurant,
  Thermostat,
} from "@mui/icons-material";
import { viewportsCtx } from "../../context/viewports";

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

                window.sessionStorage.setItem(
                  "guest",
                  JSON.stringify(guestDatum)
                );

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

  const [smsMessages, setSmsMessages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`${configs?.backendUrl}/api/groups/messaging?guestId=${guest?.id}`)
        .then((results) => {
          setSmsMessages(results?.data?.smsMessages);

          // console.log("sms data", results);
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get guest sms data",
            error
          );

          setSnackMessage(
            currentLanguage === "fr"
              ? "Erreur de chargement de messages! Réessayer"
              : "Messages loading failed. Retry"
          );

          setSeverity("error");
          setIsnackVisible(true);
        });
    })();
  }, []);

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const currentLanguage = React.useContext(LangCtx).lang;

  const setCurrentLanguage = React.useContext(LangCtx).setLang;

  const handleLnChange = (event) => {
    event?.preventDefault();

    setCurrentLanguage(event?.target?.value);
  };

  const screen660 = React.useContext(viewportsCtx)?.screen660;
  const screen870 = React.useContext(viewportsCtx)?.screen870;

  return (
    <Stack
      direction={"column"}
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        //bgcolor: theme.palette.common.white,
        // pb: "5rem",
        overflowY: "auto",
        pt: screen870 ? "0rem" : "0rem",
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
        sx={{
          width: "100%",
          height: "max-content",
          bgcolor: theme.palette.common.black,
          borderRadius: "1.5rem",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "max-content",
            pb: "1rem",
            bgcolor: "#FFFFFF10",
            borderRadius: "1.5rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              bgcolor: theme.palette.common.black,
              height: screen870 ? "70px" : "70px",
              minHeight: screen870 ? "70px" : "70px",
              position: "relative",
              top: 0,
              borderRadius: "1.5rem 1.5rem 0 0",
              "-webkit-transform": "translateZ(0)",
              transform: "translateZ(0)",
            }}
          >
            <Avatar
              src={guest?.profile}
              onClick={(event) => {
                event?.preventDefault();
                setISEditProfileVisible(true);
              }}
              sx={{
                width: screen870 ? "70px" : "80px",
                height: screen870 ? "70px" : "80px",
                cursor: "pointer",
                position: "absolute",
                bottom: screen660 ? "-1rem" : "-2.5rem",
                left: "5vw",
                border: `3px solid #FFFFFF`,
              }}
            />
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "flex-end",
              width: "100%",
              px: "10%",
              mt: "2rem",
              pt: "1rem",
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
                    fontSize: "12px",
                  }}
                >
                  {guest?.fullName}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightRegular,
                    //textAlign: "center",
                    fontSize: "10px",
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
                {screen660 ? (
                  ""
                ) : (
                  <Typography
                    sx={{
                      color: theme.palette.grey[300],
                      fontWeight: theme.palette.fontWeightLight,
                      fontSize: "12px",
                      mr: ".5rem",
                    }}
                  >
                    {currentLanguage === "en" ? "Language" : "Langue"}
                  </Typography>
                )}

                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  defaultValue={currentLanguage}
                  name={"language"}
                  size={"small"}
                  onChange={handleLnChange}
                  SelectDisplayProps={{
                    style: {
                      paddingTop: ".1rem",
                      paddingBottom: ".1rem",
                      fontSize: "10px",
                      width: "70px",
                    },
                  }}
                >
                  <MenuItem
                    sx={{
                      fontSize: "10px",
                    }}
                    value={"fr"}
                  >
                    Français
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: "10px",
                    }}
                    value={"en"}
                  >
                    English
                  </MenuItem>
                </Select>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          width: "100%",
          height: "100%",
          //bgcolor: theme.palette.common.black,
          mt: "1.5rem",
          flexWrap: screen660 ? "wrap" : undefined,
          alignItems: "stretch",
        }}
      >
        <Stack
          sx={{
            width: screen660 ? "100%" : "70%",
            bgcolor: theme?.palette.common.black,
            height: "100%",
            maxHeight: "100%",
            px: "2.5rem",
            py: "2.5rem",
            mr: screen660 ? undefined : "1.5rem",
            mb: screen660 ? "1.5rem" : undefined,
            overflow: "hidden",
            borderRadius: "1.5rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              height: "100%",
              alignItems: "flex-start",
              flexWrap: "wrap",
              maxHeight: "100%",
              overflowX: "hidden",
              overflowY: "auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {guest?.arrivalDate ? (
              <Stack
                direction={"column"}
                sx={{
                  alignItem: "center",
                  width: screen660 ? "100%" : "30%",
                  minWidth: "150px",
                  p: "1rem",
                  bgcolor: theme.palette.common.black,
                  border: `1px solid ${theme.palette.grey[900]}`,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  m: ".3rem",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: theme.typography.fontWeightRegular,
                    mb: "1rem",
                  }}
                >
                  {currentLanguage === "fr" ? "Arrivée" : "Arrival"}
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    my: ".3rem",
                  }}
                >
                  <DateRange
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "16px",
                    }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: theme.palette.grey[300],
                      fontWeight: theme.typography.fontWeightLight,
                      fontSize: "12px",
                      //width: "100%",
                      p: 0,
                      ml: "0.3rem",
                    }}
                  >
                    {new Date(guest?.arrivalDate).toLocaleDateString(
                      `${currentLanguage}-${currentLanguage?.toUpperCase()}`,
                      {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </Typography>
                </Stack>

                {guest?.arrivalAirline ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      my: ".3rem",
                    }}
                  >
                    <FlightLand
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.arrivalAirline}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.arrivalAirport ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <LocalAirport
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.arrivalAirport}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.arrivalProtocol ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <DirectionsWalk
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.arrivalProtocol}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.arrivalTemperature ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <Thermostat
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.arrivalTemperature} &#x2103;
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
              </Stack>
            ) : (
              ""
            )}
            {guest?.dinerDate ? (
              <Stack
                direction={"column"}
                sx={{
                  alignItem: "center",
                  width: screen660 ? "100%" : "30%",
                  minWidth: "150px",
                  p: "1rem",
                  bgcolor: theme.palette.common.black,
                  border: `1px solid ${theme.palette.grey[900]}`,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  m: ".3rem",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: theme.typography.fontWeightRegular,
                    mb: "1rem",
                  }}
                >
                  {currentLanguage === "fr" ? "Dîner" : "Dinner"}
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    my: ".3rem",
                  }}
                >
                  <DateRange
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "16px",
                    }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: theme.palette.grey[300],
                      fontWeight: theme.typography.fontWeightLight,
                      fontSize: "12px",
                      //width: "100%",
                      p: 0,
                      ml: "0.3rem",
                    }}
                  >
                    {new Date(guest?.dinerDate).toLocaleDateString(
                      `${currentLanguage}-${currentLanguage?.toUpperCase()}`,
                      {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </Typography>
                </Stack>

                {guest?.dinerPlace ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <Restaurant
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.dinerPlace}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.dinerTemperature ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <Thermostat
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.dinerTemperature} &#x2103;
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
              </Stack>
            ) : (
              ""
            )}{" "}
            {guest?.departureDate ? (
              <Stack
                direction={"column"}
                sx={{
                  alignItem: "center",
                  width: screen660 ? "100%" : "30%",
                  minWidth: "150px",
                  p: "1rem",
                  bgcolor: theme.palette.common.black,
                  border: `1px solid ${theme.palette.grey[900]}`,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  m: ".3rem",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: theme.typography.fontWeightRegular,
                    mb: "1rem",
                  }}
                >
                  {currentLanguage === "fr" ? "Départ" : "Departure"}
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    my: ".3rem",
                  }}
                >
                  <DateRange
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "16px",
                    }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: theme.palette.grey[300],
                      fontWeight: theme.typography.fontWeightLight,
                      fontSize: "12px",
                      //width: "100%",
                      p: 0,
                      ml: "0.3rem",
                    }}
                  >
                    {new Date(guest?.departureDate).toLocaleDateString(
                      `${currentLanguage}-${currentLanguage?.toUpperCase()}`,
                      {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </Typography>
                </Stack>

                {guest?.departureAirline ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <FlightTakeoff
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.departureAirline}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.departureAirport ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <LocalAirport
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.departureAirport}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.departureProtocol ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      my: ".3rem",
                    }}
                  >
                    <DirectionsWalk
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.departureProtocol}
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
                {guest?.departureTemperature ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      my: ".3rem",
                    }}
                  >
                    <Thermostat
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.grey[300],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "12px",
                        //width: "100%",
                        p: 0,
                        ml: "0.3rem",
                      }}
                    >
                      {guest?.departureTemperature} &#x2103;
                    </Typography>
                  </Stack>
                ) : (
                  ""
                )}
              </Stack>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            alignItems: "flex-start",
            flexWrap: "wrap",
            width: screen660 ? "100%" : "30%",
            bgcolor: theme?.palette.common.black,
            borderRight: `1px solid ${theme.palette.grey[900]}`,
            // height: "max-content",
            p: screen660 ? ".5rem" : screen870 ? "1rem" : "1.5rem",
            borderRadius: "1.5rem",
            overflow: "hidden",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              alignItems: "center",
              justifyContent: "flex-start",
              py: ".5rem",
              width: "100%",
              px: screen870 ? "0.5rem" : ".5rem",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.grey[300],
                fontSize: screen660 ? "8px" : "14px",
                fontWeight: theme.typography.fontWeightRegular,
                textAlign: "right",
                width: "100%",
                fontSize: screen660 ? "10px" : screen870 ? "12px" : "14px",
              }}
            >
              {currentLanguage === "fr" ? "Mes messages" : "My messages"}
            </Typography>

            <Stack
              direction={"column"}
              sx={{
                flexGrow: 1,
                maxHeight: !screen870 ? "50vh" : "90%",
                mt: "1rem",
                width: "100%",
                overflowY: "auto",
              }}
            >
              {smsMessages?.map((target) => {
                return (
                  <Stack
                    direction={"column"}
                    sx={{
                      borderRadius: screen870 ? "0.5rem" : "1rem",
                      bgcolor: "#FFFFFF10",
                      p: screen870 ? "0.5rem" : ".7rem",
                      my: ".3rem",
                    }}
                  >
                    <Typography
                      component={"p"}
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightRegular,
                        fontSize: screen870 ? "11px" : "12px",
                        textAlign: "left",
                        width: "100%",
                        overflowWrap: "break-word",
                      }}
                    >
                      {target.textContent}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: "10px",
                        textAlign: "right",
                        mt: ".5rem",
                      }}
                    >
                      {new Date(target?.createdAt)?.toLocaleString(
                        `${currentLanguage}-${currentLanguage?.toUpperCase()}`,
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;
