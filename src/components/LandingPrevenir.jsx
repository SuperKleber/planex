import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import familyMembers from "../../config/familyMembers.yml";
import { colors } from "../../config/brand.yml";
import {
  Box,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Fade
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
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
  },
  formRelative: {
    animation: "render 5s"
  },
  "@keyframes render": {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  avatarRelative: {
    height: 300,
    "& img": {
      height: "100%"
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
            title={false}
            // title={familyMembers[relativeStep].parentesco}
            maxWidth="lg"
            fullWidth={true}
          >
            {familyMembers.map((relative, i) => {
              return (
                <Relative
                  parentesco={relative.parentesco}
                  edad={age}
                  sexo={relative.sexo}
                  index={i}
                  img={relative.img}
                  relativeStep={relativeStep}
                  setRelativeStep={setRelativeStep}
                ></Relative>
              );
            })}
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
  setRelativeStep,
  index
}) => {
  //Familiar
  const defaultAvatarRelative = "/img/silueta.png";
  const [gender, setGender] = useState(index === 0 ? "" : sexo ? sexo : 0); // 0 = none | 1 = Man | 2 = Woman
  const [avatarRelative, setAvatarRelative] = useState(
    index === 0 ? defaultAvatarRelative : img ? img : defaultAvatarRelative
  );
  const classes = useStyles();
  return (
    <Fade timeout={1000} in={relativeStep === index ? true : false}>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        style={{ display: relativeStep === index ? "flex" : "none" }}
      >
        <Box className={classes.avatarRelative}>
          <img src={avatarRelative} alt="" />
        </Box>
        <form>
          <Autocomplete
            // freeSolo
            // autoHightlight
            onChange={(e, relative) => {
              if (relative) {
                if (relative.sexo) {
                  setGender(relative.sexo);
                } else {
                  setGender(0);
                }
                if (relative.img) {
                  setAvatarRelative(relative.img);
                } else {
                  setAvatarRelative(defaultAvatarRelative);
                }
              } else {
                setGender(0);
                setAvatarRelative(defaultAvatarRelative);
              }
            }}
            options={familyMembers}
            defaultValue={index === 0 ? "" : familyMembers[index]}
            getOptionLabel={relative => relative.parentesco}
            renderInput={params => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true
                }}
                label="Parentesco"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Box display="flex" flexDirection="column">
            <TextField
              id="standard-basic"
              label="Edad"
              margin="normal"
              variant="outlined"
              defaultValue={index === 0 ? edad : ""}
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
            <Box display="flex" className={classes.gender}>
              <Button
                fullWidth={true}
                onClick={() => setGender(1)}
                color={gender === 1 ? "secondary" : "default"}
                variant={gender === 1 ? "contained" : "text"}
              >
                Masculino
              </Button>
              <Button
                fullWidth={true}
                onClick={() => setGender(2)}
                color={gender === 2 ? "secondary" : "default"}
                variant={gender === 2 ? "contained" : "text"}
              >
                Femenino
              </Button>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                setRelativeStep(
                  relativeStep + 1 >= limit
                    ? relativeStep - 1
                    : relativeStep + 1
                )
              }
            >
              Siguiente
              <ArrowForwardIcon></ArrowForwardIcon>
            </Button>
          </Box>
        </form>
      </Box>
    </Fade>
  );
};
