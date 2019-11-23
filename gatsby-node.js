const createPaginatedPages = require("gatsby-paginate");
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);
const slug = require("./lib/slug");
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type) {
    if (node.internal.type === "ObituariosYaml") {
      const value = slug(`${node.nombre}`);
      createNodeField({
        node,
        name: `slug`,
        value: value
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const obituariosTemplate = path.resolve("src/templates/obituarios.jsx");
  const obituarioTemplate = path.resolve("src/templates/obituario.jsx");
  const result = await graphql(`
    {
      allObituariosYaml {
        edges {
          node {
            nombre
            fechaFin(formatString: "dddd DD MMMM YYYY", locale: "es")
            fechaInicio(formatString: "dddd DD MMMM YYYY", locale: "es")
            foto
            bebe
            epitafio
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }
  createPaginatedPages({
    edges: result.data.allObituariosYaml.edges,
    createPage: createPage,
    pageTemplate: obituariosTemplate,
    pageLength: 12,
    pathPrefix: "obituarios",
    context: {}
  });
  result.data.allObituariosYaml.edges.forEach(({ node }) => {
    try {
      createPage({
        path: `/obituarios/${node.fields.slug}`,
        component: obituarioTemplate,
        context: node
      });
    } catch (error) {
      console.log(node);
    }
  });
};
