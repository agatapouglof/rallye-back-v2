'use strict';

let router = require('express').Router();

// Middleware
let middleware = require('./controllers/middleware');
router.use(middleware.doSomethingInteresting);

// Tasks
let tasks = require('./controllers/tasks');
let user = require('./controllers/user');
let temps = require('./controllers/temps');

router.get('/tasks', tasks.findAll);
router.post('/buggyroute', tasks.buggyRoute);

// users routes

/**
 * @api {get} /user/new Find a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiSuccess {user} created user object
 */
router.post('/user/new', user.createOne);
router.get('/users', user.findAll);
router.get('/user/:id', user.findOne);
router.put('/user/:id', user.updateOne);
router.delete('/user/:id', user.deleteOne);

// temps routes

router.post('/temps/new', temps.createOne);
router.get('/temps', temps.findAll);
router.get('/temps/:id', temps.findOne);
router.put('/temps/:id', temps.updateOne);
router.delete('/temps/:id', temps.deleteOne);
router.get('/classement', temps.classement);
router.get('/temps/speciale/:ordre_speciale', temps.speciale);

// Error Handling
let errors = require('./controllers/errors');
router.use(errors.errorHandler);

// Request was not picked up by a route, send 404
router.use(errors.nullRoute);

// Export the router
module.exports = router;
