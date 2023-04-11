// PriceList component definition

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
import { useRouter } from "next/router";
import { PaymentParameters } from "../../context/paymentParameters";
import configs from "../../configs/generals.json";
import SectionLoader from "./SectionLoader";

const PriceList = ({}) => {
  const theme = useTheme();

  const [offerPrices, setofferPrices] = React.useState([]);

  const customerParams = React.useContext(PaymentParameters).paymentParameters;
  const setCustomerParams =
    React.useContext(PaymentParameters).setpaymentParameters;

  const router = useRouter();

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const handleClick = async (event, price, offer, code) => {
    event.preventDefault();

    const custParams = {
      ...customerParams,
      bundlePrice: ["USD", "Unités"]?.includes(customerParams?.currency)
        ? Number.parseFloat(price)
        : (Number.parseFloat(price) * configs?.exchangeRate).toFixed(1),
      offerName: offer,
      offerCode: code,
    };

    setCustomerParams(custParams);

    window.localStorage?.setItem("custParams", JSON.stringify(custParams));

    router.push("/consumption/recharge-result");
  };

  React.useEffect(() => {
    (async () => {
      await axios
        .get(
          `/api/consumption/offers/pricing?group=${customerParams?.offerDuration}`
        )
        .then((results) => {
          setofferPrices(results?.data?.groups);
        })
        .catch((error) => {
          console.error(
            `an error has occured when trying to get offer groups`,
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
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          mb: "1rem",
        }}
      >
        <Link
          href={"/consumption/group-list"}
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
          Choisissez le montant
        </Typography>
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
            {offerPrices?.length > 0 ? (
              offerPrices?.map((target, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={(event) => {
                      handleClick(
                        event,
                        customerParams?.canal === "Orange Money"
                          ? (Number.parseFloat(target?.cost) / 100).toFixed(1)
                          : Number.parseFloat(target?.cost),
                        target?.offerName,
                        target?.offerCode
                      );
                    }}
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
                        {target?.offerName}
                      </Typography>
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.common.black,
                            fontWeight: theme.typography.fontWeightBold,
                            fontSize: "14px",
                            mr: "0.5rem",
                          }}
                        >
                          {customerParams?.canal === "Orange Money"
                            ? `${
                                customerParams?.currency === "USD"
                                  ? (
                                      Number.parseFloat(target?.cost) / 100
                                    ).toFixed(1)
                                  : (
                                      (
                                        Number.parseFloat(target?.cost) / 100
                                      ).toFixed(1) * configs?.exchangeRate
                                    )?.toFixed()
                              } ${customerParams?.currency}`
                            : `${Number.parseFloat(target?.cost)} U`}
                        </Typography>
                        <ChevronRight
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: screen750 ? "16px" : "18px",
                          }}
                        />
                      </Stack>
                    </Stack>
                  </MenuItem>
                );
              })
            ) : (
              <SectionLoader />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PriceList;
