import React, { useState, useRef, useEffect } from "react";
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
  Menu as Options,
  MenuItem as OptionItem,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/Share";
import Alert from "../components/Alert.jsx";
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
import sheetdb from "sheetdb-node";
const useStyles = makeStyles((theme) => ({
  prev: {
    margin: 16,
  },
  funeral: {
    position: "relative",
    // boxShadow: " 10px 10px 25px 1px",
    height: "100%",
    width: "100%",
    // border: `20px solid ${colors.purple}`,
    borderRadius: "50%",
    "& .aro": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  foto: {
    // width: "calc(100% - 21%)",
    // height: "calc(100% - 21%)",
    width: "100%",
    height: "100%",
    backgroundSize: "100% !important",
    // boxShadow: " 10px 10px 25px 1px",

    borderRadius: "50%",
  },
  shadowFoto: {
    position: "absolute",
    top: -20,
    right: -20,
    width: "50%",
    height: "100%",
    // border: "20px solid rgba(0,0,0,0.4)",
    borderLeft: "none",
  },
  decoration: {
    position: "absolute",
    bottom: -22,
    left: "54%",
    transform: "translateX(-50%)",
    width: "136.8%",
  },
  obituarioImgText: {
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 550px)": {
      alignItems: "center",
      flexDirection: "column",
    },
  },
  text: {
    width: 280,
    // margin: "24px 0",
    padding: "0 16px",
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
    color: "white",
    cursor: "pointer",
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  shareWhatsapp: {
    background: "#25d366",
    // margin: "8px 0",
    color: "white",
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  noPhone: {
    "@media (min-width: 550px)": {
      display: "none !important",
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
  nombrePremium: {
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontWeight: "bold",
    "-webkit-margin-before": "0.3em",
    "-webkit-margin-after": "0.2em",
    backgroundImage: "-webkit-linear-gradient(#d4cc4a 45%, #9A8000 75%)",
    textShadow:
      "1px 1px 0 rgba(0, 0, 0, 0.09),-1px -1px 0 rgba(255, 220, 0, 0.670)",
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
  goldenButton: {
    width: "100%",
    display: "inline-block",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "1em",
    boxSizing: "border-box",
    border: "none",
    borderRadius: ".3em",
    // height: "2.75em",
    height: "36px",
    lineHeight: "2.5em",
    textTransform: "uppercase",
    padding: "0 1em",
    boxShadow:
      "0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(110,80,20,.4),inset 0 -2px 5px 1px rgba(139,66,8,1), inset 0 -1px 1px 3px rgba(250,227,133,1)",
    backgroundImage:
      "linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07)",
    border: "1px solid #a55d07",
    color: "rgb(120,50,5)",
    textShadow: "0 2px 2px rgba(250, 227, 133, 1)",
    cursor: "pointer",
    transition: "all .2s ease-in-out",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    "&:hover": {
      backgroundSize: "150% 150%",
      boxShadow:
        "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23), inset 0 -2px 5px 1px #b17d10,inset 0 -1px 1px 3px rgba(250,227,133,1)",
      border: "1px solid rgba(165,93,7,.6)",
      color: "rgba(120,50,5,.8)",
    },
    "&:active": {
      boxShadow:
        "0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(110,80,20,.4), inset 0 -2px 5px 1px #b17d10, inset 0 -1px 1px 3px rgba(250,227,133,1)",
    },
  },
}));
const Obituario = ({ pageContext, location }) => {
  const [openMasse, setOpenMasse] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);
  const [hiddenImg, setHiddenImg] = useState({
    opacity: "0",
    transform: "scale(0)",
    position: "absolute",
    top: "-100vh",
  }); //Oculta imagen que se descargará
  const [copiedShare, setCopiedShare] = useState(false);
  const [elmentOption, setElementOption] = useState(null);
  const clickOption = (event) => setElementOption(event.currentTarget);
  const closeOption = (event) => setElementOption(null);

  const obituarioImg = useRef(null);
  let prev = (location.state && location.state.prev) || "/obituarios";
  const classes = useStyles();
  const nombre = firstUpperCase(pageContext.nombre || "");
  const seo = {
    siteTitle: `${nombre}`,
    siteDescription: `Los familiares invitan a dejar sus condolencias ingresando aquí.`,
    siteCover: pageContext.foto
      ? pageContext.foto
      : "/uploads/avatar-prever.png",
    siteUrl: `${siteUrl}/obituarios/${pageContext.slug}`,
  };

  // La siguiente definición es simplemente para corregir
  // el error de URL de facebook sobre "ninita-luciana-nava-duran"
  // es una solución provisinal, el cual espero encontrar algo mejor
  const urlAbsolute = `${siteUrl}/obituarios/${
    pageContext.slug == "ninita-luciana-nava-duran"
      ? "ninita:-luciana-nava-duran"
      : pageContext.slug
  }`;
  const link = `/obituarios/${pageContext.slug}`;
  const linkAbsolute =
    typeof window !== "undefined" && window.location.origin + link;

  const messageShareWhatsapp = `Invitamos a dejar sus condolencias en memoria de *${pageContext.nombre}*%0A%0A_${pageContext.epitafio}_%0A%0A${urlAbsolute}`.replace(
    / /g,
    "%20"
  );
  const shareMore = () => {
    try {
      if ("share" in navigator) {
        navigator
          .share({
            title: pageContext.nombre,
            text: messageShareWhatsapp,
            url: link,
          })
          .then(() => {})
          .catch(() => {});
      } else {
        console.warn("Este Navegador no soporta la opción de compartir");
      }
    } catch (error) {
      console.warn("Este Navegador no soporta la opción de compartir");
      console.warn(error);
    }
  };
  let fechaMisa, horaMisa, horaTraslado;
  try {
    if (pageContext.misa) {
      fechaMisa = pageContext.misa.fechaMisa;
      horaMisa = pageContext.misa.horaMisa;
      let hora = parseInt(horaMisa.split(":")[0]);
      let minuto = parseInt(horaMisa.split(":")[1]);
      let minuto30 =
        (minuto + 30) % 60 < 10 ? `0${(minuto + 30) % 60}` : (minuto + 30) % 60;
      horaTraslado = horaMisa
        ? parseInt(horaMisa.split(":")[1]) + 30 > 59
          ? `${hora + 1}:${minuto30}`
          : `${hora}:${minuto30}`
        : false;
    }
  } catch (e) {
    fechaMisa = "";
    horaMisa = "";
    horaTraslado = "";
    console.log("Hubo un error al definir fechas y horas de evento de Misa");
  }
  let premium = false;
  if (pageContext.fechaPremium) {
    const now = new Date();
    const datePremium = new Date(
      `${pageContext.fechaPremium.split("/")[2]}-${
        pageContext.fechaPremium.split("/")[1]
      }-${pageContext.fechaPremium.split("/")[0]}`
    );
    if (datePremium >= now) {
      premium = true;
    }
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

  let youtube = false;
  try {
    youtube =
      pageContext.urlYoutubePremium &&
      pageContext.urlYoutubePremium.indexOf("youtu.be") != -1
        ? pageContext.urlYoutubePremium.split("youtu.be/")[1]
        : pageContext.urlYoutubePremium.indexOf("watch?v=") != -1
        ? pageContext.urlYoutubePremium.split("watch?v=")[1]
        : pageContext.urlYoutubePremium.indexOf("embed/") != -1
        ? pageContext.urlYoutubePremium.split("embed/")[1]
        : false;
  } catch (error) {
    console.log(`pageContext.urlYoutubePremium:`);
    console.log(pageContext.urlYoutubePremium);
    console.log(`Youtube: ${youtube}`);
    // console.error(error)
  }
  useEffect(() => {
    let config = {
      address: "rhe5m5nrm1lfr",
    };
    let client = sheetdb(config);
    client.read().then((data) => {
      // console.log(data);
    });
  }, []);
  return (
    <Layout seo={seo}>
      <Menu></Menu>
      {premium && (
        <div className={classes.decorationPremium}>
          <img
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "30vw",
              maxWidth: "40vh",
              zIndex: -1,
            }}
            src="/img/flores.png"
            alt=""
          />
          <img
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "30vw",
              maxWidth: "40vh",
              transform: "rotate(90deg)",
              zIndex: -1,
            }}
            src="/img/flores.png"
            alt=""
          />
          <img
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "30vw",
              maxWidth: "40vh",
              // transform: "rotate(180deg)",
              zIndex: -1,
            }}
            src="/img/flores2.png"
            alt=""
          />
          <img
            style={{
              position: "absolute",
              bottom: -25,
              left: 30,
              width: "30vw",
              maxWidth: "40vh",
              transform: "rotate(90deg)",
              zIndex: -1,
            }}
            src="/img/flores2.png"
            alt=""
          />
        </div>
      )}
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
        <div className={classes.obituarioImgText}>
          <ObituarioImg
            foto={pageContext.foto || "/uploads/avatar-prever.png"}
            size={200}
            premium={premium}
          ></ObituarioImg>
          <div className={classes.text}>
            <Typography
              className={premium ? classes.nombrePremium : ""}
              data-heading={nombre}
              variant="h5"
              style={{ fontWeight: "bold" }}
            >
              {nombre}
            </Typography>
            <Typography gutterBottom style={{ fontSize: "0.7em" }}>
              {pageContext.fechaFin}
            </Typography>
            <Typography style={{ fontStyle: "italic", fontSize: "1em" }}>
              {pageContext.epitafio}
            </Typography>
            {premium && (
              <>
                <br />
                <button
                  onClick={() => setOpenPremium(true)}
                  className={classes.goldenButton}
                >
                  <Typography>Ver dedicatoria y video</Typography>
                </button>
                <Modal
                  maxWidth
                  fullWidth
                  open={openPremium}
                  onClose={() => setOpenPremium(false)}
                  title="Dedicatoria"
                  style={{ backgroundImage: "url('/img/sky.png')" }}
                >
                  {pageContext.urlYoutubePremium && youtube && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",

                        width: "100%",
                        // minHeight: heightScale,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          paddingBottom: "56.25%",
                        }}
                      >
                        <iframe
                          style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            boxShadow: "flat",
                            width: "100%",
                            height: "100%",
                            border: 0,
                            borderRadius: 16,
                            boxShadow: "0 0 4px black",
                          }}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          src={`https://www.youtube.com/embed/${youtube}`}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                  <br />
                  {pageContext.dedicatoriaPremium && (
                    <Typography style={{ fontStyle: "italic" }}>
                      {pageContext.dedicatoriaPremium}
                    </Typography>
                  )}
                  <br />
                </Modal>
              </>
            )}
            {pageContext.misa && pageContext.misa.fechaMisa && (
              <>
                <Button
                  variant={premium ? "outlined" : "contained"}
                  color="primary"
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
                  closeButton
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
                      <Typography variant="h5">
                        Misa {horaMisa || ""}
                      </Typography>
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
                    {horaTraslado && (
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
                    )}
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

            {/* <Divider></Divider>
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
            </FacebookShareButton> */}

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
          </div>
        </div>

        <br />
        <Divider style={{ minWidth: 300, maxWidth: 550, width: "100%" }} />
        <br />
        <Box
          style={{
            width: "84%",
            maxWidth: 550,
            minWidth: 300,
            marginBottom: 8,
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Condolencias</Typography>
          <Button
            onClick={clickOption}
            style={{
              padding: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
            }}
          >
            Compartir
            {/* <FacebookShareButton
              url={urlAbsolute}
              style={{
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <FacebookIcon
                onClick={() =>
                  ReactPixel.trackCustom("button", {
                    type: "share",
                    content: "compartir facebook",
                  })
                }
                className={classes.shareFacebook}
                size={30}
              ></FacebookIcon>
            </FacebookShareButton>
            <a
              href={`whatsapp://send?text=${messageShareWhatsapp}`}
              data-text={`En memoria de ${pageContext.nombre}`}
              data-action="share/whatsapp/share"
              onClick={() =>
                ReactPixel.trackCustom("button", {
                  type: "share",
                  content: "compartir whatsapp",
                })
              }
              className={classes.shareWhatsapp}
            >
              <WhatsAppIcon size={30} />
            </a> */}
          </Button>
          <Options
            anchorEl={elmentOption}
            keepMounted
            open={Boolean(elmentOption)}
            onClose={closeOption}
          >
            <FacebookShareButton url={linkAbsolute}>
              <OptionItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FacebookIcon
                  className={classes.shareFacebook}
                  size={25}
                  round
                ></FacebookIcon>
                <Typography>Facebook</Typography>
              </OptionItem>
            </FacebookShareButton>
            <CopyToClipboard
              text={linkAbsolute}
              onCopy={() => setCopiedShare(true)}
            >
              <OptionItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CopyIcon></CopyIcon>
                <Typography>Copiar URL</Typography>
              </OptionItem>
            </CopyToClipboard>
            <a
              className={classes.noPhone}
              href={`whatsapp://send?text=${messageShareWhatsapp}`}
              data-text={`En memoria de ${nombre}`}
              data-action="share/whatsapp/share"
            >
              <OptionItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className={classes.shareWhatsapp}>
                  <WhatsAppIcon size={30} />
                </span>
                Whatsapp
              </OptionItem>
            </a>
            <OptionItem
              className={classes.noPhone}
              onClick={shareMore}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ShareIcon></ShareIcon>
              ...otros
            </OptionItem>
          </Options>

          <Alert
            open={copiedShare}
            message="URL copiada"
            onClose={() => setCopiedShare(false)}
          ></Alert>
        </Box>

        <Paper
          style={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "84%",
            maxWidth: 550,
            minWidth: 300,
          }}
        >
          <br />
          <Typography variant="caption" align="center" style={{ padding: 4 }}>
            {/* La celebracion de la vida, incluye la muerte.
              <br /> */}
            La previsión mitiga el dolor a la familia.
          </Typography>
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
        </Paper>

        <br />
        <Divider style={{ minWidth: 300, maxWidth: 550, width: "100%" }} />
        <br />
        <Paper id="condolencias">
          <FacebookProvider language="es_LA" appId="2503959843259543">
            <Comments href={urlAbsolute} />
          </FacebookProvider>
        </Paper>
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
                  {pageContext.misa.horaMisa && (
                    <Typography variant="h6">
                      {pageContext.misa.horaMisa.length > 1
                        ? pageContext.misa.horaMisa.replace("-", ":")
                        : ""}
                    </Typography>
                  )}
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
      <style jsx="true" global="true">{`
        body {
          background: url("/img/cielo.jpg") !important;
          background-attachment: fixed !important;
        }
      `}</style>
    </Layout>
  );
};

const ObituarioImg = ({ foto, size, styleCustom, premium }) => {
  const classes = useStyles();
  return (
    <Paper
      className={`${classes.funeral} ${styleCustom}`}
      style={{ width: size, height: size, marginBottom: 16 }}
    >
      <div
        className={classes.foto}
        style={{ background: `url(${foto})` }}
      ></div>
      {premium && <img className="aro" src="/img/aro-oro.png" alt="" />}
      {/* <span className={classes.shadowFoto}></span> */}
      {/* <img className={classes.decoration} src="/img/funeral.svg"></img> */}
    </Paper>
  );
};

export default Obituario;
