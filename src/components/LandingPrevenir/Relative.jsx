import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { colors } from "../../../config/brand.yml";
import {
  Box,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Fade,
  Popover,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ErrorIcon from "@material-ui/icons/Error";
import familyMembers from "../../../config/familyMembers.yml";
const useStyles = makeStyles((theme) => ({
  formRelative: {
    "@media (max-width: 550px)": {
      flexDirection: "column-reverse",
    },
  },
  avatarRelative: {
    height: 300,
    width: 150,
    margin: "0 40px 0 0",
    "& img": {
      height: "100%",
    },
    "@media (max-width: 550px)": {
      height: 200,
      margin: "16px 0",
    },
  },
  gender: {
    margin: "16px 0 24px 0",
    "& button:nth-child(1)": {
      marginRight: 8,
    },
    "& button:nth-child(2)": {
      marginLeft: 8,
    },
    "& .MuiButton-containedSecondary": {
      background: colors.green,
    },
  },
  buttons: {
    margin: "16px 0",
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr 1fr 2fr",
    gridGap: 3,
  },
  error: {
    padding: 10,
    background: colors.red,
    color: "white",
  },
}));
const Relative = ({
  template,
  parentesco,
  nombres,
  apellidos,
  sexo,
  img,
  edad,
  index,
  next,
  back,
  customFamily,
  setCustomFamily,
  parentescoFunc,
  buttonText,
  buttons,
}) => {
  //Familiar
  const classes = useStyles();
  const limit = familyMembers.length;
  const defaultImg = "/img/silueta.png";
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(null);
  const [relative, setRelative] = useState({
    descartado: false,
    parentesco: template ? "" : parentesco ? parentesco : "",
    edad: edad ? edad : "",
    nombres: nombres ? nombres : "",
    apellidos: apellidos ? apellidos : "",
    img: template ? defaultImg : img ? img : defaultImg,
    sexo: template ? 0 : sexo ? sexo : 0,
  });
  const open = Boolean(error);
  const errorId = open ? "simple-popover" : undefined;
  const setInput = (name, value) => {
    if (name) {
      setRelative({
        ...relative,
        [name]: value,
      });
      // setCustomFamily([{ ...relative, [name]: value }]);
    }
  };

  const saveNext = (event) => {
    if (complete) {
      next(relative, index);
    } else {
      setError(event.currentTarget);
    }
  };
  const omitted = () => {
    setRelative({ ...relative, descartado: !relative.descartado });
    if (!relative.descartado) {
      next();
    }
  };

  useEffect(() => {
    if (!relative.descartado) {
      if (
        relative.parentesco &&
        relative.nombres &&
        relative.apellidos &&
        relative.edad
      ) {
        setComplete(true);
      }
    } else {
      setComplete(true);
    }
  });

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      className={classes.formRelative}
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.avatarRelative}
      >
        <img src={relative.img} alt="" />
      </Box>
      <form>
        <Box display="flex" flexDirection="column">
          <Autocomplete
            freeSolo={template}
            disableOpenOnFocus={template}
            onChange={(e, value) => {
              if (value) {
                let newData = {
                  parentesco: value.parentesco,
                  sexo: value.sexo,
                  img: value.img,
                };
                setRelative({
                  ...relative,
                  ...newData,
                });
              } else {
                setRelative({
                  ...relative,
                  parentesco: "",
                  sexo: 0,
                  img: defaultImg,
                });
              }
              if (parentescoFunc) {
                try {
                  parentescoFunc(value.index);
                } catch (error) {
                  console.error("Error en parentescoFunc del AutoComplete");
                  console.error(error);
                  parentescoFunc(false);
                }
              }
            }}
            name="parentesco"
            options={[
              { parentesco: relative.parentesco, img: defaultImg },
              ...familyMembers,
            ]}
            value={relative}
            getOptionLabel={(relative) => relative.parentesco}
            renderInput={(params) => (
              <TextField
                placeholder="escribe el parentesco"
                disabled={relative.descartado}
                {...params}
                onChangeCapture={(e) => {
                  if (e) {
                    setRelative({
                      ...relative,
                      parentesco: e.target.value,
                    });
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Parentesco"
                variant="outlined"
                fullWidth
              />
            )}
          />

          <TextField
            disabled={relative.descartado}
            // helperText="Llena todos los campos"
            id="standard-basic"
            label="Nombres"
            margin="normal"
            variant="outlined"
            value={relative.nombres}
            onChange={(e) => setInput("nombres", e.target.value)}
          />

          <TextField
            disabled={relative.descartado}
            id="standard-basic"
            label="Apellidos"
            margin="normal"
            variant="outlined"
            value={relative.apellidos}
            onChange={(e) => setInput("apellidos", e.target.value)}
          />
          <TextField
            disabled={relative.descartado}
            id="standard-basic"
            label="Edad"
            margin="normal"
            variant="outlined"
            value={relative.edad}
            onChange={(e) => setInput("edad", e.target.value)}
          />

          {buttons ? (
            <Box
              className={classes.buttons}
              style={{ "-ms-grid-columns": "1fr 1fr 2fr" }}
            >
              <Button color="default" variant="outlined" onClick={back}>
                <ArrowBackIcon></ArrowBackIcon>
              </Button>

              <Button
                style={{
                  background: relative.descartado ? colors.red : "white",
                }}
                color="default"
                variant="outlined"
                onClick={omitted}
              >
                <HighlightOffIcon></HighlightOffIcon>
              </Button>
              <Button
                aria-describedby={errorId}
                color="primary"
                variant="contained"
                onClick={saveNext}
              >
                {buttonText}
              </Button>
            </Box>
          ) : (
            <Button
              color="primary"
              variant="contained"
              className={classes.next}
              onClick={saveNext}
              aria-describedby={errorId}
            >
              {buttonText}
            </Button>
          )}
          <Popover
            id={errorId}
            open={open}
            anchorEl={error}
            onClose={() => setError(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.error}
            >
              <ErrorIcon></ErrorIcon>
              <Typography>
                Por favor Llene todos los campos{" "}
                {buttons && "o elimine esta persona"}
              </Typography>
            </Box>
          </Popover>
        </Box>
      </form>
    </Box>
  );
};
export default Relative;
