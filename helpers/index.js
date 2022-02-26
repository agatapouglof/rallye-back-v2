const moment = require("moment");

const formatReceivedTime = (inputTime) => {
  const inputArray = inputTime.split("*");
  const type = inputArray[1];
  const id_pilote = inputArray[2];
  const id_speciale = inputArray[3];
  const temps = inputArray[4];
  const milisecs = inputArray[5];

  if (type == "A")
    return {
      id_pilote,
      id_speciale,
      ordre_speciale: id_speciale,
      arrivee: temps,
      ams: milisecs,
    };
  if (type == "D")
    return {
      id_pilote,
      id_speciale,
      ordre_speciale: id_speciale,
      depart: temps,
    };
  throw Error("Bad input type");
};

module.exports = { formatReceivedTime };
