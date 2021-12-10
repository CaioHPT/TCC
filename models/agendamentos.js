const sequelize = require('./db')
const DataTypes = require('sequelize')

const agendamentos = sequelize.define('agendamentos', {
    vendedor : DataTypes.STRING(14),
    comprador : DataTypes.STRING(14),
    localizacao : DataTypes.STRING(100),
    data_hora : DataTypes.DATE
})

module.exports = agendamentos