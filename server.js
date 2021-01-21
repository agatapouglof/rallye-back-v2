'use strict';


// API boilerplate
require('custom-env').env(true);

let express = require('express');
var cors = require('cors');
let app = express();
var server = require('http').Server(app);
require('./sockets').listen(server);


app.use(cors());

let routes = require('./routes');

// Logging
let bodyParser = require('body-parser');
let morgan = require('morgan');

let fs = require('fs');
let FileStreamRotator = require('file-stream-rotator');
let logDirectory = __dirname + '/log';

// Config
let config = require('config');

// BodyParser allows us to get data out of URLs
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Log all requests in a daily log file using morgan
if (fs.existsSync(logDirectory) === false) {
  fs.mkdirSync(logDirectory);
}
let accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  date_format: "YYYYMMDD",
  verbose: false
});
app.use(morgan('combined', {stream: accessLogStream}));



// Load up the routes
app.use('/', routes);





// Start the API
// app.listen(process.env.PORT || config.apiPort );
server.listen(process.env.PORT || config.apiPort );
console.log("API running on port " + config.apiPort);




// Export API server for testing
// module.exports = app;
module.exports = server;
