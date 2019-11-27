import React from "react";
import Testimonials from "./Testimonials";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../config/brand.yml";
import Reasons from "./Reasons";
const useStyles = makeStyles(theme => ({
  footer: {
    background: colors.purple,
    // background: "#045b38",
    padding: "50px 0"
  }
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Reasons></Reasons>
      <Testimonials></Testimonials>
    </footer>
  );
};
export default Footer;
