import React from "react";
import Testimonials from "./Testimonials";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../config/brand.yml";
import Reasons from "./Reasons";
import Gallery from "./Gallery";
import Contract from "./Contract";
import { Divider } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  footer: {
    background: `linear-gradient(#ffffff, ${colors.lightBlue})`,
    // background: "#ffffff",
    // background: "#000000",
    padding: "50px 0"
  },
  divider: {
    margin: "25px 0",
    backgroundColor: "green"
  }
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Reasons></Reasons>
      <Testimonials></Testimonials>
      {/* <Gallery></Gallery> */}
    </footer>
  );
};
export default Footer;
