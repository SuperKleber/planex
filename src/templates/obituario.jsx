import React from "react";
import { FacebookProvider, Comments } from "react-facebook";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { Paper, Box, Typography, Button, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Back from "@material-ui/icons/ArrowBack";
import { colors } from "../../config/brand.yml";
import { siteUrl } from "../../config/defaultSeo.json";
import firstUpperCase from "../../lib/firstUpperCase";
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
  const classes = useStyles();
  const nombre = firstUpperCase(pageContext.nombre);
  const seo = {
    siteTitle: `Planex | ${nombre}`,
    siteDescription: pageContext.epitafio ? pageContext.epitafio : false,
    siteCover: pageContext.foto ? pageContext.foto : false,
    siteUrl: `${siteUrl}/obituarios/${pageContext.fields.slug}`
  };
  const urlAbsolute = typeof window !== undefined && window.location.href;
  return (
    <Layout seo={seo}>
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
          <Typography variant="h4">{nombre}</Typography>
          <Typography gutterBottom>{pageContext.fechaInicio}</Typography>
          <Typography>{pageContext.epitafio}</Typography>
        </Paper>
        <FacebookProvider appId="2503959843259543">
          <Comments href={urlAbsolute} />
        </FacebookProvider>
      </Box>
    </Layout>
  );
};
export default Obituario;
