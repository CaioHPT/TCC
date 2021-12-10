const sequelize = require('./db')
const DataTypes = require('sequelize')

const fotosCarros = sequelize.define('fotosCarros', {
    id_carro : {
        type : DataTypes.INTEGER,
        references: {
            model: 'carros',
            key: 'id'
        }
    },
    foto1 : DataTypes.STRING(),
    foto2 : DataTypes.STRING(),
    foto3 : DataTypes.STRING()
})

module.exports = fotosCarros