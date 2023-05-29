import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Stack, useTheme } from "@mui/material";
import { useRouter } from "next/router";

const drawerBleeding = 75;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: `#0000`,
  zIndex: 1115,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: `#0000`,
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[500],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const BottomSwippeable = (props) => {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const router = useRouter();

  const theme = useTheme();

  return (
    <Root
      sx={{
        bgcolor: theme.palette.common.black,
      }}
    >
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: theme.palette.common.black,
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            bgcolor: theme.palette.common.black,
            //height: "100%",
            width: "100%",
            zIndex: 1115,
          }}
        >
          <Puller />
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              mt: "1.3rem",
              //height: "100%",
              justifyContent: "center",
              mb: "1.2rem",
              width: "100%",
              overflowX: "auto",
            }}
          >
            {props?.apps?.map((target) => {
              return (
                <Stack
                  onClick={(event) => {
                    event?.preventDefault();
                    router.push(target?.link);
                  }}
                  direction={"column"}
                  sx={{
                    alignItems: "center",
                    mx: "1.5vw",
                    mt: ".3rem",
                    minwidth: "50px",
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                >
                  {target?.icon({
                    sx: {
                      fontSize: "16px",
                      width: "16px",
                      color: router?.asPath?.includes(target?.link)
                        ? theme.palette.primary.main
                        : theme.palette.grey[500],
                    },
                  })}
                  <Typography
                    component={"span"}
                    sx={{
                      fontWeight: theme.typography.fontWeightMedium,
                      color: router?.asPath?.includes(target?.link)
                        ? theme.palette.primary.main
                        : theme.palette.grey[500],
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {target?.title}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        ></StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

BottomSwippeable.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BottomSwippeable;
