import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import family from "../../../config/familyMembers.yml";

import { colors } from "../../../config/brand.yml";
import {
  Box,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Fade,
  Paper
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Circle from "@material-ui/icons/FiberManualRecord";
import Modal from "../Modal";

import Relative from "./Relative";
import RelativeList from "./RelativeList.jsx";
const begin = 0;
const limit = family.length;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 64px)",
    width: "100%",
    backgroundSize: "50% !important"
    // backgroundRepeat: "no-repeat !important"
  },
  card: {
    padding: 24,
    background: "rgba(255,255,255,0.85)",
    maxWidth: "95vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  copy: {
    marginBottom: 24
  },
  circle: {
    fill: colors.green,
    animation: "circle",
    animationDuration: ".5s",
    animationIterationCount: "infinite",
    animationDirection: "alternate"
  },
  btn: {
    width: 180,
    margin: "0px 10px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formRelative: {
    "@media (max-width: 550px)": {
      flexDirection: "column-reverse"
    }
  },
  avatarRelative: {
    height: 300,
    width: 150,
    margin: "0 40px 0 0",
    "& img": {
      height: "100%"
    },
    "@media (max-width: 550px)": {
      height: 200,
      margin: "16px 0"
    }
  },
  gender: {
    margin: "16px 0 24px 0",
    "& button:nth-child(1)": {
      marginRight: 8
    },
    "& button:nth-child(2)": {
      marginLeft: 8
    },
    "& .MuiButton-containedSecondary": {
      background: colors.green
    }
  }
}));
const LandingPrevenir = () => {
  const [customFamily, setCustomFamily] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [finishForm, setFinishForm] = useState(false);
  const [indexHidden, setIndexHidden] = useState(false); //Familiar oculto porque ya fue seleccionado al principio
  const [relativeStep, setRelativeStep] = useState(begin);
  // const [age, setAge] = useState();
  const [familyMembers, setFamilyMembers] = useState(family);
  const classes = useStyles();
  const reset = () => {
    setCustomFamily(false);
    setOpenModal(false);
    setFinishForm(false);
    setIndexHidden(false);
    setRelativeStep(begin);
  };
  const buttonText = (
    <>
      Siguiente<ArrowForwardIcon></ArrowForwardIcon>{" "}
    </>
  );
  const localSave = (name, object) => {
    typeof localStorage !== "undefined" &&
      localStorage.setItem(name, JSON.stringify(object));
  };
  const next = relative => {
    if (relative) {
      setCustomFamily({
        ...customFamily,
        [relative.parentesco]: { ...relative }
      });
    }
    if (familyMembers[relativeStep + 1]) {
      setRelativeStep(
        indexHidden === familyMembers[relativeStep + 1].index
          ? // si es el index del familiar oculto entonces omítelo y salta 2 pasos hacia delante
            relativeStep + 2 >= limit
            ? relativeStep
            : relativeStep + 2
          : relativeStep + 1 >= limit
          ? relativeStep
          : relativeStep + 1
      );
    } else {
      if (customFamily === false) {
        reset();
      } else {
        setFinishForm(true);
        localSave("customFamily", customFamily);
      }
    }
  };
  const back = () => {
    if (familyMembers[relativeStep - 1]) {
      setRelativeStep(
        //if
        indexHidden === familyMembers[relativeStep - 1].index
          ? // si es el index del familiar oculto entonces omítelo y salta 2 pasos hacia atrás
            relativeStep - 2 < begin
            ? relativeStep
            : relativeStep - 2
          : //else
          relativeStep - 1 < begin
          ? relativeStep
          : relativeStep - 1
      );
    } else {
      setRelativeStep(begin); // Vuelve a la plantilla que el usuario debío llenar
    }
  };
  useEffect(() => {
    if (localStorage.customFamily) {
      const saveFamily = JSON.parse(localStorage.customFamily);
      if (saveFamily === false) {
        localStorage.clear();
      } else {
        setCustomFamily(saveFamily);
        setFinishForm(true);
      }
    }
  }, []);
  let max = 24;
  let min = 5;
  let random = Math.round(Math.random() * (max - min) + min);
  if (!finishForm) {
    return (
      <div
        className={classes.root}
        style={{ background: `url(${"/img/people-happy.svg"})` }}
      >
        <Paper className={classes.card}>
          <Box className={classes.copy}>
            <Typography variant="h6" align="center">
              <Circle
                style={{ transform: "translateY(5px)" }}
                className={classes.circle}
              ></Circle>
              {random} Personas están armando su plan en este momento
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
              variant="contained"
              color="primary"
            >
              Ingresar
            </Button>
            <Modal
              open={openModal}
              title={false}
              onClose={() => setOpenModal(false)}
              maxWidth="xl"
            >
              {familyMembers.map((relative, i) => {
                return (
                  <div
                    key={i}
                    hidden={indexHidden === relative.index ? true : false}
                  >
                    <Fade timeout={1000} in={relativeStep === i ? true : false}>
                      <Box
                        style={{
                          display: relativeStep === i ? "flex" : "none"
                        }}
                      >
                        <Relative
                          parentesco={relative.parentesco}
                          sexo={relative.sexo}
                          img={relative.img}
                          index={i}
                          customFamily={customFamily}
                          setCustomFamily={setCustomFamily}
                          next={next}
                          back={back}
                          buttons
                          buttonText={buttonText}
                        ></Relative>
                      </Box>
                    </Fade>
                  </div>
                );
              })}
            </Modal>
          </Box>
          {/* <Box>
            <Typography variant="h6" align="center">
              Previsión es vivir en Paz
            </Typography>
          </Box> */}
        </Paper>
      </div>
    );
  } else {
    return (
      <RelativeList
        familyList={Object.values(customFamily)}
        customFamily={customFamily}
        setCustomFamily={setCustomFamily}
      ></RelativeList>
    );
  }
};

export default LandingPrevenir;
