import React from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { Container } from "@material-ui/core";
import PaymentMethod from "../components/PaymentMethod";

const pagos = () => {
  return (
    <Layout>
      <Menu></Menu>
      <Container>
        <PaymentMethod></PaymentMethod>
      </Container>
    </Layout>
  );
};

export default pagos;
