import React, { useState, useRef } from "react";
import { FacebookProvider, Comments, CommentsCount } from "react-facebook";
import { Link } from "gatsby";
import Domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import ReactPixel from "react-facebook-pixel";
import {
  Paper,
  Box,
  Typography,
  Button,
  Fab,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Back from "@material-ui/icons/ArrowBack";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import { colors } from "../../config/brand.yml";
import { siteUrl } from "../../config/defaultSeo.json";
import firstUpperCase from "../../lib/firstUpperCase";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Modal from "../components/Modal";
import CountCommentsFacebook from "../components/CountCommentsFacebook";
const useStyles = makeStyles((theme) => ({
  prev: {
    margin: 16,
  },
  funeral: {
    position: "relative",
    // boxShadow: " 10px 10px 25px 1px",
    height: "100%",
    width: "100%",
    border: `20px solid ${colors.purple}`,
  },
  foto: {
    // width: "calc(100% - 21%)",
    // height: "calc(100% - 21%)",
    width: "100%",
    height: "100%",
    backgroundSize: "100% !important",
    // boxShadow: " 10px 10px 25px 1px",
  },
  shadowFoto: {
    position: "absolute",
    top: -20,
    right: -20,
    width: "50%",
    height: "100%",
    border: "20px solid rgba(0,0,0,0.4)",
    borderLeft: "none",
  },
  decoration: {
    position: "absolute",
    bottom: -22,
    left: "54%",
    transform: "translateX(-50%)",
    width: "136.8%",
  },
  text: {
    width: 280,
    margin: "24px 0",
    padding: 16,
  },
  masse: {
    margin: "8px 0",
    // color: "white",
    paddingRight: 18,
    transition: "0.2s",
    "&:hover": {
      borderRadius: 20,
    },
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
      height: 200,
    },
  },
  shareFacebook: {
    background: "#3b5998",
    margin: "8px 0",
    color: "white",
    paddingRight: 18,
    transition: "0.2s",
    "&:hover": {
      color: "white",
      background: "#3b5998",
      borderRadius: 20,
    },
  },
  shareWhatsapp: {
    background: "#25d366",
    margin: "8px 0",
    color: "white",
    paddingRight: 18,
    transition: "0.2s",
    "&:hover": {
      color: "white",
      background: "#128c7e",
      borderRadius: 20,
    },
  },
  obituarioImg: {
    display: "flex",
    position: "relative",
    background: colors.lightBlue,
    width: "100%",
    height: "100vh",
    "@media (max-width: 550px)": {
      width: "100vw",
      height: "100vw",
    },
  },
  obituarioImgSize: {
    "@media (max-width: 550px)": {
      width: "100px !important",
      height: "100px !important",
      position: "absolute !important",
      top: 0,
      left: "5%",
    },
  },
  logoPrever: {
    zIndex: 2,
    width: 120,
    position: "absolute",
    top: 20,
    left: 80,
    transform: "rotateZ(6deg)",
    "@media (max-width: 550px)": {
      width: 80,
      top: 25,
      left: "calc(88% - 80px)",
    },
  },
  obituarioImgPaper: {
    // maxWidth: 750,

    width: 450,
    padding: 16,
    margin: "16px 0",
    "@media (max-width: 880px)": {
      width: 300,
    },
    "@media (max-width: 550px)": {
      position: "absolute !important",

      width: 150,
      "& *": {
        fontSize: "0.8em !important",
      },
    },
  },
  obituarioImgInfo: {
    "@media (max-width: 550px)": {
      top: "40%",
      width: "80vw",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },

  obituarioImgMisa: {
    "@media (max-width: 550px)": {
      top: 0,
      right: "5%",
    },
  },
  obituarioImgCallToAction: {
    background: colors.purple,

    "@media (max-width: 550px)": {
      bottom: 0,
      margin: 0,
      left: "50%",
      height: "15vw",
      width: "80vw",
      transform: "translateX(-50%)",
    },
    "& *": {
      // fontSize: "2em",
      color: "white",
    },
  },
  commentCount: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Obituario = ({ pageContext, location }) => {
  const [openMasse, setOpenMasse] = useState(false);
  const [hiddenImg, setHiddenImg] = useState({
    opacity: "0",
    transform: "scale(0)",
    position: "absolute",
    top: "-100vh",
  }); //Oculta imagen que se descargará
  const obituarioImg = useRef(null);
  let prev = location.state ? location.state.prev : "/obituarios";
  const classes = useStyles();
  const nombre = firstUpperCase(pageContext.nombre);
  const seo = {
    siteTitle: `${nombre}`,
    siteDescription: `Los familiares invitan a dejar sus condolencias ingresando aquí.`,
    siteCover: pageContext.foto ? pageContext.foto : false,
    siteUrl: `${siteUrl}/obituarios/${pageContext.fields.slug}`,
  };

  // La siguiente definición es simplemente para corregir
  // el error de URL de facebook sobre "ninita-luciana-nava-duran"
  // es una solución provisinal, el cual espero encontrar algo mejor
  const urlAbsolute = `${siteUrl}/obituarios/${
    pageContext.fields.slug == "ninita-luciana-nava-duran"
      ? "ninita:-luciana-nava-duran"
      : pageContext.fields.slug
  }`;

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
    setHiddenImg({});
    const name = nombre.replace(/ /gi, "-").toLowerCase();
    Domtoimage.toJpeg(obituarioImg.current)
      .then((blob) => {
        saveAs(blob, `prever-${name}`);
      })
      .catch((e) => {
        console.error("Hubo un error al guardar la Image");
        console.error(e);
      });
  };
  const messageShareWhatsapp = `Invitamos a dejar sus condolencias en memoria de ${pageContext.nombre}%0A%0A${urlAbsolute}`.replace(
    / /g,
    "%20"
  );
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

          {/* {pageContext.misa && (
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
          )} */}

          <Divider></Divider>
          <Typography align="center" style={{ margin: "8px 0" }}>
            <CountCommentsFacebook url={urlAbsolute} />
          </Typography>
          <a
            href="#condolencias"
            onClick={() =>
              ReactPixel.trackCustom("button", {
                type: "view",
                content: "ver condolencias",
              })
            }
          >
            <Button color="primary" variant="contained" fullWidth>
              Enviar condolencias
            </Button>
          </a>
          <Button
            onClick={() =>
              ReactPixel.trackCustom("button", {
                type: "share",
                content: "compartir whatsapp",
              })
            }
            className={classes.shareWhatsapp}
            fullWidth
            href={`whatsapp://send?text=${messageShareWhatsapp}`}
            data-text={`En memoria de ${pageContext.nombre}`}
            data-action="share/whatsapp/share"
          >
            <WhatsAppIcon size={30} /> Compartir
          </Button>
          <FacebookShareButton url={urlAbsolute}>
            <Button
              onClick={() =>
                ReactPixel.trackCustom("button", {
                  type: "share",
                  content: "compartir facebook",
                })
              }
              fullWidth
              className={classes.shareFacebook}
            >
              <FacebookIcon size={30}></FacebookIcon>
              Compartir
            </Button>
          </FacebookShareButton>

          {/* {pageContext.misa && (
            <a href="#obituarioImg">
              <Button
                variant="outlined"
                fullWidth
                style={{ margin: "8px 0" }}
                onClick={saveImage}
              >
                <ImageIcon></ImageIcon>
                Descargar
              </Button>
            </a>
          )} */}
        </Paper>
        {pageContext.afiliado && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{ width: 300, padding: 6 }}
            border={2}
            borderRadius="borderRadius"
            color={colors.purple}
          >
            <br />
            <Typography align="center">
              La celebracion de la vida, incluye la muerte.
              <br />
              La previsión mitiga el dolor de la familia.
            </Typography>
            <br />
            <Link
              to="/#planes"
              onClick={() =>
                ReactPixel.trackCustom("Button", {
                  type: "view",
                  content: "ver planes afiliados",
                })
              }
            >
              <Button color="primary" variant="outlined">
                Ver planes de previsión
              </Button>
            </Link>
            <br />
          </Box>
        )}
        <br />
        <div id="condolencias">
          <FacebookProvider language="es_LA" appId="2503959843259543">
            <Comments href={urlAbsolute} />
          </FacebookProvider>
        </div>
      </Box>
      <div style={hiddenImg}>
        <div
          className={classes.obituarioImg}
          ref={obituarioImg}
          id="obituarioImg"
        >
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            style={{ height: "100%", width: "100%" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <ObituarioImg
                foto={pageContext.foto}
                size={250}
                styleCustom={classes.obituarioImgSize}
              ></ObituarioImg>

              <img
                className={classes.logoPrever}
                src="/img/logoPrever.png"
                alt="Logo de Prever"
              ></img>
            </Box>

            <div>
              <Paper
                className={`${classes.obituarioImgPaper} ${classes.obituarioImgInfo}`}
              >
                <Typography variant="h4">{nombre}</Typography>
                <Typography gutterBottom>{pageContext.fechaFin}</Typography>
                <Typography className="epitafio">
                  {pageContext.epitafio}
                </Typography>
              </Paper>

              {pageContext.misa && (
                <Paper
                  className={`${classes.obituarioImgPaper} ${classes.obituarioImgMisa}`}
                >
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
              <Paper
                className={`${classes.obituarioImgPaper} ${classes.obituarioImgCallToAction}`}
              >
                <Box display="flex">
                  <Typography>
                    <FacebookProvider language="es_LA" appId="2503959843259543">
                      <CommentsCount href={urlAbsolute} />
                    </FacebookProvider>
                  </Typography>
                  <Typography gutterBottom style={{ marginLeft: 4 }}>
                    CONDOLENCIAS
                  </Typography>
                </Box>
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

const ObituarioImg = ({ foto, size, styleCustom }) => {
  const classes = useStyles();
  return (
    <Paper
      className={`${classes.funeral} ${styleCustom}`}
      style={{ width: size, height: size }}
    >
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
