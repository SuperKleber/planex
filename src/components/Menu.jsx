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
  Divider,
  SvgIcon,
  Container
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./Logo";
import Modal from "../components/Modal";
import { colors } from "../../config/brand.yml";
import { Link } from "gatsby";
import Alert from "./Alert";
import ReactPixel from "react-facebook-pixel";
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
  whatsapp: {
    color: "#075e54",
    borderColor: "#075e54",
    fontSize: "1.2em",
    marginBottom: 16
  },
  menuFloat: {
    position: "fixed",
    bottom: "5vh",
    zIndex: 1
  }
}));
const Menu = ({ menuFloat = true }) => {
  const [emergency, setEmergency] = useState(false);
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="default" position="static">
        <Toolbar>
          <Container>
            <Grid container spacing={3}>
              <Grid className={classes.flexCenter} item xs={6}>
                <IconButton
                  onClick={handleClick}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>

                <MenuResponsive
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="/">
                    <MenuItem>Inicio</MenuItem>
                  </Link>
                  <Link to="/prevenir">
                    <MenuItem>Previsión</MenuItem>
                  </Link>
                  <Link to="obituarios">
                    <MenuItem>Obituarios</MenuItem>
                  </Link>
                </MenuResponsive>
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
                  title={
                    <CopyToClipboard
                      text="33469191"
                      onCopy={() => setCopied(true)}
                    >
                      <Button fullWidth>
                        {" "}
                        Atención 24 horas (+591)33469191
                      </Button>
                    </CopyToClipboard>
                  }
                  open={emergency}
                  onClose={() => setEmergency(false)}
                  closeButton
                >
                  <Box>
                    <Alert
                      open={copied}
                      message="Teléfono Copiado"
                      onClose={() => setCopied(false)}
                    ></Alert>
                    <a href="https://api.whatsapp.com/send?phone=59133469191&text=%C2%A1Tengo%20una%20Emergencia!">
                      <Button
                        className={classes.whatsapp}
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                      >
                        <WhatsappIcon></WhatsappIcon>
                        +591-33469191
                      </Button>
                    </a>
                    <a href="tel:33469191">
                      <Button
                        fullWidth={true}
                        color="primary"
                        variant="contained"
                      >
                        Llamar contacto
                      </Button>
                    </a>
                  </Box>
                </Modal>
              </Grid>
              {/* <Logo></Logo> */}
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      {menuFloat && (
        <Box className={classes.menuFloat} style={{ width: "100%" }}>
          <Container>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              {/* <Link to="/">
                <Button variant="contained" style={{ background: "white" }}>
                  <img src="/img/logo.png" alt="Logo Prever" height="45" />
                </Button>
              </Link> */}
              <a
                onClick={() =>
                  ReactPixel.track("Contact", {
                    type: "whatsapp",
                    num: "72145667",
                    description: "planes de previsión",
                    textButton: "logo de whatsapp"
                  })
                }
                target="_black"
                href="https://api.whatsapp.com/send?phone=59172145667&text=Buenas,%20vengo%20de%20su%20sitio%20web."
              >
                <Button
                  variant="contained"
                  style={{ background: "#7AD06D", height: 57 }}
                >
                  <WhatsappIcon white size={28}></WhatsappIcon>
                </Button>
              </a>
            </Box>
          </Container>
        </Box>
      )}
    </div>
  );
};
const WhatsappIcon = ({ white, green, size }) => {
  const color = green ? "#7AD06D" : white ? "#ffffff" : "#7AD06D";
  return (
    <SvgIcon
      style={{ width: size ? size : "1em", height: size ? size : "1em" }}
      viewBox="0 0 418.135 418.135"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 418.135 418.135"
        style={{
          enableBackground: "new 0 0 418.135 418.135"
        }}
        xmlSpace="preserve"
      >
        <g>
          <path
            style={{ fill: color }}
            d="M198.929,0.242C88.5,5.5,1.356,97.466,1.691,208.02c0.102,33.672,8.231,65.454,22.571,93.536
L2.245,408.429c-1.191,5.781,4.023,10.843,9.766,9.483l104.723-24.811c26.905,13.402,57.125,21.143,89.108,21.631
c112.869,1.724,206.982-87.897,210.5-200.724C420.113,93.065,320.295-5.538,198.929,0.242z M323.886,322.197
c-30.669,30.669-71.446,47.559-114.818,47.559c-25.396,0-49.71-5.698-72.269-16.935l-14.584-7.265l-64.206,15.212l13.515-65.607
l-7.185-14.07c-11.711-22.935-17.649-47.736-17.649-73.713c0-43.373,16.89-84.149,47.559-114.819
c30.395-30.395,71.837-47.56,114.822-47.56C252.443,45,293.218,61.89,323.887,92.558c30.669,30.669,47.559,71.445,47.56,114.817
C371.446,250.361,354.281,291.803,323.886,322.197z"
          />
          <path
            style={{ fill: color }}
            d="M309.712,252.351l-40.169-11.534c-5.281-1.516-10.968-0.018-14.816,3.903l-9.823,10.008
c-4.142,4.22-10.427,5.576-15.909,3.358c-19.002-7.69-58.974-43.23-69.182-61.007c-2.945-5.128-2.458-11.539,1.158-16.218
l8.576-11.095c3.36-4.347,4.069-10.185,1.847-15.21l-16.9-38.223c-4.048-9.155-15.747-11.82-23.39-5.356
c-11.211,9.482-24.513,23.891-26.13,39.854c-2.851,28.144,9.219,63.622,54.862,106.222c52.73,49.215,94.956,55.717,122.449,49.057
c15.594-3.777,28.056-18.919,35.921-31.317C323.568,266.34,319.334,255.114,309.712,252.351z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </SvgIcon>
  );
};
export default Menu;
