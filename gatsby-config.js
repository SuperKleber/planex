const path = require(`path`);
module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteTitle: `Planex  Servicios funerarios y prevención nacional exequial`,
    siteDescription: `Para vivir tranquilo`,
    siteUrl: `https://planex.com.bo`,
    siteLanguage: `es`,
    siteImage: `/img/banner.png`,
    faviconDefault: `/favicon/favicon.png`
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
        path: `${__dirname}/src/data`
      }
    }
  ]
};
