import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { Alert as AlertMessage } from "@material-ui/lab/";

import CloseIcon from "@material-ui/icons/Close";
import { colors } from "../../config/brand.yml";
const Alert = ({
  open,
  message,
  onClose = () => null,
  time = 6000,
  severity = "success",
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={time}
      onClose={onClose}
    >
      <AlertMessage onClose={onClose} severity={severity}>
        {message}
      </AlertMessage>
    </Snackbar>
  );
};
export default Alert;
