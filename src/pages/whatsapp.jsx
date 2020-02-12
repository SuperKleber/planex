import React, { useEffect } from "react";
import Layout from "../components/Layout";
import ReactPixel from "react-facebook-pixel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Box, Typography } from "@material-ui/core";
const Whatsapp = () => {
  useEffect(() => {
    ReactPixel.track("Contact", {
      type: "whatsapp",
      num: "72145667",
      description: "Link directo a chat de Whatsapp",
      textButton: ""
    });
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href =
          "https://api.whatsapp.com/send?phone=59172145667&text=Buenas,%20vi%20su%20anuncio,%20quiero%20más%20información%20por%20favor.";
      }
    }, 300);
  }, []);
  return (
    <Layout>
      <Container style={{ height: "100vh" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: "100%" }}
        >
          <CircularProgress style={{ margin: "0 8px" }}></CircularProgress>

          <Typography>Whatsapp</Typography>
        </Box>
      </Container>
    </Layout>
  );
};
export default Whatsapp;
