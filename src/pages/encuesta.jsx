import React from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { Button, Container, Box } from "@material-ui/core";

const encuesta = () => {
  return (
    <Layout>
      <Menu></Menu>
      <Container>
        <Box
          style={{ width: "100%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <a
            target="_blank"
            href="https://www.algolia.com/realtime-search-demo/consultar-codigo-de-cliente"
          >
            <Button size="big" variant="contained" color="primary">
              Consulta tu código de Cliente Prever
            </Button>
          </a>
        </Box>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfcO1nRpGEl0W8vr6O2Ur2CsB8wp-_EKXxDUm72tJa0yRQmnQ/viewform?embedded=true"
          style={{ width: "100%", height: "100vh" }}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
        >
          Cargando…
        </iframe>
      </Container>
    </Layout>
  );
};

export default encuesta;
