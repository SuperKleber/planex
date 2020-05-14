import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  Paper,
  Typography,
  Button,
  Container,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { mergeClasses } from "@material-ui/styles";
import { colors } from "../../../config/brand.yml";
import Modal from "../Modal";
import Relative from "./Relative";
import SaveIcon from "@material-ui/icons/Save";
import FormContact from "../FormContact";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: 0,
  },
  card: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 150,
    padding: 10,
    width: "100%",
  },
  button: {
    margin: "0 10px",
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
      height: 100,
    },
  },
  close: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
  },
  imgContainer: {
    // height: 100,

    "& img": {
      height: 100,
    },
  },
}));
const RelativeList = ({ customFamily, setCustomFamily }) => {
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
      <Grid className={classes.grid} container spacing={5}>
        {customFamily.map((relative, i) => {
          return (
            <RelativeEdit
              key={i}
              index={i}
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
  index,
  relative,
  template,
  customFamily,
  setCustomFamily,
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
        img: "/img/silueta.png",
      };
  const localSave = (name, object) => {
    // typeof localStorage !== "undefined" &&
    //   localStorage.setItem(name, JSON.stringify(object));
  };
  // console.log(customFamily);
  const save = (relative, index) => {
    if (template) {
      let newCustomFamily = [
        ...customFamily,
        {
          ...relative,
        },
      ];
      setCustomFamily(newCustomFamily);
      localSave("customFamily", newCustomFamily);
      setOpenForm(false);
    } else {
      let newCustomFamily = [...customFamily];
      if (customFamily.length !== 0) {
        if (!isNaN(index)) {
          console.log("customFamily:");
          console.log(customFamily);
          console.log("BEFORE newCustomFamily:");
          console.log(newCustomFamily);
          newCustomFamily.splice(index, 1, relative);
          console.log("AFTER newCustomFamily: ");
          console.log(newCustomFamily);
        }
      }
      setCustomFamily(newCustomFamily);
      localSave("customFamily", newCustomFamily);
      setOpenForm(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        if (window.localStorage.customFamily) {
          setCustomFamily(JSON.parse(window.localStorage.customFamily));
        }
      }
    }
  }, []);

  // console.log(customFamily);
  const del = () => {
    let oldData = [...customFamily];
    let newData = [];
    console.log(oldData);
    oldData.map((el, i) => {
      i !== index && newData.push(el);
    });
    console.log(newData);
    setCustomFamily(newData);
    localSave("customFamily", newData);
  };
  return (
    <Grid
      style={{ position: "Relative" }}
      item
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={3}
    >
      <Card>
        {!template && (
          <IconButton
            variant="contained"
            className={classes.close}
            onClick={del}
          >
            <HighlightOffIcon style={{ color: colors.red }}></HighlightOffIcon>
          </IconButton>
        )}

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
          index={index}
          buttonText={buttonText}
          customFamily={customFamily}
          setCustomFamily={setCustomFamily}
        ></Relative>
      </Modal>
    </Grid>
  );
};

export default RelativeList;
