'use strict';

const Sequelize = require('sequelize');
let moment = require('moment');


let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let TempsModel = require('../models/temps.js');

const Temps = TempsModel(sequelizeConnect, Sequelize)

let PiloteModel = require('../models/pilote.js');

const Pilote = PiloteModel(sequelizeConnect, Sequelize);
// Temps.hasOne(Pilote, { foreignKey: 'id_pilote' ,as :  'pilote' });



// get all tempss
exports.findAll = (req, res) => {
  console.log(req);
    Temps.findAll().then(temps => res.json(temps))
};

// get temps by id
exports.findOne = (req, res) => {
    Temps.findByPk(req.params.id).then(temps => res.json(temps))
};

// update temps by id
exports.updateOne = (req, res, next) => {
    Temps.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [temps] ]) {
   res.json(temps);
 }).catch(next);
};

// create new temps
exports.createOne = (req, res) => {
    Temps.create(req.body).then(function(temps) {
    res.json(temps);
 })
};

// delete temps by id
exports.deleteOne = (req, res) => {
    Temps.destroy({where : {id : req.params.id }}).then(temps =>  res.json(temps))
};

// classement by speciales
exports.speciale = (req, res) => {
    console.log("is in speciale")
    Pilote.hasMany(Temps, {foreignKey: 'id_pilote'});
    Temps.belongsTo(Pilote, {foreignKey: 'id_pilote'});
    Temps.findAll({where : {ordre_speciale : req.params.ordre_speciale}, include  : [Pilote]
    }).then(temps => {
      temps.forEach( elt => {
        // console.log(elt.temps)
        if(elt.depart && elt.arrivee){
          let dbTimeDepart = elt.depart.split('T')[1];
          let dbTimeArrivee = elt.arrivee.split('T')[1];
          // let timeMomentDepart = moment().set(dbTimeDepart, 'HH:mm:ss');
          // let timeMomentArrivee = moment().set(dbTimeArrivee, 'HH:mm:ss');
          let tempsSpeciale = moment.duration(dbTimeArrivee).asSeconds() - moment.duration(dbTimeDepart).asSeconds() + (elt.ams / 1000000);
          elt.temps = tempsSpeciale;
        }else {
          // delete elt;
        }
      })
      temps = temps.filter(function(el){
        // console.log(el)
        return el.temps > 0 ;})
      // console.log(temps);
      temps.sort(function(a, b){return Number(a.temps) - Number(b.temps)});
      res.json(temps)
    })
};



exports.classement = (req, res) => {
    Pilote.hasMany(Temps, {foreignKey: 'id_pilote'});
    Pilote.findAll({include  : [Temps]}).then(temps => {
      let nbSepciale  = 0;
      // console.log(temps.length)
      temps.forEach(function(elt){ if(elt.temps.length > nbSepciale ) nbSepciale = elt.temps.length; });
      temps = temps.filter(function(elt){ return elt.temps.length == nbSepciale })
      // temps.forEach(elt => console.log(elt.temps.length));
      temps.forEach(pilote => {
        let totalTime = 0;
        pilote.temps.forEach(function(tmp){
            if(tmp.depart && tmp.arrivee){
              let dbTimeDepart = tmp.depart.split('T')[1];
              let dbTimeArrivee = tmp.arrivee.split('T')[1];
              let tempsSpeciale = moment.duration(dbTimeArrivee).asSeconds() - moment.duration(dbTimeDepart).asSeconds() + (tmp.ams / 1000000);
              totalTime += tempsSpeciale;
              // console.log(totalTime)
            }
        })

        pilote.arc = totalTime;
        console.log(pilote)
      });
      temps.sort(function(a, b){return Number(a.arc) - Number(b.arc)});

      // console.log(nbSepciale);
      console.log(temps.length)
      // setTimeout(function(elt){
        res.json(temps)
      // },3000)
    });
};
