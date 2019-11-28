import React from "react";
import {
  Grid,
  GridList,
  GridListTile,
  ListSubheader,
  Button,
  GridListTileBar,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from "@material-ui/styles";
import { Link } from "gatsby";
const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 50
  },
  title: {
    "& *": {
      color: "white"
    },
    marginBottom: 16
  }
}));
const Gallery = () => {
  const classes = useStyles();
  const photos = [
    { src: "/img/photo1.png", title: "Foto 1" },
    { src: "/img/photo2.png", title: "Foto 2" },
    { src: "/img/photo3.png", title: "Foto 3" },
    { src: "/img/photo4.png", title: "Foto 4" },
    { src: "/img/photo5.png", title: "Foto 5" }
  ];
  return (
    <Container className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={classes.title}
      >
        <Typography>Fotos del establecimiento ubicado en Santa Cruz</Typography>
        <a href="https://www.google.com/maps/place/Prever+-+Sal%C3%B3n+Velatorio/@-17.7941441,-63.16884,16z/data=!4m5!3m4!1s0x93f1e85d62ea77cb:0xfd9e12d454893aca!8m2!3d-17.7943484!4d-63.1657501">
          <Button variant="contained" color="secondary">
            Ver en mapa
          </Button>
        </a>
      </Box>
      <GridList cols={3}>
        {photos.map((photo, i) => {
          return (
            <GridListTile cols={1} key={i}>
              <img src={photo.src} alt={photo.title}></img>
              <GridListTileBar
                title={photo.title}
                subtitle="Santa Cruz | Bolivia"
              ></GridListTileBar>
            </GridListTile>
          );
        })}
      </GridList>
    </Container>
  );
};

export default Gallery;
