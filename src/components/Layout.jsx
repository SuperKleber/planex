import React, { useEffect } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Helmet from "react-helmet";
import { colors } from "../../config/brand.yml";
import fontBrushWoff from "../../config/font/BrushScriptRegularSWFTE.woff";
import fontBrushWoff2 from "../../config/font/BrushScriptRegularSWFTE.woff2";
import Seo from "./Seo.jsx";
import Footer from "./Footer";
import ReactPixel from "react-facebook-pixel";
import FormNetlify from "./FormNetlify";
const brush = {
  fontFamily: "Brush Script",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `url(${fontBrushWoff2}) format(woff2), url(${fontBrushWoff}) format(woff)`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [brush]
      }
    }
  },
  typography: {
    h4: {
      // fontFamily: "Lobster",
      fontFamily: "Brush Script, Lobster",
      // fontFamily: "Brush Script",
      fontWeight: "Bold"
    }
  },
  palette: {
    primary: { main: colors.purple, dark: colors.green },
    secondary: { main: colors.gold }
  }
});
const Layout = ({ children, seo }) => {
  useEffect(() => {
    ReactPixel.init("2739923912769068");
    ReactPixel.pageView();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Seo seo={seo}></Seo>
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
        <link
          href="https://fonts.googleapis.com/css?family=Alex+Brush&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      {children}
      <Footer></Footer>
      <FormNetlify></FormNetlify>
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
        @keyframes circle {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      {/* // Popup de Autocomplete de @material-ui/lab */}
    </ThemeProvider>
  );
};

export default Layout;
