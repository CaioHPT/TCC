const sequelize = require('./db')
const DataTypes = require('sequelize')

const opcionaisCarros = sequelize.define('opcionaisCarros', {
    opcional : DataTypes.INTEGER,
    id_carro : {
        type : DataTypes.INTEGER,
        references : {
            model : "carros",
            key : "id"
        }
    } 
})

module.exports = opcionaisCarros