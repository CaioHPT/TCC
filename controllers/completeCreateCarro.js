const carros = require('../models/carros')

module.exports = (req, res) => {
    carros
        .update({
            descricao : (req.body.teste).toUpperCase()
        }, 
        {
            where : {
                id : req.params.id
            }
        })
    .then(() => {
        res.redirect('/sucessoCarro')
        console.log('-- complete create carro'  + req.params.id)
    })

    .catch((err) => {
        console.log('-- incorrect update/create carro: ' + err)
    })
}