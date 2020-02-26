import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles(theme => ({
  dialog: {
    "& .MuiDialog-paper": {
      margin: 20
    }
  },
  closeButton: {}
}));
const Modal = ({
  children,
  open,
  onClose,
  title,
  maxWidth,
  fullWidth,
  closeButton
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      onClose={onClose}
      maxWidth={maxWidth ? "xs" : "sm"}
      aria-labelledby="responsive-dialog-title"
      fullWidth={fullWidth ? fullWidth : false}
    >
      <div>
        {title && (
          <DialogTitle
            style={{ textAlign: "center" }}
            id="responsive-dialog-title"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              {title}
              {closeButton && (
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={onClose}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          </DialogTitle>
        )}
        {children && <DialogContent>{children}</DialogContent>}
      </div>
    </Dialog>
  );
};

export default Modal;
