import React, { useEffect } from "react";
import Layout from "../components/Layout";
import ReactPixel from "react-facebook-pixel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Box, Typography } from "@material-ui/core";
const Whatsapp = () => {
  const message = "Hola, vi su anuncio, quiero más infomación.";
  const messageWhatsapp = message.replace(/ /gi, "%20");
  useEffect(() => {
    ReactPixel.track("Contact", {
      type: "whatsapp",
      num: "72145667",
      description: "Link directo a chat de Whatsapp",
      textButton: ""
    });
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = `https://api.whatsapp.com/send?phone=59172145667&text=${messageWhatsapp}`;
      }
    }, 300);
  }, []);
  const seo = {
    siteDescription: "WHATSAPP 🤳🏼 comunícate con nosotros",
    siteUrl: "https://planex.com.bo/whatsapp",
    siteCover: "/img/whatsapp.png"
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

          <Typography>Whatsapp</Typography>
        </Box>
      </Container>
    </Layout>
  );
};
export default Whatsapp;
