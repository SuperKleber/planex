const dataObituarios = require("./src/data/dataObituarios/obituarios.json");
const YAML = require("json2yaml");
const fs = require("fs");
const slug = require("./lib/slug");
dataObituarios.forEach((obituario) => {
  const obituarioYml = YAML.stringify({
    nombre: obituario.nombre.replace(/�/gi, "Ñ"),
    fechaFin: obituario.fechaFin,
    // epitafio: obituario.epitafio ? obituario.epitafio : "",
    // foto: obituario.foto ? obituario.foto : "",
  });
  fs.writeFile(
    `./src/data/dataObituarios/obituarios/${slug(obituario.nombre).replace(
      /�/gi,
      "n"
    )}.yml`,
    obituarioYml.replace(/---/gi, "").replace(/  /gi, "").replace("\n", ""),
    (err) => {
      // console.error("Hubo un error: " + err)
    }
  );
});
