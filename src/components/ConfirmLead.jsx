import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { contract } from "../../config/info.yml";
const ConfirmLead = ({ nombres, apellidos, plan }) => {
  const message = `Hola soy ${nombres} ${apellidos}, ya he completado el formulario de registro para el plan ${plan}.`;
  const messageWhatsapp = message.replace(/ /gi, "%20");
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography align="center">De momento puedes:</Typography>
      <a
        href={`https://api.whatsapp.com/send?phone=59172145667&text=${messageWhatsapp}`}
      >
        <Button
          variant="contained"
          style={{ background: "#075e54", color: "#ece5dd" }}
        >
          Consultar por Whatsapp
        </Button>
      </a>
      <hr />
      <Typography align="center">O puedes</Typography>

      <a href={contract} download="contrato-planex.pdf">
        <Button variant="contained" color="primary">
          Descargar Contrato
        </Button>
      </a>
      {/* <hr />
      <Typography align="center">O</Typography>

      <Button
        onClick={() => {
          typeof window !== "undefined" && window.location.reload();
        }}
        variant="contained"
      >
        Volver a enviar solicitud
      </Button> */}
    </Box>
  );
};

export default ConfirmLead;
