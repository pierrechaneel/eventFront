// component definition

import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Close, Image, UnfoldLess, UploadFile } from "@mui/icons-material";
import { LangCtx } from "../../context/lang";

const UploadProfile = ({ onClose, handleSubmit }) => {
  const theme = useTheme();

  const [fileSelected, setFileSelected] = React.useState(null);
  const [fileBlob, setFileBlob] = React.useState(null);

  const lang = React.useContext(LangCtx);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = async (event) => {
    event?.preventDefault();

    let fReader = new FileReader();
    fReader.readAsDataURL(event?.target?.files[0]);

    fReader.onload = function (oFREvent) {
      setFileSelected(oFREvent.target.result);
      setFileBlob(event?.target?.files[0]);
    };
  };

  return (
    <Stack
      sx={{
        bgcolor: "#000000A0",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          width: "30%",
          maxWidth: "700px",
          minWidth: "350px",
          p: 0,
          m: 0,
          boxShadow:
            "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            m: 0,
            width: "100%",
            py: ".5rem",
            px: "1rem",
            bgcolor: theme.palette.common.white,
            boxShadow:
              "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.black,
              fontSize: "14px",
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            {lang === "fr" ? "Modifier le profile" : "Update profile"}
          </Typography>
          <Close
            onClick={onClose}
            sx={{
              color: theme.palette.common.black,
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            p: "2rem",
            bgcolor: theme.palette.grey[200],
            alignItems: "center",
          }}
        >
          <label
            htmlFor="profile"
            style={{
              cursor: "pointer",
              border: `2px dashed ${theme.palette.common.black}`,
              padding: "1rem",
            }}
          >
            {fileSelected !== null ? (
              <img
                src={fileSelected}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  my: "1rem",
                  overflow: "hidden",
                }}
              />
            ) : (
              <Stack
                direction={"column"}
                sx={{
                  alignItems: "center",
                  my: "1rem",
                }}
              >
                <Image
                  sx={{
                    color: theme.palette.grey[400],
                    fontSize: "100px",
                  }}
                />
                <Typography
                  sx={{
                    color: theme.palette.common.black,
                    fontWeight: theme.typography.fontWeightRegular,
                    textAlign: "center",
                    mt: ".5rem",
                  }}
                >
                  {lang === "fr"
                    ? "Veuillez selectionner une image"
                    : "Please select a picture"}
                </Typography>
              </Stack>
            )}
          </label>

          <input
            type="file"
            id={"profile"}
            name={"profile"}
            style={{ display: "none" }}
            onChange={handleChange}
          />

          <Button
            disabled={fileSelected === null}
            onClick={async (event) => {
              event?.preventDefault();

              setIsLoading(true);

              await handleSubmit(fileBlob)
                .then(() => {
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                });
            }}
            sx={{
              bgcolor:
                fileSelected === null
                  ? theme.palette.grey[500]
                  : theme.palette.common.black,
              px: "1rem",
              py: ".2rem",
              color: theme.palette.common.white,
              borderRadius: "0rem",
              m: "2rem",
              "&:hover": {
                bgcolor:
                  fileSelected === null
                    ? theme.palette.grey[500]
                    : theme.palette.common.black,
              },
              fontSize: "12px",
            }}
          >
            {isLoading ? (
              <CircularProgress
                size={"14px"}
                color={"primary"}
                sx={{
                  mx: "0.7rem",
                }}
              />
            ) : (
              "Envoyer"
            )}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default UploadProfile;
