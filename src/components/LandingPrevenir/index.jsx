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
import Modal from "../Modal";
import Relative from "./Relative";
import RelativeList from "./RelativeList.jsx";
const begin = -1;
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
  grid: {
    padding: "8px 24px",
    background: "rgba(255,255,255,0.85)",
    display: "grid",
    maxWidth: "95vw",
    gridGap: "10px",
    height: "300px",
    gridTemplate: "1fr 1fr 1fr / 1fr",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    justifyItems: "center"
  },
  gridCopy: {
    gridRow: "1/2",
    gridColumn: "1/2"
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
  const [customFamily, setCustomFamily] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [finishForm, setFinishForm] = useState(false);
  const [indexHidden, setIndexHidden] = useState(false); //Familiar oculto porque ya fue seleccionado al principio
  const [relativeStep, setRelativeStep] = useState(begin);
  const [age, setAge] = useState();
  const [familyMembers, setFamilyMembers] = useState(family);
  const classes = useStyles();
  const buttonText = (
    <>
      Siguiente<ArrowForwardIcon></ArrowForwardIcon>{" "}
    </>
  );
  const localSave = (name, object) => {
    typeof localStorage !== "undefined" &&
      localStorage.setItem(name, JSON.stringify(object));
  };
  const next = () => {
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
      setFinishForm(true);
      localSave("customFamily", customFamily);
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
      setCustomFamily(JSON.parse(localStorage.customFamily));
      setFinishForm(true);
    }
  }, []);
  if (!finishForm) {
    return (
      <div
        className={classes.root}
        style={{ background: `url(${"/img/people-happy.svg"})` }}
      >
        <Paper className={classes.grid}>
          <Box className={classes.gridCopy}>
            <Typography variant="h6" align="center">
              45 Personas Previnieron este mes
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
              Prevenir ahora
            </Button>
            <Modal
              open={openModal}
              title={false}
              onClose={() => setOpenModal(false)}
              // title={familyMembers[relativeStep].parentesco}
              maxWidth="xl"
              // fullWidth={true}
            >
              <Fade timeout={1000} in={true}>
                <Box
                  style={{
                    display: relativeStep === begin ? "flex" : "none"
                  }}
                >
                  <Relative
                    template
                    edad={age}
                    customFamily={customFamily}
                    parentescoFunc={index => {
                      setIndexHidden(index);
                    }}
                    setCustomFamily={setCustomFamily}
                    next={next}
                    back={back}
                    buttonText={buttonText}
                  ></Relative>
                </Box>
              </Fade>
              {familyMembers.map((relative, i) => {
                return (
                  <div
                    key={i}
                    hidden={indexHidden === relative.index ? true : false}
                  >
                    <Fade
                      timeout={1000}
                      in={
                        relativeStep === begin
                          ? false
                          : relativeStep === i
                          ? true
                          : false
                      }
                    >
                      <Box
                        style={{
                          display: !(relativeStep === begin)
                            ? relativeStep === i
                              ? "flex"
                              : "none"
                            : "none"
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
          <Box>
            <Typography variant="h6" align="center">
              Prevenir es vivir en Paz
            </Typography>
          </Box>
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
