const sequelize = require('./db')
const DataTypes = require('sequelize')

const opcionais = sequelize.define('opcionais', {
    opcional : DataTypes.STRING(20)
})

module.exports = opcionais