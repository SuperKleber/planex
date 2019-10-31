import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import familyMembers from "../../config/familyMembers.yml";
import {
  Box,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField
} from "@material-ui/core";
import Modal from "../components/Modal";
import { relative } from "path";
const limit = familyMembers.length;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 64px)",
    width: "100%"
  },
  grid: {
    display: "grid",
    maxWidth: "95vw",
    gridGap: "10px",
    height: "300px",
    gridTemplate: "1fr 2fr 1fr / 1fr 1fr 1fr",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    justifyItems: "center"
  },
  gridLeft: {
    height: "100%",
    gridRow: "1/4",
    gridColumn: "1/2",
    "& img": {
      height: "100%"
    },
    "@media (max-width: 550px)": {
      gridRow: "2/4"
    }
  },
  gridRight: {
    height: "100%",
    gridRow: "1/4",
    gridColumn: "3/4",
    "& img": {
      height: "100%"
    },
    "@media (max-width: 550px)": {
      gridRow: "2/4"
    }
  },
  gridCopy: {
    gridRow: "1/2",
    gridColumn: "1/4"
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
  }
}));
const LandingPrevenir = () => {
  const [customFamily, setCustomFamily] = useState([]);
  const [startQuestions, setStartQuestions] = useState(false);
  const [relativeStep, setRelativeStep] = useState(0);
  const [age, setAge] = useState();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.grid}>
        <Box className={classes.gridLeft}>
          <img src="./img/abuelo.png" alt="abuela" />
        </Box>
        <Box className={classes.gridCopy}>
          <Typography variant="h6" align="center">
            Piensa en un ser querido mayor que tú
          </Typography>
          <Typography variant="h5" align="center">
            ¿Cuál es su edad?
          </Typography>
        </Box>
        <Box>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="Edad"
              margin="normal"
              variant="outlined"
              onChange={e => {
                setAge(e.target.value);
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            onClick={() => setStartQuestions(true)}
            variant="contained"
            color="primary"
          >
            Prevenir
          </Button>
          <Modal
            open={startQuestions}
            title={familyMembers[relativeStep].parentesco}
          >
            <Relative
              edad={age}
              sexo={familyMembers[relativeStep].sexo}
              img={familyMembers[relativeStep].img}
              relativeStep={relativeStep}
              setRelativeStep={setRelativeStep}
            ></Relative>
          </Modal>
        </Box>
        <Box className={classes.gridRight}>
          <img src="./img/abuela.png" alt="" />
        </Box>
      </Box>
    </div>
  );
};

export default LandingPrevenir;

const Relative = ({
  parentesco,
  sexo,
  img,
  edad,
  relativeStep,
  setRelativeStep
}) => {
  //Familiar
  return (
    <form>
      <TextField
        id="standard-basic"
        label="Edad"
        margin="normal"
        variant="outlined"
        defaultValue={edad}
      />
      <TextField
        id="standard-basic"
        label="Nombres"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="standard-basic"
        label="Apellidos"
        margin="normal"
        variant="outlined"
      />
      <Button
        onClick={() =>
          setRelativeStep(
            relativeStep + 1 >= limit ? relativeStep - 1 : relativeStep + 1
          )
        }
      >
        ->
      </Button>
    </form>
  );
};
