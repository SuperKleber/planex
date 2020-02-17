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
console.clear();
console.log(
  "%cSitio web hecho por kleber.digital " +
    "%cWhatsapp: +591 70657034 " +
    "%cWeb: www.kleber.digital",
  "font-family: Arial; background:#2a2f36; color: #00ffec; font-size: 30px; border:2px solid #00ffec; padding: 8px; border-radius: 5px; margin: 10px 0",
  "font-family: Arial; background:#075e54; color: #ece5dd; font-size: 15px; padding: 8px; border-radius: 5px; margin: 10px 10px 10px 0;",
  "font-family: Arial; font-weight: bold; background: #00ffec; color: #2a2f36; font-size: 15px; padding: 8px; border-radius: 5px;"
);

const Layout = ({ children, seo, pixel }) => {
  useEffect(() => {
    ReactPixel.init("2739923912769068");
    ReactPixel.pageView();
    {
      pixel && ReactPixel.track("viewContent", { title: pixel });
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Seo seo={seo}></Seo>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Lobster&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Alex+Brush&display=swap"
          rel="stylesheet"
        ></link>
        <meta property="fb:app_id" content="2503959843259543" />
        <meta property="fb:admins" content="100001924570972" />
        <meta property="fb:admins" content="100004839931984" />
      </Helmet>
      {children}
      <Footer></Footer>
      <FormNetlify></FormNetlify>
      <style jsx="true" global="true">{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          min-height: 100vh;
          // background: linear-gradient(#d4feff 15%, #ffffff 85%);
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
        // .MuiDialog-paperFullWidth {
        //   width: auto !important;
        // }
        @media (max-width: 550px) {
          .MuiDialog-paperFullWidth {
            width: auto !important;
          }
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
