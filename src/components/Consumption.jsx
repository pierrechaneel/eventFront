// consumption component definition

import * as React from "react";
import {
  Stack,
  useTheme,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import SectionLoader from "./SectionLoader";
import { PaymentParameters } from "../../context/paymentParameters";
import configs from "../../configs/generals.json";

const Consumption = ({ updateTime }) => {
  const theme = useTheme();

  console.log("update time", { updateTime });

  const screen1500 = useMediaQuery(theme.breakpoints.up(1500));
  const screen900 = useMediaQuery(theme.breakpoints.down(900));
  const screen940 = useMediaQuery(theme.breakpoints.down(940));
  const screen450 = useMediaQuery(theme.breakpoints.down(450));
  const screen1250 = useMediaQuery(theme.breakpoints.up(1250));

  const [customerBalanceData, setcustomerBalanceData] = React.useState([]);

  const customerMsisdn = React.useContext(PaymentParameters)?.customerMsisdn;
  const triggerMessage = React.useContext(PaymentParameters)?.triggerMessage;

  const [searchFailed, setSearchFailed] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setSearchFailed(false);
      await axios
        .get(`/api/consumption?customerMsisdn=${customerMsisdn?.slice(-9)}`)
        .then((results) => {
          setcustomerBalanceData(results?.data?.balances);
        })
        .catch((error) => {
          console.log("an error has has occured when fetching balances", error);

          setSearchFailed(true);
        });
    })();
  }, []);

  const handleRetry = (event) => {
    setRechargeTime(new Date().toLocaleString("fr-FR"));

    (async () => {
      setSearchFailed(false);
      await axios
        .get(`/api/consumption?customerMsisdn=${customerMsisdn?.slice(-9)}`)
        .then((results) => {
          setcustomerBalanceData(results?.data?.balances);
        })
        .catch((error) => {
          console.log("an error has has occured when fetching balances", error);

          setSearchFailed(true);
        });
    })();
  };

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const customerProperties =
    React.useContext(PaymentParameters)?.customerProperties;
  const setCustomerProperties =
    React.useContext(PaymentParameters)?.setCustomerProperties;

  console.log("customer props", { customerProperties });

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`/api/customers/get-properties?customerMsisdn=${customerMsisdn}`)
        .then((results) => {
          const custProp = {
            customerName: results?.data?.properties?.customerName,
            serviceClass: results?.data?.properties?.serviceClass,
            mainBalance: results?.data?.properties?.mainBalance,
          };

          setCustomerProperties(custProp);

          // window.localStorage.setItem("custProp", JSON.stringify(custProp));
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get cust properties",
            error
          );
        });
    })();
  }, []);

  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction={screen940 ? "column" : "row"}
        sx={{
          alignItems: screen940 ? undefined : "center",
          justifyContent: screen940 ? undefined : "space-between",
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
              //mb: screen900 ? ".7rem" : "1.5rem",
            }}
          >
            Dernière mise à jour {updateTime}
          </Typography>
        </Stack>
        <Stack
          direction={screen940 ? "row" : "column"}
          sx={{
            alignItems: "flex-end",
            //px: "1rem",
            py: "0.5rem",
            borderradius: "0px",
            overflowX: "hidden",
            width: screen940 ? "100%" : undefined,
            justifyContent: screen940 ? "space-between" : undefined,
            bgcolor: theme.palette.common.white,
            //boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
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
                  {configs?.translates[key]} : {screen940 ? <br /> : ""}
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
          mt: "0rem",
        }}
      >
        <Stack
          sx={{
            borderRadius: "0.3rem",
            p: "1rem",
            height: "max-content",
            width: "100%",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "space-between",
              flexWrap: "wrap",
              // mt: screen900 ? "0rem" : "1.5rem",
              widtj: "100%",
              justifyContent: screen1250 ? "flex-start" : "flex-start",
            }}
          >
            {(Object.keys(customerProperties?.mainBalance)?.length > 0
              ? [customerProperties?.mainBalance, ...customerBalanceData]
              : customerBalanceData
            )?.length > 0 ? (
              (Object.keys(customerProperties?.mainBalance)?.length > 0
                ? [customerProperties?.mainBalance, ...customerBalanceData]
                : customerBalanceData
              )?.map((target, index) => {
                console.log("target", { target });

                return (
                  <Stack
                    direction={"column"}
                    key={index}
                    sx={{
                      alignItems: "center",
                      m: screen940 ? "0.3rem" : "1rem",
                      width: screen450 ? "25%" : screen940 ? "25%" : "28%",
                      minWidth: "75px",
                      maxWidth: screen1250 ? "250px" : undefined,
                      boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
                      borderradius: "0px",
                      overflowX: "hidden",
                      bgcolor: theme.palette.common.white,
                      p: screen450 ? "0.5rem" : "1rem",
                      flexGrow: 1,
                    }}
                  >
                    <Stack
                      direction={"column"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "1rem",
                        width: screen1500
                          ? "170px"
                          : screen900
                          ? "70px"
                          : "150px",
                        height: screen1500
                          ? "170px"
                          : screen900
                          ? "70px"
                          : "150px",
                        borderRadius: "50%",
                        border: `${!screen900 ? 10 : 7}px solid ${
                          target?.balance > 0
                            ? theme.palette.primary.main
                            : theme.palette.common.black
                        }`,
                        overflow: "hidden",
                        p: "1rem",
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: screen900 ? "16px" : "24px",
                          texAlign: "center",
                          my: screen900 ? "0rem" : ".3rem",
                        }}
                      >
                        {target?.offerName === "Balance principale"
                          ? Number.parseFloat(target?.balance) > 1000
                            ? (
                                Number.parseFloat(target?.balance) / 1000
                              )?.toFixed(1) + "K"
                            : target?.balance
                          : target?.balance >= 1024
                          ? Number.parseFloat(target?.balance / 1024).toFixed(1)
                          : target?.balance}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.common.black,
                          fontWeight: theme.typography.fontWeightBold,
                          fontSize: screen900 ? "14px" : "18px",
                          texAlign: "center",
                          my: screen900 ? "0rem" : ".3rem",
                        }}
                      >
                        {target?.offerName === "Balance principale"
                          ? "U"
                          : target?.balance >= 1024
                          ? "GB"
                          : "MB"}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.common.black,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: screen900 ? "14px" : "16px",
                        mt: "1rem",
                      }}
                    >
                      {target?.offerName[0]?.toUpperCase()}
                      {target?.offerName?.slice(
                        1,
                        target?.offerName?.length - 1
                      )}
                      {target?.offerName[target?.offerName?.length - 1] !== "."
                        ? target?.offerName[target?.offerName?.length - 1]
                        : ""}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: theme.palette.common.black,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: screen900 ? "10px" : "12px",
                        my: ".0rem",
                      }}
                    >
                      Expirent au {target?.expiryDate?.trim()}
                    </Typography>
                  </Stack>
                );
              })
            ) : searchFailed ? (
              <Stack
                direction={"column"}
                sx={{
                  alignItems: "center",
                  my: "1.3rem",
                  width: "100%",

                  p: "1rem",
                  borderradius: "0px",
                  bgcolor: theme.palette.common.white,
                  boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
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
                  Votre compte n'a malheureusement aucune balance active,
                  veuillez vous recharger et rester connecté avec Orange
                </Typography>
                <Button
                  onClick={(event) => {
                    handleRetry(event);
                  }}
                  sx={{
                    bgcolor: theme.palette.common.black,
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightBold,

                    fontSize: screen750 ? "16px" : "14px",
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
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontWeight: theme.typography.fontWeightBold,
            fontSize: screen900 ? "14px" : "16px",
            mt: "1rem",
          }}
        >
          {triggerMessage}
        </Typography>
        <Stack
          direction={"column"}
          sx={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            my: "1.5rem",
            px: "1rem",
            py: "2rem",
            border: `1px solid ${theme.palette.grey[300]}`,
            mb: "1rem",
            width: "max-content",
            maxWidth: "100%",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.black,
              fontWeight: theme.typography.fontWeightRegular,
              fontSize: screen750 ? "14px" : "16px",
            }}
          >
            Rechargez-vous avant que vous ne soyez déconnectés du monde
          </Typography>
          <img
            src="/orange-shop-market.svg"
            alt="shop"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              width: "100px",
            }}
          />
          <Link
            href="/consumption/cost-payer"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                bgcolor: theme.palette.common.white,
                color: theme.palette.common.black,
                borderRadius: "0rem",
                px: ".7rem",
                py: "0.2rem",
                fontWeight: theme.typography.fontWeightBold,
                fontSize: screen900 ? "12px" : "14px",
                border: `2px solid ${theme.palette.common.black}`,
                "&:hover": {
                  transition: `all ${theme.transitions.duration.complex} ${theme.transitions.easing.easeInOut}`,
                  bgcolor: theme.palette.common.black,
                  color: theme.palette.common.white,
                },
              }}
            >
              Je m'approvisionne
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Consumption;
