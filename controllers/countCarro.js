const carros = require('../models/carros')

module.exports =  (req, res) => {
    carros
        .count()
        .then(carro => {
            console.log("USUÁRIO AUTÊNTICADO : ", req.user || null)
            return res.render('index', {
                carros : carro
            })
        })
        .catch(err => console.log('-- incorrect count. ' + err + req.user))
}
