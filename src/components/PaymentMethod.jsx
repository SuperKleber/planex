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
  Divider
} from "@material-ui/core";
import Modal from "./Modal";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    minHeight: "calc(100vh - 90px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 550px)": {
      flexDirection: "column"
    }
  },
  Card: {
    width: "30vw",
    height: "15vw",
    "@media (max-width: 550px)": {
      width: "90vw",
      height: "45vw",
      margin: "8px 0"
    }
  },
  PayMethod: {
    width: "100%",
    height: "100%"
  }
}));
const PaymentMethod = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState({ title: "", children: () => <></> });
  const classes = useStyles();
  const paymentMethods = [
    {
      title: "Pago online con tarjeta",
      img: "/img/tarjeta.svg",
      modal: {
        children: () => (
          <div
            className="gumroad-product-embed"
            data-gumroad-product-id="uhlth"
          >
            <iframe
              allowFullScreen="allowfullscreen"
              className="gumroad-embed-iframe"
              scrolling="yes"
              id={`gumroad-embed-iframe-uhlth`}
              style={{
                display: "block !important",
                border: "none !important",
                margin: "0 auto !important",
                padding: "0 !important",
                maxWidth: "100% !important",
                width: "100%",
                height: 1300,
                border: "none"
              }}
              src={`https://gumroad.com/l/uhlth?null&&as_embed=true&referrer=https%3A%2F%2Fkleber.digital%2Fproductos%2F&origin=https%3A%2F%2Fkleber.digital&locale=es`}
            />
          </div>
        )
      }
    },
    {
      title: "Transferencia Bancaria",
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
                <ListItemText>Nombre: SIGLOS S.R.L.</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Nº: 6150</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Cuenta Corriente BOB</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Glosa: Su código de contrato o el nombre completo del titular
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        )
      }
    },
    {
      title: "Escaneo de QR con banca móvil",
      img: "/img/qr.svg",
      modal: {
        children: () => <Typography>QR </Typography>
      }
    }
  ];
  return (
    <Box className={classes.root}>
      {paymentMethods.map(pay => {
        return (
          <CardPayMethod
            {...pay}
            setModal={setModal}
            setOpenModal={setOpenModal}
          ></CardPayMethod>
        );
      })}
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
          <Typography>{title}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default PaymentMethod;
