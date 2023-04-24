// application layout definition

import {
  BrokenImage,
  CheckOutlined,
  ContactMail,
  Error,
  Home,
  Message,
  Notifications,
  OfflineBolt,
  PermIdentity,
  PowerOff,
  Sell,
  Shop,
} from "@mui/icons-material";
import configs from "../../configs/generals.json";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { PaymentParameters } from "../../context/paymentParameters";
import Head from "next/head";
import axios from "axios";
import AuthenticateBox from "./AuthenticateBox";
import SectionLoader from "./SectionLoader";

const {
  useTheme,
  Box,
  Stack,
  Typography,
  Popover,
  Avatar,
  MenuItem,
  useMediaQuery,
  ButtonBase,
  Badge,
} = require("@mui/material");

const AppLayout = ({ children, pageTitle }) => {
  const theme = useTheme();

  const router = useRouter();
  const screen750 = useMediaQuery(theme.breakpoints.down(750));
  const screen500 = useMediaQuery(theme.breakpoints.down(500));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const menuMaterialObjects = [
    {
      link: "/consumption",
      icon: (props) => <Home {...props} />,
      title: "Ma consommation",
    },
    {
      link: "/identity",
      icon: (props) => <ContactMail {...props} />,
      title: "Mes numéros",
    },
    {
      link: "/offers",
      icon: (props) => <Sell {...props} />,
      title: "Mes offres",
    },
    {
      link: "/notifications",
      icon: (props) => <Notifications {...props} />,
      title: "Mes notifications",
    },
    {
      link: "/offline",
      icon: (props) => <BrokenImage {...props} />,
      title: "Hors connexion",
    },
  ];

  React.useEffect(() => {
    if (router?.query?.killIt == "true") {
      window.close();
    }
  }, []);

  const {
    setTriggerMessage,
    setCustomerProperties,
    setCustomerMsisdn,
    setContactObject,
    setpaymentParameters,
    customerMsisdn,
  } = React.useContext(PaymentParameters);

  const [isNotAuthenticated, setIsNotAuthenticated] = React.useState(false);
  const [hasProcessed, setHasProcessed] = React.useState(false);

  React.useEffect(() => {
    console.log(
      "=======================================================================================================================================================================================refresh on reload",
      {
        setTriggerMessage,
        setCustomerProperties,
        setCustomerMsisdn,
        setContactObject,
        setpaymentParameters,
        customerMsisdn,
      }
    );

    if (customerMsisdn?.length > 0) {
      setHasProcessed(true);
    } else {
      (async () => {
        await axios
          .get(configs?.whaatUrl, {
            headers: {
              "Content-Type": "text/html",
            },
          })
          ?.then((results) => {
            console.log("whaat data", results?.data?.split("\n"));
            setHasProcessed(true);

            let callingID = results?.data
              ?.split("\n")
              ?.find((header) => header?.includes("HTTP_X_CALLINGID"));

            callingID = callingID?.split("=")[1]?.split("");

            callingID?.pop();

            callingID?.shift();

            if (callingID === customerMsisdn?.toString()) {
              setCustomerMsisdn(customerMsisdn);

              window.localStorage.setItem("custMsisdn", customerMsisdn);
              window.localStorage.setItem("custMsg", triggerMessage);

              try {
                setTriggerMessage(window.localStorage.getItem("custMsg"));
              } catch (error) {
                console.log(error);
              }

              try {
                setCustomerMsisdn(window.localStorage.getItem("custMsisdn"));
              } catch (error) {
                console.log(error);
              }

              try {
                setContactObject(
                  JSON.parse(window.localStorage.getItem("custContact"))
                );
              } catch (error) {
                console.log(error);
              }

              try {
                setCustomerProperties(
                  JSON.parse(window.localStorage.getItem("custProp"))
                );
              } catch (error) {
                console.log(error);
              }

              try {
                setpaymentParameters(
                  JSON.parse(window.localStorage.getItem("custParams"))
                );
              } catch (error) {
                console.log(error);
              }
            } else {
              setIsNotAuthenticated(true);
            }
          })
          .catch((error) => {
            setHasProcessed(true);
            console.error(
              `an error has occured when trying authenticate customer with Whaat ${error}`
            );

            setIsNotAuthenticated(true);
          });
      })();
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Box
        sx={{
          width: screen750 ? "100vw" : "230px",
          position: "fixed",
          top: screen750 ? undefined : 0,
          bottom: 0,
          left: 0,
          bgcolor: `${theme.palette.secondary.main}`,
          zIndex: 910,
          height: screen750 ? "60px" : undefined,
        }}
      >
        {screen750 ? (
          ""
        ) : (
          <Stack
            direction={"row"}
            sx={{
              px: "1rem",
              py: "0.7rem",
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <img
              src="/orange-less.png"
              alt="orange-logo"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </Stack>
        )}
        <Stack
          direction={screen750 ? "row" : "column"}
          spacing={"0rem"}
          sx={{
            px: "0rem",
            mt: screen750 ? "0px" : "10vh",
            width: screen750 ? "100%" : undefined,
            height: screen750 ? "100%" : undefined,
            borderTop: screen750
              ? `1px solid ${theme.palette.grey[300]}`
              : undefined,
          }}
        >
          {menuMaterialObjects
            ?.filter((obj) => !obj?.link?.includes("offline"))
            ?.map((menuItem, index) => {
              return (
                <Link
                  href={menuItem?.link}
                  style={{
                    textDecoration: "none",
                    margin: 0,
                    padding: 0,
                    flexGrow: screen750 ? 1 : undefined,
                    height: screen750 ? "100%" : undefined,
                    overflow: "hidden",
                    width: screen750 ? "33.33333%" : undefined,
                  }}
                >
                  <ButtonBase
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Stack
                      direction={!screen750 ? "row" : "column"}
                      sx={{
                        bgcolor: !screen750
                          ? router?.asPath?.includes(menuItem?.link)
                            ? `rgba(255, 255, 255, .05)`
                            : "transparent"
                          : router?.asPath?.includes(menuItem?.link)
                          ? theme.palette.secondary.main
                          : theme.palette.common.white,
                        width: "100%",
                        px: "1rem",
                        py: "0.7rem",
                        alignItems: "center",
                        justifyContent: screen750 ? "center" : "flex-start",
                        borderRadius: !screen750
                          ? router?.asPath?.includes(menuItem?.link)
                            ? `3px 0 0 3px`
                            : undefined
                          : undefined,
                        borderLeft: !screen750
                          ? router?.asPath?.includes(menuItem?.link)
                            ? `3px solid ${theme.palette.primary.main}`
                            : undefined
                          : undefined,
                        borderBottom: screen750
                          ? router?.asPath?.includes(menuItem?.link)
                            ? `3px solid ${theme.palette.primary.main}`
                            : undefined
                          : undefined,
                        "&:hover": {
                          transition: `all ${theme.transitions.duration.short}`,
                          bgcolor: `rgba(255, 255, 255, .05)`,
                          "& span": {
                            color: theme.palette.common.white,
                          },
                        },
                        height: screen750 ? "100%" : undefined,
                        overflowX: "hidden",
                      }}
                    >
                      {menuItem?.icon({
                        sx: {
                          color: theme.palette.primary.main,
                          fontSize: "18px",
                          mr: screen750 ? "0px" : "1.5rem",
                        },
                      }) || (
                        <Error
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: "18px",
                            mr: screen750 ? "0px" : "1.5rem",
                          }}
                        />
                      )}

                      {menuItem?.title === "Mes notifications" ? (
                        <Badge
                          badgeContent={4}
                          color="primary"
                          sx={{
                            ".MuiBadge-badge": {
                              transform: "scale(1) translate(70%, -60%)",
                            },
                          }}
                        >
                          <Typography
                            component={"span"}
                            sx={{
                              color: !screen750
                                ? theme.palette.common.white
                                : router?.asPath?.includes(menuItem?.link)
                                ? theme.palette.common.white
                                : theme.palette.common.black,
                              fontSize: screen500
                                ? "9px"
                                : screen750
                                ? "12px"
                                : "14px",
                              textAlign: screen750 ? "center" : undefined,
                              fontWeight: theme.typography.fontWeightBold,
                            }}
                          >
                            {menuItem?.title}
                          </Typography>
                        </Badge>
                      ) : (
                        <Typography
                          component={"span"}
                          sx={{
                            color: !screen750
                              ? theme.palette.common.white
                              : router?.asPath?.includes(menuItem?.link)
                              ? theme.palette.common.white
                              : theme.palette.common.black,
                            fontSize: screen500
                              ? "9px"
                              : screen750
                              ? "12px"
                              : "14px",
                            textAlign: screen750 ? "center" : undefined,
                            fontWeight: theme.typography.fontWeightBold,
                          }}
                        >
                          {menuItem?.title}
                        </Typography>
                      )}
                    </Stack>
                  </ButtonBase>
                </Link>
              );
            })}
          {screen750 ? (
            ""
          ) : (
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                position: "absolute",
                fontSize: "14px",
                fontWeight: theme.typography.fontWeightBold,
                bottom: 10,
                color: theme.palette.common.white,
              }}
            >
              Orange RDC &copy; {new Date().getFullYear()}
            </Typography>
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          left: screen750 ? "0px" : "230px",
          bgcolor: screen750
            ? theme.palette.secondary.main
            : theme.palette.common.white,
          height: "60px",
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          zIndex: 900,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            px: "1rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            {menuMaterialObjects
              ?.find((menu) => router?.asPath?.includes(menu?.link))
              ?.icon({
                sx: {
                  color: theme.palette.primary.main,
                  fontSize: screen750 ? "18px" : "26px",
                  mr: "1rem",
                },
              }) || (
              <Error
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: "18px",
                  mr: screen750 ? "0px" : "1.5rem",
                }}
              />
            )}

            <Typography
              sx={{
                color: screen750
                  ? theme.palette.common.white
                  : theme.palette.secondary.main,
                fontSize: screen750 ? "14px" : "16px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {pageTitle}
            </Typography>
          </Stack>
          {screen750 ? (
            <img
              src="/orange-less.png"
              alt="image"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          ) : (
            ""
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{
              mt: "1rem",
              py: "1rem",
            }}
          >
            <MenuItem
              onClick={(event) => {
                event.preventDefault();
                router.push({
                  pathname: "/consumption",
                  query: { killIt: true },
                });
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  px: "1rem",
                  py: "0.4rem",
                }}
              >
                <PowerOff
                  sx={{
                    color: theme.palette.common.black,
                    fontSize: screen750 ? "18px" : "20px",
                    mr: "1rem",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  }}
                >
                  Fermer
                </Typography>
              </Stack>
            </MenuItem>
          </Popover>
        </Stack>
      </Box>
      <Box
        sx={{
          width: screen750 ? "100vw" : "calc(100vw - 230px)",
          overflowX: "hidden",
          ml: screen750 ? "0px" : "230px",
          mb: screen750 ? "70px" : undefined,
        }}
      >
        {!hasProcessed ? (
          <Stack
            direction={"row"}
            sx={{
              py: "5rem",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                width: "90%",
              }}
            >
              <SectionLoader />
            </Stack>
          </Stack>
        ) : isNotAuthenticated ? (
          <AuthenticateBox />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default AppLayout;
