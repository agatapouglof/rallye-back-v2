const Sequelize = require('sequelize')
let config = require('config');


// console.log(config);
const sequelizeConnect = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port : process.env.DB_PORT,
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
