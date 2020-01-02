import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { colors } from "../../config/brand.yml";
const Alert = ({ open, message, onClose, time }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={time ? time : 4000}
      onClose={onClose}
    >
      <SnackbarContent
        style={{ background: colors.green }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      ></SnackbarContent>
    </Snackbar>
  );
};
export default Alert;