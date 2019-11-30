const firstUpperCase = str => {
  return str
    .replace(/\b./g, char => char.toUpperCase())
    .replace(/\B./g, char => char.toLowerCase());
};
module.exports = firstUpperCase;
