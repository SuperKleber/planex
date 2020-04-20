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
    // background: "linear-gradient(transparent, rgba(255,255,255,1))",
    background: " rgba(255,255,255,1)",
    position: "fixed",
    bottom: "0",
    zIndex: 1
  }
}));
const Menu = ({ menuFloat = true }) => {
  const [emergency, setEmergency] = useState(false);
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const message = "Hola, vengo de su sitio web, me gustaría más información.";
  const messageWhatsapp = message.replace(/ /gi, "%20");
  const messageEmergency = "¡Tengo una emergencia!";
  const messageEmergencyWhatsapp = messageEmergency.replace(/ /gi, "%20");
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
        <Toolbar style={{ padding: 0 }}>
          <Container>
            <Box
              style={{ width: "100%" }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
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
                {/* <Link to="/prevenir">
                    <MenuItem>Previsión</MenuItem>
                  </Link> */}
                <Link to="/obituarios">
                  <MenuItem>Obituarios</MenuItem>
                </Link>
                <Link to="/pagos">
                  <MenuItem>Métodos de pago</MenuItem>
                </Link>
              </MenuResponsive>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Link to="/#planes">
                  <Button
                    variant="outlined"
                    style={{ marginRight: 8 }}
                    color="primary"
                  >
                    Planes🕊️
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setEmergency(!emergency);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Emergencia
                </Button>
              </Box>
            </Box>
          </Container>
          <Modal
            title={
              <CopyToClipboard text="33469191" onCopy={() => setCopied(true)}>
                <Button fullWidth>Atención 24 horas (+591)33469191</Button>
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
              <a
                href={`https://api.whatsapp.com/send?phone=59133469191&text=${messageEmergencyWhatsapp}`}
              >
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
                <Button fullWidth={true} color="primary" variant="contained">
                  Llamar contacto
                </Button>
              </a>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
      {menuFloat && (
        <Box className={classes.menuFloat} style={{ width: "100%" }}>
          <Container>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link to="/">
                <IconButton>
                  <img src="/img/logo-mini.png" alt="Logo Prever" height="30" />
                </IconButton>
              </Link>
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
                href={`https://api.whatsapp.com/send?phone=59172145667&text=${messageWhatsapp}`}
              >
                <IconButton variant="contained">
                  <WhatsappIcon green size={35}></WhatsappIcon>
                </IconButton>
              </a>
              <a href="https://www.facebook.com/preverboliviaasistenciaexequial">
                <IconButton>
                  <FacebookIcon size={35}></FacebookIcon>
                </IconButton>
              </a>
            </Box>
          </Container>
        </Box>
      )}
    </div>
  );
};
const FacebookIcon = ({ size }) => {
  return (
    <SvgIcon
      viewBox="0 0 36 36"
      style={{ width: size ? size : "1em", height: size ? size : "1em" }}
    >
      <svg viewBox="0 0 36 36" fill="url(#jsc_s_2)">
        <defs>
          <linearGradient
            x1="50%"
            x2="50%"
            y1="97.0782153%"
            y2="0%"
            id="jsc_s_2"
          >
            <stop offset="0%" stop-color="#0062E0"></stop>
            <stop offset="100%" stop-color="#19AFFF"></stop>
          </linearGradient>
        </defs>
        <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path>
        <path
          fill="white"
          class="p361ku9c"
          d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
        ></path>
      </svg>
    </SvgIcon>
  );
};
const WhatsappIcon = ({ white, green, size }) => {
  const color = green ? "#7AD06D" : white ? "#ffffff" : "#7AD06D";
  return (
    <SvgIcon
      style={{ width: size ? size : "1em", height: size ? size : "1em" }}
      viewBox="-1 0 512 512"
    >
      <svg viewBox="-1 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m10.894531 512c-2.875 0-5.671875-1.136719-7.746093-3.234375-2.734376-2.765625-3.789063-6.78125-2.761719-10.535156l33.285156-121.546875c-20.722656-37.472656-31.648437-79.863282-31.632813-122.894532.058594-139.941406 113.941407-253.789062 253.871094-253.789062 67.871094.0273438 131.644532 26.464844 179.578125 74.433594 47.925781 47.972656 74.308594 111.742187 74.289063 179.558594-.0625 139.945312-113.945313 253.800781-253.867188 253.800781 0 0-.105468 0-.109375 0-40.871093-.015625-81.390625-9.976563-117.46875-28.84375l-124.675781 32.695312c-.914062.238281-1.84375.355469-2.761719.355469zm0 0"
          fill="#e5e5e5"
        />
        <path
          d="m10.894531 501.105469 34.46875-125.871094c-21.261719-36.839844-32.445312-78.628906-32.429687-121.441406.054687-133.933594 109.046875-242.898438 242.976562-242.898438 64.992188.027344 125.996094 25.324219 171.871094 71.238281 45.871094 45.914063 71.125 106.945313 71.101562 171.855469-.058593 133.929688-109.066406 242.910157-242.972656 242.910157-.007812 0 .003906 0 0 0h-.105468c-40.664063-.015626-80.617188-10.214844-116.105469-29.570313zm134.769531-77.75 7.378907 4.371093c31 18.398438 66.542969 28.128907 102.789062 28.148438h.078125c111.304688 0 201.898438-90.578125 201.945313-201.902344.019531-53.949218-20.964844-104.679687-59.09375-142.839844-38.132813-38.160156-88.832031-59.1875-142.777344-59.210937-111.394531 0-201.984375 90.566406-202.027344 201.886719-.015625 38.148437 10.65625 75.296875 30.875 107.445312l4.804688 7.640625-20.40625 74.5zm0 0"
          fill="#fff"
        />
        <path
          d="m19.34375 492.625 33.277344-121.519531c-20.53125-35.5625-31.324219-75.910157-31.3125-117.234375.050781-129.296875 105.273437-234.488282 234.558594-234.488282 62.75.027344 121.644531 24.449219 165.921874 68.773438 44.289063 44.324219 68.664063 103.242188 68.640626 165.898438-.054688 129.300781-105.28125 234.503906-234.550782 234.503906-.011718 0 .003906 0 0 0h-.105468c-39.253907-.015625-77.828126-9.867188-112.085938-28.539063zm0 0"
          fill="#64b161"
        />
        <g fill="#fff">
          <path d="m10.894531 501.105469 34.46875-125.871094c-21.261719-36.839844-32.445312-78.628906-32.429687-121.441406.054687-133.933594 109.046875-242.898438 242.976562-242.898438 64.992188.027344 125.996094 25.324219 171.871094 71.238281 45.871094 45.914063 71.125 106.945313 71.101562 171.855469-.058593 133.929688-109.066406 242.910157-242.972656 242.910157-.007812 0 .003906 0 0 0h-.105468c-40.664063-.015626-80.617188-10.214844-116.105469-29.570313zm134.769531-77.75 7.378907 4.371093c31 18.398438 66.542969 28.128907 102.789062 28.148438h.078125c111.304688 0 201.898438-90.578125 201.945313-201.902344.019531-53.949218-20.964844-104.679687-59.09375-142.839844-38.132813-38.160156-88.832031-59.1875-142.777344-59.210937-111.394531 0-201.984375 90.566406-202.027344 201.886719-.015625 38.148437 10.65625 75.296875 30.875 107.445312l4.804688 7.640625-20.40625 74.5zm0 0" />
          <path
            d="m195.183594 152.246094c-4.546875-10.109375-9.335938-10.3125-13.664063-10.488282-3.539062-.152343-7.589843-.144531-11.632812-.144531-4.046875 0-10.625 1.523438-16.1875 7.597657-5.566407 6.074218-21.253907 20.761718-21.253907 50.632812 0 29.875 21.757813 58.738281 24.792969 62.792969 3.035157 4.050781 42 67.308593 103.707031 91.644531 51.285157 20.226562 61.71875 16.203125 72.851563 15.191406 11.132813-1.011718 35.917969-14.6875 40.976563-28.863281 5.0625-14.175781 5.0625-26.324219 3.542968-28.867187-1.519531-2.527344-5.566406-4.046876-11.636718-7.082032-6.070313-3.035156-35.917969-17.726562-41.484376-19.75-5.566406-2.027344-9.613281-3.035156-13.660156 3.042969-4.050781 6.070313-15.675781 19.742187-19.21875 23.789063-3.542968 4.058593-7.085937 4.566406-13.15625 1.527343-6.070312-3.042969-25.625-9.449219-48.820312-30.132812-18.046875-16.089844-30.234375-35.964844-33.777344-42.042969-3.539062-6.070312-.058594-9.070312 2.667969-12.386719 4.910156-5.972656 13.148437-16.710937 15.171875-20.757812 2.023437-4.054688 1.011718-7.597657-.503906-10.636719-1.519532-3.035156-13.320313-33.058594-18.714844-45.066406zm0 0"
            fill-rule="evenodd"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
export default Menu;
