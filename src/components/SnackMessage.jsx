// snack message error

import * as React from "react";
import { Alert, Snackbar, useTheme } from "@mui/material";

const SnackMessage = ({ handleClose, severity, message }) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{
        zIndex: 1000,
      }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackMessage;
