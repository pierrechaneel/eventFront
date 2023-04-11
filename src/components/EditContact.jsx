// EditContact component definition

import * as React from "react";
import {
  Stack,
  useTheme,
  Typography,
  Button,
  Box,
  IconButton,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { ArrowBack, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { PaymentParameters } from "../../context/paymentParameters";
import configs from "../../configs/generals.json";
import { useRouter } from "next/router";

const EditContact = ({}) => {
  const theme = useTheme();

  const router = useRouter();

  const contactObj = React.useContext(PaymentParameters).contactObject;

  const customerMsisdn = React.useContext(PaymentParameters).customerMsisdn;

  // console.log("contact Object", { contactObj });

  const handleChange = (event) => {
    event.preventDefault();
  };

  const handleEditSubmit = async (event) => {
    event?.preventDefault();

    const submitObj = {
      ...contactObj,
    };

    Array?.from(event?.target?.elements)
      ?.filter((elt) => elt?.name !== "")
      ?.forEach((element) => {
        submitObj[element?.name] = element?.value;
      });

    // console.log("post object", { ...submitObj, customerMsisdn });

    await axios
      .get(
        `/api/customers/mod-contact?customerMsisdn=${customerMsisdn}&level=${submitObj?.level}&newContactAddr=${submitObj?.address}&newContactFN=${submitObj?.firstName}&newContactGender=${submitObj?.gender}&newContactPN=${submitObj?.postName}&newContactSN=${submitObj?.surName}&newContactNbr=${submitObj?.msisdn}&newContactEmail=${submitObj?.email}`
      )
      ?.then((results) => {
        console.log("received res afer mod 2", {
          res: results?.data,
        });

        router?.push("/identity");
      })
      ?.catch((error) => {
        console.log(
          "an error has occured when trying to modify contact number",
          error
        );
      });
  };

  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          mb: "1rem",
        }}
      >
        <Link
          href={"/identity"}
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            sx={{
              width: "min-content",
              position: "relative",
              left: "-.7rem",
              mr: "1rem",
            }}
          >
            <ArrowBack />
          </IconButton>
        </Link>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.grey[700],
            flexGrow: 1,
            textAlign: "center",
            p: 0,
            m: 0,
          }}
        >
          Mise à jour
        </Typography>
      </Stack>
      <form onSubmit={handleEditSubmit}>
        <Stack
          sx={{
            mt: "1rem",
          }}
        >
          <Stack
            spacing={1.5}
            sx={{
              boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
              borderRadius: "0.3rem",
              bgcolor: theme.palette.common.white,
              p: 0,
              m: 0,
              height: "max-content",
              width: "100%",
              p: "1rem",
            }}
          >
            {Object?.keys(contactObj)
              ?.filter(
                (target) => !["link", "level", "title"]?.includes(target)
              )
              ?.map((key, index) => {
                return key === "gender" ? (
                  <FormControl size={"small"} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {configs?.translates[key]}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={configs?.translates[key]}
                      onChange={handleChange}
                      name={key}
                      defaultValue={contactObj[key]}
                    >
                      <MenuItem value={"M"}>Masculin</MenuItem>
                      <MenuItem value={"F"}>Féminin</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    key={index}
                    size={"small"}
                    id="outlined-basic"
                    label={configs?.translates[key]}
                    name={key}
                    defaultValue={contactObj[key]}
                    variant="outlined"
                  />
                );
              })}
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              mt: "1.5rem",
            }}
          >
            <Button
              type="submit"
              sx={{
                bgcolor: theme.palette.common.white,
                color: theme.palette.common.black,
                borderRadius: "0rem",
                px: "0.7rem",
                py: "0.15rem",
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "14px",
                border: `2px solid ${theme.palette.common.black}`,
                "&:hover": {
                  transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                  bgcolor: theme.palette.common.black,
                  color: theme.palette.common.white,
                },
              }}
            >
              Envoyer
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default EditContact;
