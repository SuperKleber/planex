import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { Paper, Box, Typography, Button, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Back from "@material-ui/icons/ArrowBack";
import { colors } from "../../config/brand.yml";
const useStyles = makeStyles(theme => ({
  prev: {
    margin: 16
  },
  funeral: {
    position: "relative",
    boxShadow: " 10px 10px 25px 1px",
    height: 190
  },
  foto: {
    width: 150,
    height: 150,
    // boxShadow: " 10px 10px 25px 1px",
    border: `20px solid ${colors.purple}`
  },
  text: {
    width: 280,
    margin: "24px 0",
    padding: 16
  },
  shadowFoto: {
    position: "absolute",
    right: 0,
    width: 75,
    height: 150,
    border: "20px solid rgba(0,0,0,0.4)",
    borderLeft: "none"
  },
  decoration: {
    position: "absolute",
    bottom: -1,
    left: "54%",
    transform: "translateX(-50%)",
    width: 260
  }
}));
const Obituario = ({ pageContext, location }) => {
  let prev = location.state ? location.state.prev : "/obituarios";
  console.log(prev);
  const classes = useStyles();

  return (
    <Layout>
      <Menu></Menu>
      <Link to={prev}>
        <Fab color="primary" className={classes.prev}>
          <Back></Back>
        </Fab>
      </Link>
      <Box
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box className={classes.funeral}>
          <img className={classes.foto} src={pageContext.foto} alt="" />
          <span className={classes.shadowFoto}></span>
          <img className={classes.decoration} src="/img/funeral.svg"></img>
        </Box>
        <Paper className={classes.text}>
          <Typography variant="h4">{pageContext.nombre}</Typography>
          <Typography gutterBottom>{pageContext.fehcaInicio}</Typography>
          <Typography>{pageContext.epitafio}</Typography>
        </Paper>
      </Box>
    </Layout>
  );
};
export default Obituario;
