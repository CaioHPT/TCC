const sequelize = require('./db')
const DataTypes = require('sequelize')

const vendas = sequelize.define('vendas', {
    vendedor : DataTypes.STRING(14),
    comprador : DataTypes.STRING(14),
    valor : DataTypes.FLOAT,
    data : DataTypes.DATE
})

module.exports = vendas