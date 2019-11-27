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
      width: 75,
      height: 75,
      border: `8px solid ${colors.green}`,
      borderRadius: "50%"
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
            <Grid item xs={3}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Razon 1
                  </Typography>
                  <Typography align="center" variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem sint porro tenetur accusantium quos eaque facere
                    aperiam iusto necessitatibus fugit.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Razon 1
                  </Typography>
                  <Typography align="center" variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem sint porro tenetur accusantium quos eaque facere
                    aperiam iusto necessitatibus fugit.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Razon 1
                  </Typography>
                  <Typography align="center" variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem sint porro tenetur accusantium quos eaque facere
                    aperiam iusto necessitatibus fugit.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Box
                  className={classes.reason}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img></img>
                  <Typography align="center" gutterBottom variant="subtitle1">
                    Razon 1
                  </Typography>
                  <Typography align="center" variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem sint porro tenetur accusantium quos eaque facere
                    aperiam iusto necessitatibus fugit.
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
