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

const EditSelf = ({ setSecondaryMenu }) => {
  const theme = useTheme();

  const handleLangChange = async (event) => {
    event?.preventDefault();
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        height: "100vh",
        bgcolor: theme.palette.common.black,
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          px: "0.3rem",
          borderRight: `1px solid ${theme.palette.grey[500]}`,
        }}
      >
        <Stack
          direction={"row-reverse"}
          sx={{
            alignItems: "center",
            width: "100%",
            height: "55px",
          }}
        >
          <IconButton
            color={theme.palette.common.white}
            onClick={(event) => {
              event.preventDefault();

              setSecondaryMenu({ visible: false, component: null });
            }}
          >
            <Close
              sx={{
                fontSize: "24px",
                color: theme.palette.common.white,
              }}
            />
          </IconButton>
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          bgcolor: theme.palette.grey[300],
          height: "200px",
          justifyContent: "center",
          position: "relative",
          top: 0,
        }}
      >
        <Avatar
          src={"/"}
          sx={{
            width: "100px",
            height: "100px",
            position: "absolute",
            bottom: "-2.5rem",
          }}
        />
      </Stack>

      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          alignItem: "center",
          bgcolor: theme.palette.common.black,
          pt: "3rem",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontWeight: theme.typography.fontWeightThin,
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          Amadou Mouane
        </Typography>
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontWeight: theme.typography.fontWeightRegular,
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Développeur Blockchain
        </Typography>
      </Stack>
      <Stack
        direction={"column"}
        sx={{
          alignItems: "flex-end",
          width: "100%",
          px: "1.5rem",
          mt: "2rem",
          "& *": {
            color: theme.palette.common.white,
            borderColor: theme.palette.common.white,
            borderRadius: 0,
          },
        }}
      >
        <form
          onSubmit={handleLangChange}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <FormControl
            size="small"
            sx={{
              width: "100%",
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

export default EditSelf;
