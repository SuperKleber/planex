import React, { useState } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { Container, Typography, Button, Box } from "@material-ui/core";
import PaymentMethod from "../components/PaymentMethod";
import SearchClient from "../components/SearchClient";
import Modal from "../components/Modal";

const Pagos = () => {
  const [openModal, setOpenModal] = useState(false);
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
          <PaymentMethod clientCode={false}></PaymentMethod>
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
