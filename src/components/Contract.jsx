import React from "react";
import { contract } from "../../config/info.yml";
import { Container, Paper, Typography, Button, Box } from "@material-ui/core";
import { colors } from "../../config/brand.yml";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Contract = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root} id="contrato">
      <Box
        style={{ width: "100%" }}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        <img
          style={{ width: 300 }}
          src="/img/contrato.svg"
          alt="contrato ilustracion de prever"
        />
        <Box>
          <Typography style={{ margin: "16px 0" }}>
            Puedes ver el contrato para tener toda la información del servicio
            de previsión
          </Typography>
          <Link to="/contrato">
            <Button
              fullWidth
              style={{ background: colors.green }}
              variant="contained"
            >
              Ver Contrato
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Contract;
