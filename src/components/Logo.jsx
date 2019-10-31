import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
const useStyles = makeStyles(theme => ({
  logoContainer: {
    width: 100
  },
  logo: {
    width: "100%"
  }
}));
const Logo = () => {
  const classes = useStyles();
  return (
    <Link to="/">
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          src="./img/planexcomentario.png"
          alt="Logo Planex by Prever"
        />
      </div>
    </Link>
  );
};

export default Logo;
