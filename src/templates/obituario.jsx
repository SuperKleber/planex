import React, { useState, useRef } from "react";
import {
  FacebookProvider,
  Comments,
  CommentsCount,
  Like,
  Share
} from "react-facebook";
import { Link } from "gatsby";
import Domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
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
import ImageIcon from "@material-ui/icons/ImageOutlined";
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
    // boxShadow: " 10px 10px 25px 1px",
    height: "100%",
    width: "100%",
    border: `20px solid ${colors.purple}`
  },
  foto: {
    // width: "calc(100% - 21%)",
    // height: "calc(100% - 21%)",
    width: "100%",
    height: "100%",
    backgroundSize: "100% !important"
    // boxShadow: " 10px 10px 25px 1px",
  },
  shadowFoto: {
    position: "absolute",
    top: -20,
    right: -20,
    width: "50%",
    height: "100%",
    border: "20px solid rgba(0,0,0,0.4)",
    borderLeft: "none"
  },
  decoration: {
    position: "absolute",
    bottom: -22,
    left: "54%",
    transform: "translateX(-50%)",
    width: "136.8%"
  },
  text: {
    width: 280,
    margin: "24px 0",
    padding: 16
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
  },
  obituarioImg: {
    position: "relative",
    background: colors.lightBlue,
    width: 1824,
    height: 1025
  },
  logoPrever: {
    position: "absolute",
    top: 120,
    left: 120,
    transform: "rotateZ(6deg)"
  },
  obituarioImgPaper: {
    maxWidth: 750,
    padding: 16,
    margin: "16px 0",
    "& *": {
      fontSize: "2.5em"
    }
  },
  obituarioImgMisa: {
    // background: colors.green,
    maxWidth: 750,
    padding: 16,
    margin: "16px 0",
    "& *": {
      // color: "white",
      fontSize: "1.9em"
    }
  },
  obituarioImgCallToAction: {
    background: colors.purple,
    maxWidth: 500,
    padding: 16,
    margin: "16px 0",
    "& *": {
      fontSize: "2em",
      color: "white"
    }
  }
}));
const Obituario = ({ pageContext, location }) => {
  const [openMasse, setOpenMasse] = useState(false);
  const obituarioImg = useRef(null);
  let prev = location.state ? location.state.prev : "/obituarios";
  const classes = useStyles();
  const nombre = firstUpperCase(pageContext.nombre);
  const seo = {
    siteTitle: `${nombre}`,
    siteDescription: `Los familiares invitan a dejar sus condolencias ingresando aquí.`,
    siteCover: pageContext.foto ? pageContext.foto : false,
    siteUrl: `${siteUrl}/obituarios/${pageContext.fields.slug}`
  };
  const urlAbsolute = `${siteUrl}/obituarios/${pageContext.fields.slug}`;

  let fechaMisa, horaMisa, horaTraslado;
  try {
    if (pageContext.misa) {
      fechaMisa = pageContext.misa.fechaMisa;
      horaMisa = pageContext.misa.horaMisa;
      let hora = parseInt(horaMisa.split(":")[0]);
      let minuto = parseInt(horaMisa.split(":")[1]);
      let minuto30 =
        (minuto + 30) % 60 < 10 ? `0${(minuto + 30) % 60}` : (minuto + 30) % 60;
      horaTraslado =
        parseInt(horaMisa.split(":")[1]) + 30 > 59
          ? `${hora + 1}:${minuto30}`
          : `${hora}:${minuto30}`;
    }
  } catch (e) {
    fechaMisa = "";
    horaMisa = "";
    horaTraslado = "";
    console.log("Hubo un error al definir fechas y horas de evento de Misa");
  }
  const saveImage = () => {
    const name = nombre.replace(/ /gi, "-").toLowerCase();
    Domtoimage.toBlob(obituarioImg.current, { width: 1824, height: 1025 })
      .then(blob => {
        saveAs(blob, `prever-${name}`);
      })
      .catch(e => {
        console.error("Hubo un error al guardar la Image");
        console.error(e);
      });
  };
  const hiddenImg = {
    opacity: "0",
    transform: "scale(0)",
    position: "absolute",
    top: "-100vh"
  }; // Oculta la imagen que descargará
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
        <ObituarioImg foto={pageContext.foto} size={200}></ObituarioImg>
        <Paper className={classes.text}>
          <Typography variant="h4">{nombre}</Typography>
          <Typography gutterBottom>{pageContext.fechaFin}</Typography>
          <Typography>{pageContext.epitafio}</Typography>

          {pageContext.misa && (
            <>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setOpenMasse(true)}
                className={classes.masse}
              >
                Evento y horarios
              </Button>
              <Modal
                title={`Evento de Misa  ${fechaMisa}`}
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
                    <Typography variant="h5">Misa {horaMisa}</Typography>
                    <img src="/img/iglesia.svg"></img>
                    <a
                      style={{ width: "100%" }}
                      href={pageContext.misa.urlLugarMisa}
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
                    <Typography variant="h5">
                      Traslado {horaTraslado}
                    </Typography>
                    <img src="/img/traslado.svg"></img>
                    <div style={{ height: 36 }}></div>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="center"
                    className={classes.eventMasseItem}
                  >
                    <Typography variant="h5">
                      Cementerio: {pageContext.misa.lugarCementerio}
                    </Typography>
                    <img src="/img/cementerio.svg"></img>
                    <a
                      style={{ width: "100%" }}
                      href={pageContext.misa.urlLugarCementerio}
                    >
                      <Button color="secondary" fullWidth variant="contained">
                        Ver en mapa
                      </Button>
                    </a>
                  </Box>
                </Box>
              </Modal>
            </>
          )}

          <FacebookShareButton url={urlAbsolute}>
            <Button fullWidth className={classes.share}>
              <FacebookIcon size={30}></FacebookIcon>
              Compartir
            </Button>
          </FacebookShareButton>
          {pageContext.misa && (
            <Button
              variant="outlined"
              fullWidth
              style={{ margin: "8px 0" }}
              onClick={saveImage}
            >
              <ImageIcon></ImageIcon>
              Descargar
            </Button>
          )}
        </Paper>

        <FacebookProvider language="es_LA" appId="2503959843259543">
          <Comments href={urlAbsolute} />
        </FacebookProvider>
      </Box>
      <div style={hiddenImg}>
        <div ref={obituarioImg} className={classes.obituarioImg}>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <ObituarioImg foto={pageContext.foto} size={500}></ObituarioImg>

              <img
                className={classes.logoPrever}
                src="/img/logoPrever.png"
                alt="Logo de Prever"
              ></img>
            </Box>

            <div>
              <Paper className={classes.obituarioImgPaper}>
                <Typography variant="h4">{nombre}</Typography>
                <Typography gutterBottom>{pageContext.fechaFin}</Typography>
                <Typography>{pageContext.epitafio}</Typography>
              </Paper>

              {pageContext.misa && (
                <Paper className={classes.obituarioImgMisa}>
                  <Typography variant="h6" gutterBottom>
                    Velatorio:
                  </Typography>
                  <Typography variant="h6">
                    {pageContext.misa.fechaMisa}
                  </Typography>
                  <Typography variant="h6">
                    {pageContext.misa.horaMisa}
                  </Typography>
                </Paper>
              )}
              <Paper className={classes.obituarioImgCallToAction}>
                <Typography>Deja tus condolencias en:</Typography>
                <Typography>planex.com.bo/obituarios</Typography>
              </Paper>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

const ObituarioImg = ({ foto, size }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.funeral} style={{ width: size, height: size }}>
      <div
        className={classes.foto}
        style={{ background: `url(${foto})` }}
      ></div>
      <span className={classes.shadowFoto}></span>
      <img className={classes.decoration} src="/img/funeral.svg"></img>
    </Paper>
  );
};

export default Obituario;
