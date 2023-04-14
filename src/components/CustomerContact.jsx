// CustomerContact component definition

import * as React from "react";
import {
  Stack,
  useTheme,
  Typography,
  Button,
  Box,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { PaymentParameters } from "../../context/paymentParameters";
import { useRouter } from "next/router";
import SectionLoader from "./SectionLoader";
import configs from "../../configs/generals.json";

const CustomerContact = ({ updateTime }) => {
  const theme = useTheme();

  const [customerContacts, setcustomerContacts] = React.useState([]);

  const router = useRouter();

  const screen1500 = useMediaQuery(theme.breakpoints.up(1500));
  const screen900 = useMediaQuery(theme.breakpoints.down(900));
  const screen750 = useMediaQuery(theme.breakpoints.down(750));
  const screen450 = useMediaQuery(theme.breakpoints.down(450));
  const screen1250 = useMediaQuery(theme.breakpoints.up(1250));

  const customerMsisdn = React.useContext(PaymentParameters)?.customerMsisdn;

  console.log("customer to get contacts of", { customerMsisdn });

  const [searchFailed, setSearchFailed] = React.useState(false);

  const setContactObject =
    React.useContext(PaymentParameters)?.setContactObject;

  const contactObject = React.useContext(PaymentParameters)?.contactObject;

  const handleRetry = async (event) => {
    event?.preventDefault();

    setSearchFailed(false);

    (async () => {
      await axios
        .get(`/api/customers/get-contacts?customerMsisdn=${customerMsisdn}`)
        .then((results) => {
          setcustomerContacts(
            results?.data?.contacts?.filter((target) => {
              return ![null, undefined, ""]?.includes(target?.msisdn);
            })
          );
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get contact number",
            error
          );

          setSearchFailed(true);
        });
    })();
  };

  React.useEffect(() => {
    setSearchFailed(false);

    console.log(`/api/customers/get-contacts?customerMsisdn=${customerMsisdn}`);

    (async () => {
      await axios
        .get(`/api/customers/get-contacts?customerMsisdn=${customerMsisdn}`)
        .then((results) => {
          setcustomerContacts(
            results?.data?.contacts?.filter((target) => {
              return ![null, undefined, ""]?.includes(target?.msisdn);
            })
          );
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get contact number",
            error
          );

          setSearchFailed(true);
        });
    })();
  }, []);

  const handleClick = (event, obj) => {
    event?.preventDefault();

    const custContact = {
      ...contactObject,
      ...obj,
    };

    setContactObject(custContact);

    window.localStorage.setItem("custContact", JSON.stringify(custContact));

    router.push(obj?.link);
  };

  const customerProperties =
    React.useContext(PaymentParameters)?.customerProperties;

  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction={screen750 ? "column" : "row"}
        sx={{
          alignItems: screen750 ? undefined : "center",
          justifyContent: screen750 ? undefined : "space-between",
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
              color: theme.palette.common?.black,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: screen900 ? "16px" : "20px",
            }}
          >
            Bonjour 0{customerMsisdn?.slice(-9)},
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontWeight: theme.typography.fontWeightBold,
              fontSize: screen900 ? "14px" : "16px",
              mb: screen900 ? ".7rem" : "1.5rem",
            }}
          >
            Dernière mise à jour {updateTime}
          </Typography>
        </Stack>
        <Stack
          direction={screen750 ? "row" : "column"}
          sx={{
            alignItems: "flex-end",
            borderradius: "0px",
            overflowX: "hidden",
            width: screen750 ? "100%" : undefined,
            justifyContent: screen750 ? "space-between" : undefined,
            bgcolor: theme.palette.common.white,
            // boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
          }}
        >
          {Object.keys(customerProperties)
            ?.filter((key) => key !== "mainBalance")
            ?.map((key) => {
              return (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  }}
                >
                  {configs?.translates[key]} : {screen750 ? <br /> : ""}
                  <Typography
                    component={"span"}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: "12px",
                    }}
                  >
                    {customerProperties[key]
                      ? customerProperties[key]
                      : "Aucun(e)"}
                  </Typography>
                </Typography>
              );
            })}
        </Stack>
      </Stack>
      <Stack
        sx={{
          mt: "1rem",
        }}
      >
        <Stack
          sx={{
            boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
            borderRadius: "0.3rem",
            bgcolor: theme.palette.common.white,
            p: 0,
            m: 0,
            height: "max-content",
            width: "100%",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              alignItems: "center",
              m: 0,
              width: "100%",
            }}
          >
            {customerContacts?.length > 0 ? (
              customerContacts?.map((target, index) => {
                return (
                  <MenuItem
                    onClick={(event) => {
                      handleClick(event, target);
                    }}
                    key={index}
                    sx={{
                      width: "100%",
                      "&:hover": {
                        transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                        bgcolor: theme.palette.grey[50],
                      },
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        width: "100%",
                        py: "0.5rem",
                        px: "1rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: "14px",
                        }}
                      >
                        {target?.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: "14px",
                        }}
                      >
                        {target?.msisdn}
                      </Typography>
                      <ChevronRight
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: screen750 ? "16px" : "18px",
                        }}
                      />
                    </Stack>
                  </MenuItem>
                );
              })
            ) : searchFailed ? (
              <Stack
                direction={"column"}
                sx={{
                  alignItems: "center",
                  my: "1.3rem",
                  width: "70%",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.grey[700],
                    fontSize: "14px",
                  }}
                >
                  Aucun numéro n'est associé à votre compte. Contactez le
                  service client au 1555
                </Typography>
                <Button
                  onClick={(event) => {
                    handleRetry(event);
                  }}
                  sx={{
                    bgcolor: theme.palette.common.black,
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "16px",
                    py: "0.2rem",
                    px: "1rem",
                    borderradius: "0px",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: theme.palette.common.black,
                      color: theme.palette.common.white,
                    },
                    mt: "1rem",
                  }}
                >
                  Réessayer
                </Button>
              </Stack>
            ) : (
              <SectionLoader />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomerContact;
