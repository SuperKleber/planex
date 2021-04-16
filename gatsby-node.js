const createPaginatedPages = require("gatsby-paginate");
const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require(`fs`);
const path = require(`path`);
const slug = require("./lib/slug");
const sheetdb = require("sheetdb-node");
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
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;
  let config = {
    address: "rhe5m5nrm1lfr",
  };
  let client = sheetdb(config);
  const data = await client.read();

  if (data.errors) {
    throw data.errors;
  }
  const obituarios = JSON.parse(data);
  obituarios.forEach((obi, i) => {
    const node = {
      ...obi,
      id: createNodeId(`Obituario-${i}`),
      name: obi.nombre,
      foto: obi.imagen,
      date: obi.fechaFin,
      year: obi.fechaFin ? parseInt(obi.fechaFin.split("/")[2]) : 0,
      month: obi.fechaFin ? parseInt(obi.fechaFin.split("/")[1]) : 0,
      day: obi.fechaFin ? parseInt(obi.fechaFin.split("/")[0]) : 0,

      misa: {
        fechaMisa: obi.fechaMisa,
        horaMisa: obi.horaMisa,
        urlLugarMisa: obi.urlLugarMisa,
        lugarCementerio: obi.lugarCementerio,
        urlLugarCementerio: obi.urlLugarCementerio,
      },
      slug: slug(obi.nombre),
      children: [],
      internal: {
        type: "Obituario",
        content: JSON.stringify(obi),
        contentDigest: createContentDigest(obi),
      },
    };
    actions.createNode(node);
  });
};
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const obituariosTemplate = path.resolve("src/templates/obituarios.jsx");
  const obituarioTemplate = path.resolve("src/templates/obituario.jsx");
  // (formatString: "dddd DD MMMM YYYY", locale: "es")
  const result = await graphql(`
    {
      allObituariosYaml(sort: { order: DESC, fields: [fechaFin] }) {
        edges {
          node {
            nombre
            fechaFin(formatString: "DD/MM/YYYY", locale: "es")
            foto
            afiliado
            misa {
              fechaMisa(formatString: "DD/MM/YYYY", locale: "es")
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
      allObituario(
        sort: { order: [DESC, DESC, DESC], fields: [year, month, day] }
      ) {
        edges {
          node {
            name
            nombre
            fechaFin
            misa {
              fechaMisa
              horaMisa
              urlLugarMisa
              lugarCementerio
              urlLugarCementerio
            }
            slug
            date
            epitafio
            afiliado
            foto
            fechaPremium
            urlYoutubePremium
            dedicatoriaPremium
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }
  // try {
  //   fs.writeFileSync(path.join(`public`, `CSVobituarios.txt`), data);
  // } catch (error) {
  //   console.log("ERROR AL CREAR EL TXT");
  // }

  // # CREAR PÁGINAS DE OBITUARIOS A PARTIR DE LOS ARCHIVOS YML
  createPaginatedPages({
    edges: result.data.allObituario.edges,
    createPage: createPage,
    pageTemplate: obituariosTemplate,
    pageLength: 12,
    pathPrefix: "obituarios",
    context: {},
  });
  result.data.allObituario.edges.forEach(({ node }) => {
    try {
      if (node.slug) {
        createPage({
          path: `/obituarios/${node.slug}`,
          component: obituarioTemplate,
          context: node,
        });
      }
    } catch (error) {
      console.log("Hubo un Error al crear las páginas de los obituarios");
      console.log(node);
    }
  });
  // createPaginatedPages({
  //   edges: result.data.allObituariosYaml.edges,
  //   createPage: createPage,
  //   pageTemplate: obituariosTemplate,
  //   pageLength: 12,
  //   pathPrefix: "obituarios",
  //   context: {},
  // });
  // result.data.allObituariosYaml.edges.forEach(({ node }) => {
  //   try {
  //     createPage({
  //       path: `/obituarios/${node.fields.slug}`,
  //       component: obituarioTemplate,
  //       context: node,
  //     });
  //   } catch (error) {
  //     console.log("Hubo un Error al crear las páginas de los obituarios");
  //     console.log(node);
  //   }
  // });

  // #CREAR ARCHIVO CSV A PARTIR DE ARCHIVOS YML

  // let allObituarios =
  //   "nombre, imagen, fechaFin, epitafio, afiliado, fechaMisa, horaMisa, urlLugarMisa, lugarCementerio, urlLugarCementerio \n";
  // result.data.allObituariosYaml.edges.forEach(({ node }) => {
  //   allObituarios += `${node.nombre}, ${node.foto}, ${node.fechaFin}, "${
  //     node.epitafio
  //   }", ${node.afiliado}, ${node.misa ? node.misa.fechaMisa : ""}, ${
  //     node.misa ? node.misa.horaMisa : ""
  //   }, "${node.misa ? node.misa.urlLugarMisa : ""}", "${
  //     node.misa ? node.misa.lugarCementerio : ""
  //   }", "${node.misa ? node.misa.urlLugarCementerio : ""}", "", "", "", "" \n`;
  //   try {
  //     createPage({
  //       path: `/obituarios/${node.fields.slug}`,
  //       component: obituarioTemplate,
  //       context: node,
  //     });
  //   } catch (error) {
  //     console.log("Hubo un Error al crear las páginas de los obituarios");
  //     console.log(node);
  //   }
  // });
  // try {
  //   fs.writeFileSync(path.join(`public`, `obituarios.csv`), allObituarios);
  // } catch (error) {
  //   console.log("ERROR AL CREAR EL CSV");
  // }
};
