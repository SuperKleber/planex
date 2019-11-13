const slug = str => {
  const from = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç";
  const to = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc";
  const expresionRegular = new RegExp(`['${from}']`);
  const result = str
    .replace(expresionRegular, match => to.charAt(from.indexOf(match)))
    .replace(/\?|¿|!|¡|\.|"|\,/gi, "")
    .replace(/\s|_/gi, "-")
    .toLowerCase();
  return result;
};
module.exports = slug;
