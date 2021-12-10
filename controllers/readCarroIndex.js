const carros = require('../models/carros')
const fotosCarros = require('../models/fotosCarros')
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = (req, res) => {

    let montadora = ''
    let modelo = ''

    if (req.body.searchCarro == undefined) {
        montadora = '%'
        modelo = '%'

    } else {
        montadora = `${req.body.searchCarro}%`
        modelo = `${req.body.searchCarro}%`
    }

    carros.findAll({
        where: {
           [Op.all]: sequelize.literal(`modelo LIKE '${modelo}' OR montadora LIKE '${montadora}'`)
        }
    }).then((carro) => {
        fotosCarros
            .findAll()
            .then((foto) => {
                return res.render('catalogo', {
                    carros : carro,
                    fotos : foto
                }, 
                console.log('-- correct read'))
            })
    }).catch((err) => {console.log('-- incorret read. ' + err)})
}