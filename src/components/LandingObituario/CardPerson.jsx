import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Menu as Options,
  MenuItem as OptionItem,
  Chip,
} from "@material-ui/core";
import { colors } from "../../../config/brand.yml";
import CopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { borderRadius } from "@material-ui/system";
import { siteUrl } from "../../../config/defaultSeo.json";
import { Link } from "gatsby";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Alert from "../Alert";
import { FacebookProvider, CommentsCount } from "react-facebook";
import firstUpperCase from "../../../lib/firstUpperCase";
import CountCommentsFacebook from "../CountCommentsFacebook.jsx";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  card: {
    height: 370,
    // display: "flex",
    // flexDirection: "column",
    position: "relative",
  },
  cardImage: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    "& .foto": {
      backgroundPosition: "top !important",
      backgroundSize: "105% !important",
      width: 90,
      height: 90,
      top: -10,
      borderRadius: "50%",
      boxShadow: "0px 2px 7px 0.5px",
      zIndex: 3,
    },
    "& .cloud": {
      width: 250,
      top: "60%",
      transform: "translateY(-50%)",
      position: "absolute",
    },
  },
  cardActionArea: {
    // height: "calc(100% - 52px)",
    height: 318,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "initial",
    flexDirection: "column",
    width: "100%",
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    height: 175,
    paddingBottom: 8,
  },
  backgroundCard: {
    height: 100,
    width: "100%",
    background: "rgb(212,254,255)",
    background:
      "linear-gradient(144deg, rgba(212,254,255,1) 0%, rgba(0,129,255,1) 100%)",
  },
  iconFacebook: {},
  paf: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "white",
    background: colors.purple,
    padding: 8,
    borderRadius: "0 0 4px 0",
  },
}));
const CardPerson = ({ obituario }) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [elmentOption, setElementOption] = useState(null);
  const clickOption = (event) => setElementOption(event.currentTarget);
  const closeOption = (event) => setElementOption(null);
  const { nombre, foto, fechaInicio, fechaFin, epitafio, paf } = obituario;
  const prev = typeof window !== "undefined" && window.location.pathname;
  const link = `/obituarios/${obituario.fields.slug}`;
  const linkAbsolute =
    typeof window !== "undefined" && window.location.origin + link;
  const epitafioLimitCharacter = 100;
  const classes = useStyles();
  // La siguiente definición es simplemente para corregir
  // el error de URL de facebook sobre "ninita-luciana-nava-duran"
  // es una solución provisinal, el cual espero encontrar algo mejor
  const urlAbsolute = `${siteUrl}/obituarios/${
    obituario.fields.slug == "ninita-luciana-nava-duran"
      ? "ninita:-luciana-nava-duran"
      : obituario.fields.slug
  }`;
  const shareMore = () => {
    try {
      if ("share" in navigator) {
        navigator
          .share({
            title: nombre,
            text: epitafio,
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

  return (
    <FacebookProvider language="es_LA" appId="2503959843259543">
      <Box className={classes.root}>
        <Link
          to={link}
          state={{
            prev: prev,
          }}
        >
          <Box
            className={classes.cardImage}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <span
              className="foto"
              style={{ background: `url(${foto})` }}
            ></span>
            <img className="cloud" src="/img/nube-sombra.svg"></img>
          </Box>
        </Link>
        <Card className={classes.card}>
          <CardActionArea className={classes.CardActionArea}>
            <Link
              to={link}
              state={{
                prev: prev,
              }}
            >
              <Box className={classes.backgroundCard}></Box>
              <CardContent className={classes.CardContent}>
                {paf && (
                  <Box className={classes.paf}>
                    <Typography>PAF</Typography>
                  </Box>
                )}
                <Typography variant="h6">{firstUpperCase(nombre)}</Typography>
                {fechaFin && (
                  <Typography gutterBottom variant="caption" component="h6">
                    {fechaFin}
                  </Typography>
                )}
                {epitafio && (
                  <Typography variant="body2">
                    {epitafio.length > epitafioLimitCharacter ? (
                      <>
                        {`${epitafio.substr(0, epitafioLimitCharacter)}`}
                        <Typography component="span" color="primary">
                          ...ver más
                        </Typography>
                      </>
                    ) : (
                      epitafio
                    )}
                  </Typography>
                )}
              </CardContent>
            </Link>
          </CardActionArea>
          <CardActions>
            <Button onClick={clickOption} variant="contained" color="primary">
              <ShareIcon />
              Compartir
            </Button>
            <Options
              anchorEl={elmentOption}
              keepMounted
              open={Boolean(elmentOption)}
              onClose={closeOption}
            >
              <FacebookShareButton url={linkAbsolute}>
                <OptionItem>
                  <FacebookIcon
                    className={classes.iconFacebook}
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
                <OptionItem>
                  <CopyIcon></CopyIcon>
                  <Typography>Copiar URL</Typography>
                </OptionItem>
              </CopyToClipboard>
              <OptionItem onClick={shareMore}>
                <ShareIcon></ShareIcon>
                ...otros
              </OptionItem>
            </Options>
            <Alert
              open={copiedShare}
              message="URL copiada"
              onClose={() => setCopiedShare(false)}
            ></Alert>
            <Link
              to={link}
              state={{
                prev: prev,
              }}
            >
              <Button>
                <Box display="flex" className={classes.CommentsCount}>
                  <Typography style={{ marginLeft: 4 }}>
                    <CountCommentsFacebook url={urlAbsolute} />
                  </Typography>
                </Box>
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </FacebookProvider>
  );
};
export default CardPerson;
