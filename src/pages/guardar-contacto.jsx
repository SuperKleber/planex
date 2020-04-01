import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Alert from "../components/Alert";
import ReactPixel from "react-facebook-pixel";

import { Box, Paper, Button, Typography, Container } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  landingGuardarContacto: {
    height: "calc(90vh - 64px)",
    width: "100%"
  },
  contact: {
    height: 250,
    zIndex: 1,
    width: "100%",
    padding: "16px 0",
    maxWidth: 400
  }
}));
const GuardarContacto = () => {
  const [copied, setCopied] = useState(false);
  const classes = useStyles();
  return (
    <Layout>
      <Menu></Menu>
      {/* <Background></Background> */}
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className={classes.landingGuardarContacto}
        >
          <Paper className={classes.contact}>
            <Box
              style={{ height: "100%" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              flexDirection="column"
            >
              <CopyToClipboard text="33469191" onCopy={() => setCopied(true)}>
                <Button
                  onClick={() =>
                    ReactPixel.track("Contact", {
                      type: "copied",
                      num: "33469191",
                      description: "Copiar botón de emergencia",
                      textButton: "Emergencia: 33469191"
                    })
                  }
                  fullWidth
                >
                  Emergencia: 33469191
                </Button>
              </CopyToClipboard>
              <Alert
                open={copied}
                message="Teléfono Copiado"
                onClose={() => setCopied(false)}
              ></Alert>
              <Typography align="center">
                "Prever Emergencia Servicios Funerarios"
              </Typography>
              <a
                onClick={() =>
                  ReactPixel.track("Contact", {
                    type: "call",
                    num: "33469191",
                    description: "botón de emergencia",
                    textButton: "Guardar Contacto"
                  })
                }
                target="_blank"
                href="tel:33469191"
              >
                <Button variant="contained" color="primary" fullWidth>
                  Guardar Contacto
                </Button>
              </a>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};
export default GuardarContacto;
