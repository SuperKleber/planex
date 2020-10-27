const createPaginatedPages = require("gatsby-paginate");
const { createFilePath } = require(`gatsby-source-filesystem`);

const path = require(`path`);
const slug = require("./lib/slug");

// exports.sourceNodes = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `
//     # One must say that the type is a Node
//     type Misa  {

//       fechaMisa: Date
//       horaMisa: String
//       urlLugarMisa: String
//       lugarCementerio: String
//       urlLugarCementerio: String

//     }
//     type allObituariosYaml implements Node {
//       misa: Misa
//     }
//     `;
//   createTypes(typeDefs);
// };
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type) {
    if (node.internal.type === "ObituariosYaml") {
      const value = slug(`${node.nombre}`);
      createNodeField({
        node,
        name: `slug`,
        value: value,
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
      allObituariosYaml(sort: { order: DESC, fields: [fechaFin] }) {
        edges {
          node {
            nombre
            fechaFin(formatString: "dddd DD MMMM YYYY", locale: "es")
            foto
            afiliado
            misa {
              fechaMisa(formatString: "dddd DD MMMM YYYY", locale: "es")
              horaMisa
              urlLugarMisa
              lugarCementerio
              urlLugarCementerio
            }
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
  let objectToSave = { variable: "1", variable2: "2" };

  // fs.writeFile(
  //   "/static/uploads/archivo.json",
  //   JSON.stringify(objectToSave),
  //   "utf8",
  //   err => {
  //     if (err) throw err;
  //     console.log("The file has been saved!");
  //   }
  // );

  createPaginatedPages({
    edges: result.data.allObituariosYaml.edges,
    createPage: createPage,
    pageTemplate: obituariosTemplate,
    pageLength: 12,
    pathPrefix: "obituarios",
    context: {},
  });
  result.data.allObituariosYaml.edges.forEach(({ node }) => {
    try {
      createPage({
        path: `/obituarios/${node.fields.slug}`,
        component: obituarioTemplate,
        context: node,
      });
    } catch (error) {
      console.log("Hubo un Error al crear las páginas de los obituarios");
      console.log(node);
    }
  });
};
