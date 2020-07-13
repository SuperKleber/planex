import React, { useState } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import PaymentMethod from "../components/PaymentMethod";
import SearchClient from "../components/SearchClient";
import Modal from "../components/Modal";

const Pagos = () => {
  const [openModal, setOpenModal] = useState(false);
  const defaultPaymentMethod = [
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
                <ListItemText>Glosa: Nombre del responsable</ListItemText>
              </ListItem>
            </List>
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
                <ListItemText>Glosa: Nombre del responsable</ListItemText>
              </ListItem>
            </List>
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
                <ListItemText>Glosa: Nombre del responsable</ListItemText>
              </ListItem>
            </List>
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
    <Layout>
      <Menu></Menu>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "calc(100vh - 150px)" }}
        >
          <Typography>Métodos de pago</Typography>
          <br />
          <PaymentMethod
            defaultPaymentMethods={defaultPaymentMethod}
            clientCode={false}
          ></PaymentMethod>
        </Box>

        <Modal
          title="Consulta tu código de cliente"
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <SearchClient></SearchClient>
        </Modal>
      </Container>
    </Layout>
  );
};

export default Pagos;
