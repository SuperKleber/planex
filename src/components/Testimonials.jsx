import React from "react";
import { Paper, Box, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../config/brand.yml";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
const color = colors.green;
const useStyles = makeStyles(theme => ({
  root: {},
  testimonial: {
    margin: 16,
    width: 500,
    borderRadius: 15,
    "@media (max-width: 600px)": {
      width: 350
    },
    "@media (max-width: 470px)": {
      width: 290
    }
  },
  testimonialTitle: {
    marginBottom: 50,
    color: "white"
  },
  testimonialName: {
    display: "inline-block",
    borderRadius: "15px 0 70px 0",
    padding: "10px 15% 10px 10px",
    background: color,
    color: "white",
    position: "relative",
    "& img": {
      width: 75,
      position: "absolute",
      borderRadius: "50%",
      border: `7px solid ${color}`,
      left: -50,
      top: -25
      //   transform: "translateY(-50%)"
    },
    "& p": {
      fontSize: "1.3em",
      fontWeight: "400",
      padding: 0,
      paddingLeft: 35,
      margin: 0
    },
    "@media (max-width: 470px)": {
      padding: "8px 0",
      borderRadius: "15px 15px 0 0",
      width: "100%",
      textAlign: "center",
      "& p": {
        fontSize: "1em",
        paddingLeft: 0
      },
      "& img": {
        width: 50,
        left: 0,
        top: -26
      }
    }
  },
  testimonialText: {
    padding: 25
  },
  quoteOpen: {
    position: "absolute",
    // transform: "rotateY(180deg) rotateX(180deg)",
    fontSize: 35,
    top: -40,
    color: color,
    right: 35,
    "@media (max-width: 470px)": {
      color: "white",

      right: 15,
      top: -35
    }
  },
  quoteClose: {
    position: "absolute",
    transform: "rotateX(180deg)",
    bottom: 25,
    right: 25
  }
}));
const Testimonials = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography className={classes.testimonialTitle} variant="h5">
        Testimonios
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Testimonial></Testimonial>
        <Testimonial></Testimonial>
        <Testimonial></Testimonial>
      </Box>
    </Box>
  );
};
const Testimonial = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.testimonial}>
      <Box className={classes.testimonialName}>
        <img
          src="https://prever.com.bo/imagen/productos/51be35312485667c7b7c2cb1f62e0141.jpg"
          alt=""
        />
        <Typography gutterBottom variant="body2">
          Nombre apellido
        </Typography>
      </Box>
      <Box className={classes.testimonialText} position="relative">
        <FormatQuoteIcon className={classes.quoteOpen}></FormatQuoteIcon>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quidem
          hic optio laborum, vitae sit voluptatibus voluptatum corporis,
          voluptatem aperiam sunt ad. Blanditiis et delectus voluptatum
          molestiae animi, officiis illum!
        </Typography>
        {/* <FormatQuoteIcon className={classes.quoteClose}></FormatQuoteIcon> */}
      </Box>
    </Paper>
  );
};
export default Testimonials;
