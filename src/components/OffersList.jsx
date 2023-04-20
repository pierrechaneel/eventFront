// OffersList component definition

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
import clearState from "../utils/clearState";

const OffersList = ({ updateTime }) => {
  const theme = useTheme();

  const [OffersLists, setOffersLists] = React.useState([]);

  const router = useRouter();

  const screen1500 = useMediaQuery(theme.breakpoints.up(1500));
  const screen900 = useMediaQuery(theme.breakpoints.down(900));
  const screen750 = useMediaQuery(theme.breakpoints.down(750));
  const screen450 = useMediaQuery(theme.breakpoints.down(450));
  const screen1250 = useMediaQuery(theme.breakpoints.up(1250));
  const screen940 = useMediaQuery(theme.breakpoints.up(940));

  const customerMsisdn = React.useContext(PaymentParameters)?.customerMsisdn;

  const [searchFailed, setSearchFailed] = React.useState(false);

  const setpaymentParameters =
    React.useContext(PaymentParameters)?.setpaymentParameters;

  const setTransitState = React.useContext(PaymentParameters)?.setTransitState;

  const paymentParameters =
    React.useContext(PaymentParameters)?.paymentParameters;

  const [offerList, setOfferList] = React.useState([]);

  React.useEffect(() => {
    setTransitState(false);

    Object.keys(paymentParameters)?.forEach((key) => {
      paymentParameters[key] = "";
    });

    // console.log("final payment parameters", { paymentParameters });

    setpaymentParameters(paymentParameters);
  }, []);

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`/api/consumption/offers/pricing?group=box`)
        .then((results) => {
          setOfferList(results?.data?.groups);
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get offers list",
            error
          );

          setSearchFailed(true);
        });
    })();
  }, []);

  const handlePurchaseOut = async (event, target) => {
    event?.preventDefault();

    setpaymentParameters({
      ...paymentParameters,
      bundlePrice: Number.parseFloat(target?.cost?.toString()?.trim())?.toFixed(
        1
      ),
      offerName: target?.offerName?.toString()?.trim(),
      offercode: target?.offerCode?.toString()?.trim(),
      offerDuration: "30 jours",
    });

    setTransitState(true);

    router.push(`/consumption/cost-payer`);
  };

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
      </Stack>
      <Stack
        sx={{
          mt: "1rem",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "flex-start",
            my: "0.5rem",
          }}
        >
          <img
            src={"/orange-shop-market.svg"}
            style={{
              width: "100px",
            }}
          />
          <Typography
            sx={{
              color: theme.palette.common.black,
              fontSize: "14px",
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            J'approvisionne mon compte
          </Typography>
        </Stack>
        {searchFailed ? (
          <Stack
            sx={{
              width: "100%",
              p: screen750 ? "1rem" : "2rem",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: screen750 ? "16px" : "14px",
                textAlign: "center",
                my: "2rem",
              }}
            >
              Oups, une erreur est survenue
            </Typography>
          </Stack>
        ) : (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "space-between",
              flexWrap: "wrap",
              // mt: screen900 ? "0rem" : "1.5rem",
              width: "100%",
              justifyContent: screen1250 ? "flex-start" : "flex-start",
            }}
          >
            {offerList?.map((target, index) => {
              return (
                <Stack
                  direction={"column"}
                  key={index}
                  sx={{
                    alignItems: "center",
                    m: screen750 ? "0.3rem" : "1rem",
                    width: screen450 ? "25%" : screen940 ? "25%" : "28%",
                    minWidth: "75px",
                    maxWidth: "250px",
                    boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
                    borderradius: "0px",
                    overflowX: "hidden",
                    bgcolor: theme.palette.common.white,
                    p: screen450 ? "0.5rem" : screen750 ? "1rem" : "2rem",
                    //flexGrow: 1,
                    "&:hover": {
                      transition: `all .5s`,
                      boxShadow: "none",
                      border: `1px solid ${theme.palette.grey[300]}`,
                    },
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.common.black,
                      fontWeight: theme.typography.fontWeightMedium,
                      fontSize: screen450
                        ? "14px"
                        : screen750
                        ? "16px"
                        : "18px",
                      textAlign: "center",
                    }}
                  >
                    {target?.cost} Unités
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.common.black,
                      fontWeight: theme.typography.fontWeightThin,
                      fontSize: screen750 ? "14px" : "16px",
                      textAlign: "center",
                    }}
                  >
                    {target?.offerName?.split("-")[0]?.split(" ")[0]} Gigas
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.grey[700],
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: screen450
                        ? "14px"
                        : screen750
                        ? "16px"
                        : "18px",
                      textAlign: "center",
                      mb: "1rem",
                    }}
                  >
                    {target?.offerName?.split("-")[1]?.slice(0, 3)} Jours
                  </Typography>

                  <Button
                    onClick={(event) => {
                      handlePurchaseOut(event, target);
                    }}
                    sx={{
                      bgcolor: theme.palette.common.white,
                      color: theme.palette.common.black,
                      borderRadius: "0rem",

                      py: ".1rem",
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: "14px",
                      border: `2px solid ${theme.palette.common.black}`,
                      "&:hover": {
                        transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                        bgcolor: theme.palette.common.black,
                        color: theme.palette.common.white,
                        "& span": {
                          color: theme.palette.common.white,
                        },
                      },
                      height: "27px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    Activer
                  </Button>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default OffersList;
