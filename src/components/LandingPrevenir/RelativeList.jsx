import React, { useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  Paper,
  Typography,
  Button,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { mergeClasses } from "@material-ui/styles";
import { colors } from "../../../config/brand.yml";
import Modal from "../Modal";
import Relative from "./Relative";
import SaveIcon from "@material-ui/icons/Save";
import FormContact from "../FormContact";
const useStyles = makeStyles(theme => ({
  grid: {
    width: "100%",
    margin: 0
  },
  card: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 150,
    padding: 10,
    width: "100%"
  },
  button: {
    margin: "0 10px"
  },
  add: {
    width: "100%",
    height: "100%",
    border: `2px solid ${colors.green}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "& .addIcon": {
      color: colors.green,
      width: 100,
      height: 100
    }
  },
  imgContainer: {
    // height: 100,

    "& img": {
      height: 100
    }
  }
}));
const RelativeList = ({ familyList, customFamily, setCustomFamily }) => {
  const classes = useStyles();
  const [openWarning, setOpenWarning] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const reset = () => {
    typeof localStorage !== "undefined" && localStorage.clear();
    typeof window !== "undefined" && window.location.reload();
  };
  const closeWarning = () => {
    setOpenWarning(false);
  };
  return (
    <Box>
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            Previsión
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => setOpenWarning(true)}
          >
            Eliminar
          </Button>
        </Box>
        <Modal
          open={openWarning}
          onClose={closeWarning}
          title="Se reiniciará todos los datos que ha guardado ¿Seguro que quiere eliminar todo?"
        >
          <Box width={220} display="flex" justifyContent="space-between">
            <Button
              onClick={() => {
                closeWarning();
                reset();
              }}
              variant="outlined"
              color="secondary"
            >
              Eliminar
            </Button>
            <Button onClick={closeWarning} variant="outlined">
              Cancelar
            </Button>
          </Box>
        </Modal>
        <Modal
          title="Llene sus datos"
          open={openForm}
          onClose={() => setOpenForm(false)}
        >
          <FormContact></FormContact>
        </Modal>
      </Container>
      <Grid className={classes.grid} container spacing={5}>
        {familyList.map(relative => {
          return (
            <RelativeEdit
              customFamily={customFamily}
              setCustomFamily={setCustomFamily}
              relative={relative}
            ></RelativeEdit>
          );
        })}
        <RelativeEdit
          customFamily={customFamily}
          setCustomFamily={setCustomFamily}
          template
        ></RelativeEdit>
      </Grid>
    </Box>
  );
};
const RelativeEdit = ({
  relative,
  template,
  customFamily,
  setCustomFamily
}) => {
  const buttonText = (
    <>
      <SaveIcon></SaveIcon> Guardar
    </>
  );
  const classes = useStyles();
  const [openForm, setOpenForm] = useState(false);
  const { parentesco, nombres, apellidos, edad, img } = !template
    ? relative
    : {
        parentesco: "",
        nombres: "",
        apellidos: "",
        edad: "",
        img: "/img/silueta.png"
      };
  const localSave = (name, object) => {
    typeof localStorage !== "undefined" &&
      localStorage.setItem(name, JSON.stringify(object));
  };
  const save = relative => {
    let newCustomFamily = {
      ...customFamily,
      [relative.parentesco]: { ...relative }
    };
    setCustomFamily({ newCustomFamily });
    localSave("customFamily", newCustomFamily);
    setOpenForm(false);
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <CardActionArea
          className={`${classes.card} ${template && classes.add}`}
          onClick={() => setOpenForm(true)}
        >
          {!template ? (
            <>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                className={classes.imgContainer}
              >
                <img src={img} alt="" />
                <Typography>{parentesco}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                // alignItems="center"
              >
                <Typography>{edad} años</Typography>
                <Typography>{nombres}</Typography>
                <Typography>{apellidos}</Typography>
              </Box>
            </>
          ) : (
            <AddCircleIcon className="addIcon"></AddCircleIcon>
          )}
        </CardActionArea>
      </Card>
      <Modal open={openForm} onClose={() => setOpenForm(false)} maxWidth="xl">
        <Relative
          template={template}
          parentesco={parentesco}
          nombres={nombres}
          apellidos={apellidos}
          edad={edad}
          img={img}
          next={save}
          buttonText={buttonText}
          customFamily={customFamily}
          setCustomFamily={setCustomFamily}
        ></Relative>
      </Modal>
    </Grid>
  );
};

export default RelativeList;
