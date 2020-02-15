import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Paper, Button } from "@material-ui/core";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import RelativeList from "../components/LandingPrevenir/RelativeList";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    height: "calc(100vh - 64px)"
  },
  paperInfo: {
    width: "30vw",
    height: "100%",
    "& h1": {
      fontWeight: 700
    },
    "& h6": {
      //   fontSize: "0.9em"
      fontFamily: "Raleway",
      lineHeight: 1.4
    }
    // padding: 16
  }
}));
const Info = () => {
  const classes = useStyles();
  const [customFamily, setCustomFamily] = useState([]);
  const [familyList, setFamilyList] = useState([]);
  return (
    <Layout pixel={"info"}>
      <Menu></Menu>
      <Container>
        {/* <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h3" color="primary">
            PREVISIÓN EXIQUIAL
          </Typography>
        </Box> */}
        <Box
          className={classes.root}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.paperInfo}
          >
            <Box>
              <Typography color="primary" variant="h2" component="h1">
                PREVISION
              </Typography>
              <br />
              <Typography component="h6">
                En ese momento de dolor no se tiene cabeza para pensar en el
                proceso funerario.
              </Typography>
              <Typography component="h6">
                Nuestros afiliados recibirán asistencia funeraria completa de
                forma inmediata cubriendo cualquier gasto.
              </Typography>
              <br />
              <br />
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Button color="primary" variant="contained">
                  Comenzar con el plan
                </Button>
                <br />
                <Button color="primary" variant="outlined">
                  ¿Qué incluye el plan?
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <img src="/img/consuelo.svg" width={500}></img>
          </Box>
        </Box>
        {/* <RelativeList
          familyList={customFamily}
          customFamily={customFamily}
          setCustomFamily={setCustomFamily}
        ></RelativeList> */}
      </Container>
    </Layout>
  );
};

export default Info;
