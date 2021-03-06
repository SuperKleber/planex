import React, { useState } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import FormPlanex from "../components/FormPlanex";
import { Container, Typography, Box, Divider } from "@material-ui/core";
const Formulario = () => {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <Menu></Menu>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 72,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          style={{ minHeight: "85vh", maxWidth: 700 }}
        >
          {!sent ? (
            <Typography align="center" gutterBottom variant="body1">
              Solicitud de afiliación
            </Typography>
          ) : (
            <Typography align="center" gutterBottom variant="body1">
              Muchas gracias, muy pronto nos comunicaremos con usted
            </Typography>
          )}
          <hr />
          <FormPlanex
            formName="remarketing"
            onSent={() => {
              setSent(true);
              typeof window !== "undefined" && window.scrollTo(0, 0);
            }}
          ></FormPlanex>
        </Box>
      </Container>
    </Layout>
  );
};

export default Formulario;
