import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  dialog: {
    "& .MuiDialog-paper": {
      margin: 20
    }
  }
}));
const Modal = ({ children, open, onClose, title }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      onClose={onClose}
      maxWidth="sm"
      aria-labelledby="responsive-dialog-title"
    >
      <div className="prueba">
        {title && (
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        )}
        {children && <DialogContent>{children}</DialogContent>}
      </div>
    </Dialog>
  );
};

export default Modal;
