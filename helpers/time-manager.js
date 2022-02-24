const Sequelize = require("sequelize");
let moment = require("moment");

let { formatReceivedTime } = require("../helpers/index.js");

const { sequelizeConnect } = require("../sequelize");
const SmsOciSdk = require("sms-oci");
const SmsOci = new SmsOciSdk(
  process.env.SMS_OCI_AUTH_HEADER,
  process.env.SMS_OCI_SENDER
);

let TempsModel = require("../models/temps.js");

const Temps = TempsModel(sequelizeConnect, Sequelize);

let PiloteModel = require("../models/pilote.js");

const Pilote = PiloteModel(sequelizeConnect, Sequelize);

// classement by speciales
const classementParSpeciale = async (idSpeciale) => {
  await sequelizeConnect.sync();
  Pilote.hasMany(Temps, { foreignKey: "id_pilote" });
  Temps.belongsTo(Pilote, { foreignKey: "id_pilote" });
  let temps = await Temps.findAll({
    where: { ordre_speciale: idSpeciale },
    include: [Pilote],
  });
  temps.forEach((elt) => {
    if (elt.depart && elt.arrivee) {
      let dbTimeDepart = elt.depart.split("T")[1];
      let dbTimeArrivee = elt.arrivee.split("T")[1];
      let tempsSpeciale =
        moment.duration(dbTimeArrivee).asSeconds() -
        moment.duration(dbTimeDepart).asSeconds() +
        elt.ams / 1000000;
      elt.temps = tempsSpeciale;
    } else {
      // delete elt;
    }
  });
  temps = temps.filter(function (el) {
    return el.temps > 0;
  });
  temps.sort(function (a, b) {
    return Number(a.temps) - Number(b.temps);
  });
  return temps;
};
module.exports = { classementParSpeciale };
