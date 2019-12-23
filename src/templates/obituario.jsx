import React, { useState } from "react";
import { FacebookProvider, Comments, Like, Share } from "react-facebook";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import {
  Paper,
  Box,
  Typography,
  Button,
  Fab,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Back from "@material-ui/icons/ArrowBack";
import { colors } from "../../config/brand.yml";
import { siteUrl } from "../../config/defaultSeo.json";
import firstUpperCase from "../../lib/firstUpperCase";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Modal from "../components/Modal";
const useStyles = makeStyles(theme => ({
  prev: {
    margin: 16
  },
  funeral: {
    position: "relative",
    boxShadow: " 10px 10px 25px 1px",
    height: 190
  },
  foto: {
    width: 150,
    height: 150,
    backgroundSize: "100% !important",
    // boxShadow: " 10px 10px 25px 1px",
    border: `20px solid ${colors.purple}`
  },
  text: {
    width: 280,
    margin: "24px 0",
    padding: 16
  },
  shadowFoto: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 75,
    height: 150,
    border: "20px solid rgba(0,0,0,0.4)",
    borderLeft: "none"
  },
  decoration: {
    position: "absolute",
    bottom: -1,
    left: "54%",
    transform: "translateX(-50%)",
    width: 260
  },
  masse: {
    margin: "8px 0",
    // color: "white",
    paddingRight: 18,
    transition: "0.2s",
    "&:hover": {
      borderRadius: 20
    }
  },
  eventMasseItem: {
    // width: "100%",
    margin: "16px 0",
    padding: 16,
    border: "2px solid #a27400",
    borderRadius: 4,
    // borderTop: "none",
    // borderLeft: "none",
    // borderRight: "none",
    height: 300,
    "& img": {
      // width: 200,
      height: 200
    }
  },
  share: {
    background: "#3b5998",
    margin: "8px 0",
    color: "white",
    paddingRight: 18,
    transition: "0.2s",
    "&:hover": {
      color: "white",
      background: "#3b5998",
      borderRadius: 20
    }
  }
}));
const Obituario = ({ pageContext, location }) => {
  const [openMasse, setOpenMasse] = useState(false);
  let prev = location.state ? location.state.prev : "/obituarios";
  const classes = useStyles();
  const nombre = firstUpperCase(pageContext.nombre);
  const seo = {
    siteTitle: `Planex | ${nombre}`,
    siteDescription: pageContext.epitafio ? pageContext.epitafio : false,
    siteCover: pageContext.foto ? pageContext.foto : false,
    siteUrl: `${siteUrl}/obituarios/${pageContext.fields.slug}`
  };
  const urlAbsolute = `${siteUrl}/obituarios/${pageContext.fields.slug}`;
  return (
    <Layout seo={seo}>
      <Menu></Menu>
      <Link to={prev}>
        <Fab color="primary" className={classes.prev}>
          <Back></Back>
        </Fab>
      </Link>
      <Box
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box className={classes.funeral}>
          <div
            className={classes.foto}
            style={{ background: `url(${pageContext.foto})` }}
          ></div>
          {/* <img className={classes.foto} src={pageContext.foto} alt="" /> */}
          <span className={classes.shadowFoto}></span>
          <img className={classes.decoration} src="/img/funeral.svg"></img>
        </Box>
        <Paper className={classes.text}>
          <Typography variant="h4">{nombre}</Typography>
          <Typography gutterBottom>{pageContext.fechaInicio}</Typography>
          <Typography>{pageContext.epitafio}</Typography>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => setOpenMasse(true)}
            className={classes.masse}
          >
            Evento de Misa
          </Button>
          <Modal
            title="Evento de Misa  17 de mayo"
            maxWidth
            fullWidth
            open={openMasse}
            onClose={() => setOpenMasse(false)}
          >
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                className={classes.eventMasseItem}
              >
                <Typography variant="h5">Misa 1:00</Typography>
                <img src="/img/iglesia.svg"></img>
                <a
                  style={{ width: "100%" }}
                  href="https://www.google.com/maps/place/Prever+-+Sal%C3%B3n+Velatorio/@-17.7941441,-63.16884,16z/data=!4m5!3m4!1s0x93f1e85d62ea77cb:0xfd9e12d454893aca!8m2!3d-17.7943484!4d-63.1657501"
                >
                  <Button color="secondary" fullWidth variant="contained">
                    Ver en mapa
                  </Button>
                </a>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                className={classes.eventMasseItem}
              >
                <Typography variant="h5"> Traslado 1:00</Typography>
                <img src="/img/traslado.svg"></img>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                className={classes.eventMasseItem}
              >
                <Typography variant="h5"> Entierro: 1:00</Typography>
                <img src="/img/cementerio.svg"></img>
                <a
                  style={{ width: "100%" }}
                  href="https://www.google.com/maps/place/Prever+-+Sal%C3%B3n+Velatorio/@-17.7941441,-63.16884,16z/data=!4m5!3m4!1s0x93f1e85d62ea77cb:0xfd9e12d454893aca!8m2!3d-17.7943484!4d-63.1657501"
                >
                  <Button color="secondary" fullWidth variant="contained">
                    Ver en mapa
                  </Button>
                </a>
              </Box>
            </Box>
          </Modal>
          <FacebookShareButton url={urlAbsolute}>
            <Button fullWidth className={classes.share}>
              <FacebookIcon size={30}></FacebookIcon>
              Compartir
            </Button>
          </FacebookShareButton>
        </Paper>

        <FacebookProvider language="es_LA" appId="2503959843259543">
          <Comments href={urlAbsolute} />
        </FacebookProvider>
      </Box>
    </Layout>
  );
};
export default Obituario;
