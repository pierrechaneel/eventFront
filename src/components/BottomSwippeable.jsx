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

const drawerBleeding = 5;

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
  backgroundColor: grey[200],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  display: "none",
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

  console.log("receip swippeable props, ", props);

  return (
    <SwipeableDrawer
      container={container}
      anchor="bottom"
      open={props?.open}
      onClose={() => {
        props?.setOpen(false);
      }}
      onOpen={() => {
        props?.setOpen(true);
      }}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        bgcolor: "#FFFFFF",
        height: "max-content",
        maxHeight: "80vh",
      }}
    >
      <StyledBox
        sx={{
          position: "absolute",
          top: -drawerBleeding,
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          visibility: "visible",
          right: 0,
          left: 0,
          bgcolor: theme.palette.common.black,
          height: "12px",
          display: "none",
        }}
      >
        <Puller />
      </StyledBox>
      <StyledBox
        sx={{
          px: ".1rem",
          pb: ".1rem",
          height: "100%",
          mexHeight: "100%",
          overflow: "hidden",
          borderRadius: `1rem 1rem 0rem 0rem`,
          borderTop: `.5px solid ${theme.palette.grey[500]}`,
          bgcolor: theme.palette.common.black,
        }}
      >
        {props?.defaultSwippeableContent}
      </StyledBox>
    </SwipeableDrawer>
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
