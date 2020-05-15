import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  CardActionArea,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import Modal from "./Modal";
import SearchClient from "./SearchClient";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {},
  Card: {
    width: "100%",
    height: 150,
  },
  PayMethod: {
    padding: 8,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const PaymentMethod = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState({ title: "", children: () => <></> });
  const classes = useStyles();
  const paymentMethods = [
    {
      title: "Escaneo de QR con banca móvil",
      img: "/img/qr.svg",
      modal: {
        children: () => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <img
              style={{ width: "100%", maxWidth: 350 }}
              src="/img/qrpay.png"
              alt=""
            />
            <Typography variant="caption">
              Vigencia del QR hasta 11/05/2021
            </Typography>
            <Button
              href="/img/qr-vigencia.png"
              download="QR-PLANEX"
              color="primary"
              variant="contained"
            >
              Descargar QR
            </Button>
            <List>
              <ListItem>
                <ListItemText>Abrir aplicación de Banca móvil</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Ve a la sección de "Pagar con Código QR"
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Escanea con la cámara o Descarga el Código QR del sitio web
                  para subirlo como foto
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Introducir en la Glosa{" "}
                  <strong
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      setOpenModal(true);
                      setModal({
                        title: "Consulte su código de cliente",
                        children: SearchClient,
                      });
                    }}
                  >
                    Código de contrato
                  </strong>
                </ListItemText>
              </ListItem>
            </List>

            <hr />

            <Button
              onClick={() => {
                setOpenModal(true);
                setModal({
                  title: "Consulte su código de cliente",
                  children: SearchClient,
                });
              }}
              color="primary"
              variant="outlined"
            >
              ¿Cuál es mi código de contrato?
            </Button>

            <hr />
          </Box>
        ),
      },
    },
    {
      title: "Transferencia Inter-bancaria",
      img: "/img/bankmovil.svg",
      modal: {
        children: () => (
          <Box>
            <List>
              <ListItem>
                <ListItemText>Banco: FASSIL</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Nombre: SIGLOS</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Nº: 6150</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>NIT: 177090029</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Cuenta Corriente BOB</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Glosa: Introducir su código de contrato
                </ListItemText>
              </ListItem>
            </List>

            <Button
              onClick={() => {
                setOpenModal(true);
                setModal({
                  title: "Consulte su código de cliente",
                  children: SearchClient,
                });
              }}
              color="primary"
              variant="outlined"
            >
              ¿Cuál es mi código de contrato?
            </Button>

            <br />
            <br />
          </Box>
        ),
      },
    },

    {
      title: "Pago ventanilla FASSIL",
      img: "/img/bank.svg",
      modal: {
        children: () => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <List>
              <ListItem>
                <ListItemText>Banco: FASSIL</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Nombre: INSTITUCIÓN PREVER</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Glosa: Introducir su código de contrato
                </ListItemText>
              </ListItem>
            </List>
            <hr />

            <Button
              onClick={() => {
                setOpenModal(true);
                setModal({
                  title: "Consulte su código de cliente",
                  children: SearchClient,
                });
              }}
              color="primary"
              variant="outlined"
            >
              ¿Cuál es mi código de contrato?
            </Button>

            <hr />
          </Box>
        ),
      },
    },
    {
      title: "Pago en oficina",
      img: "/img/oficina.svg",
      modal: {
        children: () => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">
              2do Anillo | Av. Santa Cruz | Esq. Bautista Saveedra
            </Typography>
            <Typography variant="caption">
              Abierto <strong>24 horas</strong> del día, <strong>7 días</strong>{" "}
              a la semana
            </Typography>
            <hr />
            <a target="_blank" href="https://goo.gl/maps/qTvRRNbYRoKbVvHJ9">
              <Button color="primary" variant="contained">
                Ver en mapa
              </Button>
            </a>
            <hr />
          </Box>
        ),
      },
    },
  ];
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        {paymentMethods.map((pay, i) => {
          return (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
              <CardPayMethod
                {...pay}
                setModal={setModal}
                setOpenModal={setOpenModal}
              ></CardPayMethod>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        title={modal.title}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <modal.children></modal.children>
      </Modal>
    </Box>
  );
};
const CardPayMethod = ({ title, img, modal, setModal, setOpenModal }) => {
  const classes = useStyles();
  return (
    <Card className={classes.Card}>
      <CardActionArea
        onClick={() => {
          setModal({ title: title, children: modal.children });
          setOpenModal(true);
        }}
        className={classes.PayMethod}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img height={75} src={img} alt={title} />
          <Typography align="center">{title}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default PaymentMethod;
