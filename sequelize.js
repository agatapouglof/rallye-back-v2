const Sequelize = require('sequelize')
let config = require('config');


console.log(config);
const sequelizeConnect = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port : config.db.port,
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

module.exports = {
  sequelizeConnect
}
