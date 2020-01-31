const firstUpperCase = str => {
  const ruptura = /[áàéèíìóòúùñÁÀÉÈÍÌÓÒÚÙÑ]/;
  let initialCharacter = false;
  const strLowerCase = str.toLowerCase();
  const array = strLowerCase.split("");
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const char = array[i];
    if (i == 0) {
      newArray.push(char.toUpperCase());
      continue;
    }
    if (char === " ") {
      newArray.push(char);
      initialCharacter = true;
      continue;
    }
    if (initialCharacter) {
      newArray.push(char.toUpperCase());
      initialCharacter = false;
      continue;
    }
    newArray.push(char);
  }
  let strFirstUpperCase = "";
  newArray.forEach(
    char => (strFirstUpperCase = strFirstUpperCase.concat(char))
  );
  return strFirstUpperCase;
};
module.exports = firstUpperCase;
