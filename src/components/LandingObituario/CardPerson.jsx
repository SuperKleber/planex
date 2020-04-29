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
  MenuItem as OptionItem
} from "@material-ui/core";
import CopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { borderRadius } from "@material-ui/system";
import { siteUrl } from "../../../config/defaultSeo.json";
import { Link } from "gatsby";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Alert from "../Alert";
// import { FacebookProvider, CommentsCount } from "react-facebook";
import { Disqus, CommentCount } from "gatsby-plugin-disqus";
import firstUpperCase from "../../../lib/firstUpperCase";
const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
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
      zIndex: 3
    },
    "& .cloud": {
      width: 250,
      top: "60%",
      transform: "translateY(-50%)",
      position: "absolute"
    }
  },
  cardActionArea: {
    height: "calc(100% - 52px)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "initial",
    flexDirection: "column",
    width: "100%"
  },
  CardContent: {
    // display: "flex",
    // flexDirection: "column",
    // height: "calc(100% - 100px)",
    // paddingBottom: 8
  },
  CommentsCount: {
    // marginTop: "auto"
  },
  backgroundCard: {
    height: 100,
    width: "100%",
    background: "rgb(212,254,255)",
    background:
      "linear-gradient(144deg, rgba(212,254,255,1) 0%, rgba(0,129,255,1) 100%)"
  },
  iconFacebook: {}
}));
const CardPerson = ({ obituario }) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [elmentOption, setElementOption] = useState(null);
  const clickOption = event => setElementOption(event.currentTarget);
  const closeOption = event => setElementOption(null);
  const { nombre, foto, fechaInicio, fechaFin, epitafio } = obituario;
  const prev = typeof window !== "undefined" && window.location.pathname;
  const link = `/obituarios/${obituario.fields.slug}`;
  const linkAbsolute =
    typeof window !== "undefined" && window.location.origin + link;
  const epitafioLimitCharacter = 100;
  const classes = useStyles();
  const urlAbsolute = `${siteUrl}/obituarios/${obituario.fields.slug}`;
  const shareMore = () => {
    try {
      if ("share" in navigator) {
        navigator
          .share({
            title: nombre,
            text: epitafio,
            url: link
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
  const disqusConfig = {
    url: urlAbsolute,
    identifier: obituario.id,
    title: obituario.nombre
  };
  return (
    <Box className={classes.root}>
      <Link
        to={link}
        state={{
          prev: prev
        }}
      >
        <Box
          className={classes.cardImage}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <span className="foto" style={{ background: `url(${foto})` }}></span>
          <img className="cloud" src="/img/nube-sombra.svg"></img>
        </Box>
      </Link>
      <Card style={{ height: 370 }}>
        <Link
          to={link}
          state={{
            prev: prev
          }}
        >
          <CardActionArea className={classes.cardActionArea}>
            <Box className={classes.backgroundCard}></Box>
            <CardContent className={classes.CardContent}>
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
          </CardActionArea>
        </Link>
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
              prev: prev
            }}
          >
            <Button>
              <Box display="flex" className={classes.CommentsCount}>
                <CommentCount
                  style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                  config={disqusConfig}
                  placeholder={"0 Condolencias"}
                ></CommentCount>
              </Box>
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};
export default CardPerson;
