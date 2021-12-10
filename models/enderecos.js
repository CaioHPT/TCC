const sequelize = require('./db')
const DataTypes = require('sequelize')

const enderecos = sequelize.define('enderecos', {
    logradouro : DataTypes.STRING(50),
    numero : DataTypes.STRING(7),
    bairro : DataTypes.STRING(30),
    cidade : DataTypes.STRING(30),
    uf : DataTypes.STRING(2),
    cep : DataTypes.STRING(8)
})

module.exports = enderecos