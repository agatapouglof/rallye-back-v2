"use strict";

const Sequelize = require("sequelize");
let moment = require("moment");

let { formatReceivedTime } = require("../helpers/index.js");
const {
  classementParSpeciale,
  sendTimeSmsToPilote,
} = require("../helpers/time-manager.js");

let config = require("config");
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

// Temps.hasOne(Pilote, { foreignKey: 'id_pilote' ,as :  'pilote' });

// get all tempss
exports.findAll = (req, res) => {
  Temps.findAll().then((temps) => res.json(temps));
};

// get temps by id
exports.findOne = (req, res) => {
  Temps.findByPk(req.params.id).then((temps) => res.json(temps));
};

// update temps by id
exports.updateOne = (req, res, next) => {
  Temps.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(function ([rowsUpdate, [temps]]) {
      res.json(temps);
    })
    .catch(next);
};

// create new temps
exports.createOne = (req, res) => {
  Temps.create(req.body).then(function (temps) {
    res.json(temps);
  });
};

// delete temps by id
exports.deleteOne = (req, res) => {
  Temps.destroy({ where: { id: req.params.id } }).then((temps) =>
    res.json(temps)
  );
};

// add or update time from local api to server
exports.pushTime = async (req, res) => {
  const { inputTime } = req.body;

  let inputTimeFormated = formatReceivedTime(inputTime);

  const { id_pilote, id_speciale } = inputTimeFormated;

  try {
    let timeModel = await Temps.findOne({ where: { id_pilote, id_speciale } });

    if (timeModel) {
      if (inputTimeFormated.hasOwnProperty("depart")) {
        timeModel.depart = inputTimeFormated.depart;
      }
      if (inputTimeFormated.hasOwnProperty("arrivee")) {
        timeModel.arrivee = inputTimeFormated.arrivee;
        timeModel.ams = inputTimeFormated.ams;
      }
      await timeModel.save();
      await sendTimeSmsToPilote(id_pilote, id_speciale);

      return res.sendStatus(200);
    }
    const temps = await Temps.create(inputTimeFormated);

    await SmsOci.sendSmsOci(piloteModel.phone_number, smsMessage);
    await smsCopy(smsMessage);

    return res.json(temps);
  } catch (error) {
    console.error(error);
  }
};

// classement by speciales
exports.speciale = async (req, res) => {
  const temps = await classementParSpeciale(req.params.ordre_speciale);
  return res.json(temps);
};

exports.classement = (req, res) => {
  Pilote.hasMany(Temps, { foreignKey: "id_pilote" });
  Pilote.findAll({ include: [Temps] }).then((temps) => {
    let nbSepciale = 0;
    // console.log(temps.length)
    temps.forEach(function (elt) {
      if (elt.temps.length > nbSepciale) nbSepciale = elt.temps.length;
    });
    temps = temps.filter(function (elt) {
      return elt.temps.length == nbSepciale;
    });
    // temps.forEach(elt => console.log(elt.temps.length));
    temps.forEach((pilote) => {
      let totalTime = 0;
      pilote.temps.forEach(function (tmp) {
        if (tmp.depart && tmp.arrivee) {
          let dbTimeDepart = tmp.depart.split("T")[1];
          let dbTimeArrivee = tmp.arrivee.split("T")[1];
          let tempsSpeciale =
            moment.duration(dbTimeArrivee).asSeconds() -
            moment.duration(dbTimeDepart).asSeconds() +
            tmp.ams / 1000000;
          totalTime += tempsSpeciale;
          // console.log(totalTime)
        }
      });

      pilote.arc = totalTime;
    });
    temps = temps.filter(function (el) {
      return el.arc > 0;
    });
    temps.sort(function (a, b) {
      return Number(a.arc) - Number(b.arc);
    });

    res.json(temps);
  });
};
