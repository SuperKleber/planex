const path = require(`path`);

const {
  siteTitle,
  siteDescription,
  siteUrl,
  siteLanguage,
  siteCover,
  faviconDefault,
} = require("./config/defaultSeo.json");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const myQuery = `{
  allObituariosYaml(sort: { order: DESC, fields: [fechaFin] }) {
    edges {
      node {
        id
        nombre
        foto
        fields {
          slug
        }
      }
    }
  }
}`;
const queries = [
  {
    query: myQuery,
    // transformer: ({ data }) =>
    //   data.allObituariosYaml.edges.map(({ node }) => {
    //     const obituario = {
    //       objectID: node.id,
    //       foto:
    //         node.foto == null
    //           ? `${siteUrl}/uploads/avatar-prever.png`
    //           : node.foto.indexOf("http://prever.com.bo") == 0
    //           ? node.foto
    //           : `${siteUrl}${node.foto}`,
    //       nombre: node.nombre,
    //       url: `${siteUrl}/obituarios/${node.fields.slug}`
    //     };
    //     return obituario;
    //   }), // optional
    transformer: ({ data }) => {
      let { node } = data.allObituariosYaml.edges[0];
      const obituarios = [
        {
          objectID: node.id,
          foto:
            node.foto == null
              ? `${siteUrl}/uploads/avatar-prever.png`
              : node.foto.indexOf("http://prever.com.bo") == 0
              ? node.foto
              : `${siteUrl}${node.foto}`,
          nombre: node.nombre,
          url: `${siteUrl}/obituarios/${node.fields.slug}`,
        },
      ];
      return obituarios;
    }, // optional
    indexName: "obituarios", // overrides main index name, optional
    settings: {
      // optional, any index settings
    },
  },
];
module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteTitle,
    siteDescription,
    siteUrl,
    siteLanguage,
    siteCover,
    faviconDefault,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml-plus`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "obituarios",
        path: `${__dirname}/src/data/dataObituarios`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "obituarios",
        path: `${__dirname}/src/data/dataBlog`,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Raleway", "Lobster", "Alex Brush"],
        },
      },
    },
    `gatsby-plugin-netlify-cms`,
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `planex`,
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: [
          "ALGOLIA_APP_ID",
          "ALGOLIA_API_KEY",
          "ALGOLIA_API_ADMIN",
          "ALGOLIA_INDEX_NAME",
        ],
      },
    },

    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_API_ADMIN,
    //     indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
    //     queries,
    //     chunkSize: 10000 // default: 1000
    //   }
    // }
  ],
};
