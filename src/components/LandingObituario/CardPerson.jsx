import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { borderRadius } from "@material-ui/system";
import { Link } from "gatsby";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "../Alert";
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
      backgroundPosition: "center !important",
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
  backgroundCard: {
    height: 100,
    width: "100%",
    background: "rgb(212,254,255)",
    background:
      "linear-gradient(144deg, rgba(212,254,255,1) 0%, rgba(0,129,255,1) 100%)"
  }
}));
const CardPerson = ({ obituario }) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const { nombre, foto, fehcaInicio, fechaFin } = obituario;
  const link = `/obituarios/${obituario.fields.slug}`;
  const linkAbsolute =
    typeof window !== "undefined" && window.location.origin + link;
  const epitafio =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quod sequi necessitatibus commodi, facere sit omnis cumque voluptate doloremque facilis. Excepturi deserunt ipsa minus ducimus sed tempora odio, ";
  const epitafioLimitCharacter = 150;
  const classes = useStyles();
  const share = () => {
    if ("share" in navigator) {
      navigator
        .share({
          title: nombre,
          text: epitafio,
          url: link
        })
        .then(() => {})
        .catch(() => {});
    }
  };
  return (
    <Box className={classes.root}>
      <Link to={link}>
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
      <Card>
        <CardActionArea>
          <Link to={link}>
            <Box className={classes.backgroundCard}></Box>
            <CardContent>
              <Typography gutterBottom variant="h6">
                {nombre}
              </Typography>
              {epitafio && (
                <Typography variant="body2">
                  {epitafio.length > epitafioLimitCharacter ? (
                    <>
                      {`${epitafio.substr(0, epitafioLimitCharacter)}`}
                      <Typography color="primary">...ver más</Typography>
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
          <CopyToClipboard
            text={linkAbsolute}
            onCopy={() => setCopiedShare(true)}
          >
            <Button onClick={share} variant="contained" color="primary">
              <ShareIcon />
              Compartir
            </Button>
          </CopyToClipboard>
          <Alert
            open={copiedShare}
            message="URL copiada"
            onClose={() => setCopiedShare(false)}
          ></Alert>
          <Link to={`link`}>
            <Button>Leer más</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};
export default CardPerson;
