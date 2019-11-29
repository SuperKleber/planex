import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Button
} from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { colors } from "../../config/brand.yml";
import { Link } from "gatsby";
const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 50
  },
  title: {
    color: "white",

    marginBottom: 24
  },
  buttons: {
    marginTop: 24,
    "& button": {
      margin: 12,
      width: 241.5
    }
  },
  reason: {
    // color: "white",
    padding: 16,
    "& img": {
      fillColor: colors.green,
      width: 75,
      height: 75,
      padding: 16,
      // border: `2px solid ${colors.purple}`
      borderRadius: "10%"
      // boxShadow: "0px 2px 7px 0.5px"
    }
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: { main: colors.green },
    secondary: { main: colors.green }
  }
});
const Reasons = () => {
  const classes = useStyles();
  const responsive = {
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    xl: 3
  };
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography className={classes.title} variant="h5">
            Beneficios de contratar a Prever
          </Typography>

          <Grid container spacing={3}>
            <Grid item {...responsive}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src="/img/family.svg"></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Único
                  </Typography>
                  <Typography align="center" variant="body2">
                    Únicos en el mercado con un Plan de Asistencia Familiar.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item {...responsive}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src="/img/save-money.svg"></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Económico
                  </Typography>
                  <Typography align="center" variant="body2">
                    Cuota mínima de 100 bs.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item {...responsive}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src="/img/accesible.svg"></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Accesible
                  </Typography>
                  <Typography align="center" variant="body2">
                    Ingresan sus padres sin límite de edad.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item {...responsive}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src="/img/happy.svg"></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Paz
                  </Typography>
                  <Typography align="center" variant="body2">
                    Es la única manera ¡Para vivir en paz!.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box
            className={classes.buttons}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/prevenir">
              <Button variant="contained" color="primary">
                Previsión
              </Button>
            </Link>

            <Button variant="outlined" color="secondary">
              Servicio al cliente
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Reasons;
