import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  ButtonBase,
  MenuItem,
  Snackbar,
  SnackbarContent,
  Menu as MenuResponsive,
  Divider
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./Logo";
import Modal from "../components/Modal";
import { colors } from "../../config/brand.yml";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: "transparent",
    boxShadow: "none"
  },
  flexCenter: {
    display: "flex",
    alignItems: "center"
  },
  buttonMenu: {
    justifyContent: "flex-end"
  },
  title: {},
  phoneEmergency: {
    fontSize: "1.2em",
    marginBottom: 16
  },
  snackBar: {
    background: "#23cc79"
  }
}));
const Menu = () => {
  const [emergency, setEmergency] = useState(false);
  const [copied, setCopied] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="default" position="static">
        <Toolbar>
          <Grid container spacing={3}>
            <Grid className={classes.flexCenter} item xs={6}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              className={`${classes.flexCenter} ${classes.buttonMenu}`}
              item
              xs={6}
            >
              <Button
                onClick={() => setEmergency(!emergency)}
                variant="contained"
                color="primary"
              >
                Emergencia
              </Button>
              <Modal
                title="Atención 24/7"
                open={emergency}
                onClose={() => setEmergency(false)}
              >
                <Box>
                  <CopyToClipboard
                    text="33469191"
                    onCopy={() => setCopied(true)}
                  >
                    <Button
                      className={classes.phoneEmergency}
                      color="primary"
                      variant="outlined"
                      fullWidth={true}
                    >
                      (+591) 3-3469191
                    </Button>
                  </CopyToClipboard>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left"
                    }}
                    open={copied}
                    autoHideDuration={4000}
                    onClose={() => setCopied(false)}
                  >
                    <SnackbarContent
                      className={classes.snackBar}
                      message={<span id="message-id">Teléfono Copiado</span>}
                      action={[
                        <IconButton
                          key="close"
                          aria-label="close"
                          color="inherit"
                          className={classes.close}
                          onClick={() => setCopied(false)}
                        >
                          <CloseIcon />
                        </IconButton>
                      ]}
                    ></SnackbarContent>
                  </Snackbar>
                  <a href="tel:+59133469191">
                    <Button
                      fullWidth={true}
                      color="primary"
                      variant="contained"
                    >
                      Guardar Contacto
                    </Button>
                  </a>
                </Box>
              </Modal>
            </Grid>
            {/* <Logo></Logo> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
