const path = require(`path`);
const {
  siteTitle,
  siteDescription,
  siteUrl,
  siteLanguage,
  siteCover,
  faviconDefault
} = require("./config/defaultSeo.json");
module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteTitle,
    siteDescription,
    siteUrl,
    siteLanguage,
    siteCover,
    faviconDefault
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml-plus`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "obituarios",
        path: `${__dirname}/src/data/dataObituarios`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "obituarios",
        path: `${__dirname}/src/data/dataBlog`
      }
    },
    `gatsby-plugin-netlify-cms`
  ]
};
