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
    >
      <StyledBox
        sx={{
          position: "absolute",
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          right: 0,
          left: 0,
          bgcolor: theme.palette.common.black,
          height: "30px",
        }}
      >
        <Puller />
      </StyledBox>
      <StyledBox
        sx={{
          px: 2,
          pb: 2,
          height: "100%",
          overflow: "auto",
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
