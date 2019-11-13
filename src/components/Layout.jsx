import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Helmet from "react-helmet";
import { colors } from "../../config/brand.yml";
const theme = createMuiTheme({
  typography: {
    h4: {
      fontFamily: "Lobster"
    }
  },
  palette: {
    primary: { main: colors.purple },
    secondary: { main: colors.gold }
  }
});
const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lobster&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes"></meta>
      </Helmet>
      {children}
      <style jsx="true" global="true">{`
        body {
          margin: 0;
          min-height: 100vh;
          background: linear-gradient(#d4feff 15%, #ffffff 85%);
          overflow-x: hidden;
        }
        a {
          text-decoration: none;
          color: initial;
        }
        .MuiAutocomplete-popup {
          z-index: 5000;
        }
        .MuiInputLabel-shrink {
          background: white;
        }
        .Mui-disabled {
          cursor: initial;
        }
      `}</style>
      {/* // Popup de Autocomplete de @material-ui/lab */}
    </ThemeProvider>
  );
};

export default Layout;
