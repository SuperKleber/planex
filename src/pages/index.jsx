import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader
} from "@material-ui/core";
import { colors } from "../../config/brand.yml";
import Layout from "../components/Layout";
import FormPlanex from "../components/FormPlanex";
import Menu from "../components/Menu";
import RelativeList from "../components/LandingPrevenir/RelativeList";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import ConfirmLead from "../components/ConfirmLead";
import ReactPixel from "react-facebook-pixel";
const useStyles = makeStyles(() => ({
  landing: {
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "@media (max-width: 850px)": {
      flexDirection: "column",
      justifyContent: "space-center",
      alignItems: "center",
      "& img": {
        height: "50%",
        width: "auto"
      }
    }
    // width: "100%"
  },
  paperInfo: {
    width: "35vw",
    height: "100%",
    "& h1": {
      fontSize: "3em",
      fontWeight: 700
    },
    "& h6": {
      //   fontSize: "0.9em"
      fontFamily: "Raleway",
      lineHeight: 1.4
    },
    "@media (max-width: 850px)": {
      width: "100%"
    }
  },
  planes: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexWrap: "wrap",
    "@media (max-width: 850px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  plan: {
    margin: 16,
    "& nav": {
      width: 300,
      borderRadius: 4
    }
  },
  listItem: {
    height: 70
  },
  listHeader: {
    position: "relative",

    borderRadius: 4,
    background: colors.purple,
    padding: 8,
    color: "white",
    "& h6": {
      letterSpacing: 4
    },
    "& img": {
      background: "white",
      padding: "8px 8px 8px 8px",
      borderRadius: "50%",
      position: "absolute",
      top: -14,
      right: -15,
      border: `4px solid ${colors.purple}`
    }
  }
}));
const Info = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [lead, setLead] = useState(false);
  const [initialPlan, setInitialPlan] = useState("ruby");
  const listRuby = [
    {
      icon: "/img/velatorio.svg",
      text: "Salón Velatorio o Domicilio"
    },

    {
      icon: "/img/transporte.svg",
      text: "Transporte funerario"
    },
    {
      icon: "/img/necrologico-virtual.svg",
      text: "Necrológico virtual"
    },
    // {
    //   icon: "/img/formol.svg",
    //   text: "Servicio de formolización"
    // },
    {
      icon: "/img/ataud.svg",
      text: "Cofre para Inhumación"
    }
  ];
  const listSilver = [
    ...listRuby,
    {
      icon: "/img/cremacion.svg",
      text: "Espacio en cementerio o Cremación"
    }
  ];
  const listGold = [
    ...listSilver,
    { icon: "/img/crown.svg", text: "Servicio de Repatriación" }
  ];
  return (
    <Layout pixel={"info"}>
      <Menu></Menu>
      <Container>
        <Box className={classes.landing}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.paperInfo}
          >
            <Box style={{ width: "100%" }}>
              <Typography color="primary" variant="h2" component="h1">
                PREVISION
              </Typography>
              <br />
              <Typography component="h6">
                En ese momento de dolor no se tiene cabeza para pensar en el
                proceso funerario.
              </Typography>
              <Typography component="h6">
                Es el primer plan desarrollado en el país con cobertura
                nacional, destinada a satisfacer todas las eventualidades ante
                el fallecimiento de un afiliado.
              </Typography>
              <br />
              <br />
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setOpenModal(true);
                    setInitialPlan("ruby");
                  }}
                >
                  Comenzar con el plan
                </Button>
                <br />
                <a href="#planes" style={{ width: "100%" }}>
                  <Button color="primary" variant="outlined" fullWidth>
                    ¿Qué incluye el plan?
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
          <img src="/img/consuelo.svg" width={500}></img>
        </Box>
        <Box className={classes.planes} id="planes">
          <Plan
            onClick={() => setOpenModal(true)}
            title="RUBY"
            list={listRuby}
            pricing={100}
            icon="/img/ruby.svg"
            setInitialPlan={setInitialPlan}
          ></Plan>
          <Plan
            onClick={() => setOpenModal(true)}
            title="SILVER"
            list={listSilver}
            pricing={120}
            icon="/img/lingote-de-plata.svg"
            setInitialPlan={setInitialPlan}
          ></Plan>
          <Plan
            onClick={() => setOpenModal(true)}
            title="GOLD"
            list={listGold}
            pricing={150}
            icon="/img/lingote-de-oro.svg"
            setInitialPlan={setInitialPlan}
          ></Plan>
        </Box>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={
            !lead
              ? "📋 Te llevamos el contrato a la puerta de tu casa sin costo"
              : "✅ Procesamos tu solicitud, pronto sabrás de nosotros"
          }
        >
          {
            <FormPlanex
              initialPlan={initialPlan}
              lead={lead}
              setLead={setLead}
            ></FormPlanex>
          }
        </Modal>
      </Container>
    </Layout>
  );
};

const Plan = ({
  title,
  pricing,
  icon,
  list,
  focus,
  onClick,
  setInitialPlan
}) => {
  const classes = useStyles();
  const Item = ({ icon, text, end }) => (
    <>
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <img src={icon} width={25}></img>
        </ListItemIcon>
        <ListItemText primary={text}></ListItemText>
      </ListItem>
      {!end && <Divider></Divider>}
    </>
  );
  const ListHeader = () => (
    <Box
      className={classes.listHeader}
      display="flex"
      justifyContent="space-between"
    >
      <Box
        style={{ width: "100%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h6">{title}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            {pricing ? (
              <>
                <Typography>Bs</Typography>
                <Typography
                  style={{
                    padding: 8,
                    borderRadius: 4,
                    marginRight: 8
                  }}
                  variant="h4"
                >
                  {pricing}
                </Typography>
              </>
            ) : (
              <Typography variant="h4">Contáctanos</Typography>
            )}
          </Box>
          <Box>
            <Typography gutterBottom>x 7 personas x mes</Typography>
          </Box>
        </Box>
      </Box>
      <img src={icon} width={40}></img>
    </Box>
  );
  const focusStyle = { transform: "scale(1.1)", boxShadow: "0 0 20px 4px" };
  return (
    <Box className={classes.plan}>
      <Paper style={{ width: 300 }} style={focus ? { ...focusStyle } : {}}>
        <List component="nav" subheader={<ListHeader></ListHeader>}>
          {list.map(({ icon, text }, i) => (
            <Item key={i} icon={icon} text={text}></Item>
          ))}

          <ListItem>
            <Button
              onClick={() => {
                onClick();
                setInitialPlan(title.toLowerCase());
              }}
              fullWidth
              variant="contained"
              color="primary"
            >
              Comprar Plan
            </Button>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Info;
