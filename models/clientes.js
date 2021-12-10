const sequelize = require('./db')
const DataTypes = require('sequelize')

const clientes = sequelize.define('clientes', {
    cnpj_cpf : DataTypes.STRING(14),
    tipo : DataTypes.STRING(10),
    nome : DataTypes.STRING(50),
    telefone : DataTypes.STRING(11),
    email : DataTypes.STRING(255),
    senha : DataTypes.BLOB,
    rg : DataTypes.STRING(9),
    endereco : DataTypes.INTEGER,
    docFrente : DataTypes.STRING(255),
    docVerso  : DataTypes.STRING(255)
})

module.exports = clientes