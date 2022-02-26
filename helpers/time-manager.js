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

let SmsCopyModel = require("../models/sms_copy.js");
const SmsCopy = SmsCopyModel(sequelizeConnect, Sequelize);

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

const getPiloteTempsBySpeciale = async (id_pilote, id_speciale) => {
  await sequelizeConnect.sync();
  const piloteTime = await Temps.findOne({ where: { id_pilote, id_speciale } });
  let res = "";
  if (piloteTime.depart && piloteTime.arrivee) {
    const dbTimeDepart = piloteTime.depart.split("T")[1];
    const dbTimeArrivee = piloteTime.arrivee.split("T")[1];
    const tempsSpeciale =
      moment.duration(dbTimeArrivee).asSeconds() -
      moment.duration(dbTimeDepart).asSeconds();

    res = formatSecondesAsText(tempsSpeciale, piloteTime.ams / 1000);
  }

  return res;
};

const sendTimeSmsToPilote = async (id_pilote, id_speciale) => {
  await sequelizeConnect.sync();
  const piloteTime = await Temps.findOne({ where: { id_pilote, id_speciale } });
  let piloteModel = await Pilote.findByPk(id_pilote);

  if (piloteTime && piloteTime.arrivee && piloteTime.depart) {
    const piloteTimeText = await getPiloteTempsBySpeciale(
      id_pilote,
      id_speciale
    );

    const hmsDepart = piloteTime.depart.split("T")[1];
    const hmsArrivee = piloteTime.arrivee.split("T")[1];
    const ams = piloteTime?.ams ? `${piloteTime.ams}`.substring(0, 3) : "000";
    const smsMessage =
      `Speciale: ${id_speciale}` +
      `\nEquipage: ${id_pilote} ${piloteModel.nom_pilote}/${piloteModel.nom_copilote}` +
      `\nDepart: ${hmsDepart}` +
      `\nArrivee: ${hmsArrivee}.${ams}` +
      `\nTEMPS\n` +
      `${piloteTimeText}`;

    await SmsOci.sendSmsOci(piloteModel.phone_number, smsMessage);
    await smsCopy(smsMessage);
  }
};

const formatSecondesAsText = (secs, ms) => {
  let time = moment().startOf("day").seconds(secs).format(`HH'mm"ss`);
  if (ms) time += `.${ms}`;
  return time;
};

const smsCopy = async (smsMessage) => {
  await sequelizeConnect.sync();

  const followers = await SmsCopy.findAll();
  for (const follower of followers) {
    await SmsOci.sendSmsOci(follower.phone, smsMessage);
  }
};

module.exports = {
  classementParSpeciale,
  getPiloteTempsBySpeciale,
  smsCopy,
  sendTimeSmsToPilote,
};
