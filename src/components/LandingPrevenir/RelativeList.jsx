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
    minWidth: 150,
    position: "relative",
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
      width: 50,
      height: 50,
    },
  },
  close: {
    position: "absolute",
    right: -5,
    top: -5,
    zIndex: 2,
  },
  imgContainer: {
    // height: 100,

    "& img": {
      height: 100,
    },
  },
}));
const RelativeList = ({ customFamily, setCustomFamily, limitFamily = 2 }) => {
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
      <RelativeEdit
        customFamily={customFamily}
        setCustomFamily={setCustomFamily}
        template
        limitFamily={limitFamily}
      ></RelativeEdit>
      {customFamily.map((relative, i) => {
        return (
          <RelativeEdit
            key={i}
            index={i}
            customFamily={customFamily}
            setCustomFamily={setCustomFamily}
            relative={relative}
            limitFamily={limitFamily}
          ></RelativeEdit>
        );
      })}
    </Box>
  );
};
const RelativeEdit = ({
  index,
  limitFamily,
  relative,
  template,
  customFamily,
  setCustomFamily,
}) => {
  const buttonText = (
    <>
      <SaveIcon></SaveIcon> Continuar
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
    try {
      if (typeof window !== "undefined") {
        if (window.localStorage) {
          localStorage.clear();
          if (window.localStorage.customFamily) {
            // setCustomFamily(JSON.parse(window.localStorage.customFamily));
          }
        }
      }
    } catch (error) {}
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
  let showAddFamily = true;
  if (limitFamily) {
    if (customFamily.length === limitFamily) showAddFamily = false;
  }

  return (
    <Box display="flex" flexWrap="wrap" style={{ margin: "8px 0" }}>
      <Card style={{ position: "relative", width: "100%" }}>
        {!template && (
          <IconButton
            variant="contained"
            className={classes.close}
            onClick={del}
          >
            <HighlightOffIcon style={{ color: colors.red }}></HighlightOffIcon>
          </IconButton>
        )}
        {!template ? (
          <CardActionArea
            className={`${classes.card}`}
            onClick={() => setOpenForm(true)}
          >
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
          </CardActionArea>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{ width: "100%" }}
            >
              {/* <Typography>AÑADIR FAMILIAR</Typography> */}
              <Button
                onClick={() => setOpenForm(true)}
                color="primary"
                variant="outlined"
                disabled={!showAddFamily}
                fullWidth
                style={{ width: "100% !important" }}
                startIcon={
                  showAddFamily ? (
                    <AddCircleIcon className=""></AddCircleIcon>
                  ) : (
                    ""
                  )
                }
              >
                {showAddFamily ? "añadir familiar" : "Completo"}
                {limitFamily && ` (${customFamily.length}/${limitFamily})`}
              </Button>
            </Box>
          </>
        )}
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
    </Box>
  );
};

export default RelativeList;
