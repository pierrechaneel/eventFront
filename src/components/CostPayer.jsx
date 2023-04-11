// CostPayer component definition

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
import SectionLoader from "./SectionLoader";

const CostPayer = ({}) => {
  const theme = useTheme();

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  const [paymentOptions, setpaymentOptions] = React.useState([
    { title: "Mon compte Box", link: "/consumption/canal" },
    { title: "Un autre compte", link: "/consumption/phone-number" },
  ]);

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
          href={"/consumption"}
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
          Choisissez le compte de paiement
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
            {paymentOptions?.length > 0 ? (
              paymentOptions?.map((target, index) => {
                return (
                  <Link
                    href={`${target?.link}`}
                    key={index}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      "&:hover, &:focus": {
                        color: "inherit",
                        backgroundColor: "inherit",
                      },
                    }}
                  >
                    <MenuItem
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
                        <ChevronRight
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: screen750 ? "16px" : "18px",
                          }}
                        />
                      </Stack>
                    </MenuItem>
                  </Link>
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

export default CostPayer;
