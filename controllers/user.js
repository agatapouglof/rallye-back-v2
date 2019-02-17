'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let UserModel = require('../models/user.js');

const User = UserModel(sequelizeConnect, Sequelize)


// get all users
exports.findAll = (req, res) => {
  // console.log(req);
    User.findAll().then(users => res.json(users))
};

// get user by id
exports.findOne = (req, res) => {
    User.findByPk(req.params.id).then(users => res.json(users))
};

// update user by id
exports.updateOne = (req, res, next) => {
    User.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [user] ]) {
   res.json(user);
 }).catch(next);
};

// create new user
exports.createOne = (req, res) => {
    User.create(req.body).then(function(user) {
    res.json(user);
 })
};

// delete user by id
exports.deleteOne = (req, res) => {
    User.destroy({where : {id : req.params.id }}).then(user =>  res.json(user))
};
