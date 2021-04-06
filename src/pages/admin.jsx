import React, { useEffect } from "react";
import Layout from "../components/Layout";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Box, Typography } from "@material-ui/core";
const Admin = () => {
  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = `https://www.appsheet.com/start/7dd48e9c-e9d1-4720-ab2b-ab1598524f97`;
      }
    }, 100);
  }, []);
  const seo = {
    siteTitle: "Administrador de Obituarios",
    siteDescription: "👵🏻👴🏻 Subir, editar o borrar obituarios",
    siteCover: "/img/obituarios.png",
  };
  return (
    <Layout seo={seo}>
      <Container style={{ height: "100vh" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: "100%" }}
        >
          <CircularProgress style={{ margin: "0 8px" }}></CircularProgress>

          <Typography>Obituarios</Typography>
        </Box>
      </Container>
    </Layout>
  );
};
export default Admin;
