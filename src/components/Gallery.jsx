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
import photos from "../../config/gallery.yml";
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
      <GridList cols={2}>
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
