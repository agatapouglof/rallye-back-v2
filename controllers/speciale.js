'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let SpecialeModel = require('../models/speciale.js');

const Speciale = SpecialeModel(sequelizeConnect, Sequelize)


// get all speciales
exports.findAll = (req, res) => {
    Speciale.findAll().then(speciales => res.json(speciales))
};

// get speciale by id
exports.findOne = (req, res) => {
    Speciale.findByPk(req.params.id).then(speciales => res.json(speciales))
};

// update speciale by id
exports.updateOne = (req, res, next) => {
    Speciale.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [speciale] ]) {
   res.json(speciale);
 }).catch(next);
};

// create new speciale
exports.createOne = (req, res) => {
    Speciale.create(req.body).then(function(speciale) {
    res.json(speciale);
 })
};

// delete speciale by id
exports.deleteOne = (req, res) => {
    Speciale.destroy({where : {id : req.params.id }}).then(speciale =>  res.json(speciale))
};
