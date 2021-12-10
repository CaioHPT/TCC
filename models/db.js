const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_NAME,  process.env.USER_DATABASE, process.env.USER_PASSWORD, {
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
})

sequelize.authenticate()
    .then(() => console.log('-- brothers-cars database connection estabilished'))
    .catch((err) => console.log('-- brothers-cars database connection: ' + err))

sequelize.sync()

module.exports = sequelize