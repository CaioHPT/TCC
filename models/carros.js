const sequelize = require('./db')
const DataTypes = require('sequelize')

const carros = sequelize.define('carros', {
    placa : DataTypes.STRING(7),
    modelo : DataTypes.STRING(30),
    descricao : DataTypes.STRING(200),
    montadora : DataTypes.STRING(30),
    portas : DataTypes.INTEGER,
    carroceria: DataTypes.STRING(20),
    anofabricacao : DataTypes.STRING(4),
    anomodelo : DataTypes.STRING(4),
    localizacao : DataTypes.STRING(255),
    cor : DataTypes.STRING(30),
    situacao : DataTypes.BOOLEAN,
    combustivel : DataTypes.STRING(10),
    quilometragem : DataTypes.STRING(6),
    cambio : DataTypes.STRING(15),
    preco : DataTypes.FLOAT,
    proprietario : {
        type : DataTypes.INTEGER,
        references : {
            model : 'clientes',
            key : 'id'
        }
    },
    blindado : DataTypes.BOOLEAN
})

module.exports = carros