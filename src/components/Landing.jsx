import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import { Grid, Box, Button, Typography } from "@material-ui/core";
import Modal from "../components/Modal";
import FormContact from "./FormContact";
const useStyles = makeStyles(theme => ({
  root: {
    height: "calc(100vh - 64px)",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    zIndex: 2,
    // color: "slategray",
    "@media (max-width: 550px)": {
      alignItems: "flex-start",
      margin: "0"
    }
  },
  landing: {
    height: "200px",
    width: "400px",
    margin: "0 0 10vw 10vw ",
    // background: "rgba(255, 255, 255, 0.7 )",
    // borderRadius: 7,
    // boxShadow: "2px 2px 3px 1px black",
    "@media (max-width: 850px)": {
      background: "none",
      boxShadow: "none",
      marginTop: 20
    },
    "@media (max-width: 550px)": {
      margin: "50px 0 0 0 "
    },
    "@media (max-width: 350px)": {
      width: "300px"
    }
  },
  flexCenter: {
    display: "flex",
    alignItems: "center"
  },
  copyWriting: {},
  btn: {
    width: 180
  },
  house: {
    position: "absolute",
    bottom: "7.5vw",
    right: 0,
    width: "40vw",
    "@media (max-width: 550px)": {
      width: "70vw",
      left: "50%",
      transform: "translateX(-45%)"
    }
  },
  valley: {
    position: "absolute",
    zIndex: -1,
    bottom: 0,
    left: 0,
    width: "100vw",
    "@media (max-width: 550px)": {
      width: "200vw",
      left: "50%",
      transform: "translateX(-45%)"
    }
  }
}));
const Landing = () => {
  const classes = useStyles();
  const [info, setInfo] = useState(false);
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.landing}>
        <Grid item xs={12} className={classes.flexCenter}>
          <Typography color="secondary" variant="h4">
            Para vivir en paz
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.flexCenter}>
          <Typography color="initial">
            Servicios funerarios y prevención nacional exequial
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.flexCenter}>
          <Link to="/">
            <Button
              className={classes.btn}
              onClick={() => setInfo(true)}
              variant="contained"
              color="primary"
            >
              Más información
            </Button>
          </Link>
          <Modal
            open={info}
            onClose={() => setInfo(false)}
            title="Siempre dispuestos a informarte"
          >
            <FormContact></FormContact>
          </Modal>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.flexCenter}>
          <Link to="/prevenir">
            <Button className={classes.btn} variant="outlined" color="default">
              Previsión
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box>
        <img
          className={classes.valley}
          src="./img/paisaje-sin-cielo.png"
          alt=""
        />
        <img className={classes.house} src="./img/casita-solita.png" alt="" />
      </Box>
    </div>
  );
};

export default Landing;

const Illustration = () => {
  return (
    <Box>
      <img src="" alt="" />
    </Box>
  );
};
