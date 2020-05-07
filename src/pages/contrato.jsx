import React from "react";
import { Container, Paper, Box } from "@material-ui/core";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import ContratoText from "../components/ContratoText";
const contrato = () => {
  return (
    <Layout>
      <Menu />
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Paper style={{ padding: 8, maxWidth: 350, width: "100%" }}>
            <ContratoText></ContratoText>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default contrato;
