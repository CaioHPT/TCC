const sequelize = require('./db')
const DataTypes = require('sequelize')

const usuario = sequelize.define('usuarios', {
    email: DataTypes.STRING,
    senha: DataTypes.BLOB,
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        }
    }
})

module.exports = usuario