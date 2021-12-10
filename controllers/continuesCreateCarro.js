const carros = require('../models/carros')
const fotosCarros = require('../models/fotosCarros')

module.exports = (req, res) => {

    let foto1 = 'photos/' + req.params.id + '_' + req.files[0].originalname
    let foto2 = 'photos/' + req.params.id + '_' + req.files[1].originalname
    let foto3 = 'photos/' + req.params.id + '_' + req.files[2].originalname

    let preco = req.body.preco
    let quilometragem = req.body.quilometragem
    let quilometragemArray
    let precoArray
    
    function isNumber(num) {
        return !isNaN(num)
    }
    
    quilometragemArray = (quilometragem.split('')).filter(isNumber);
    precoArray = (preco.split('')).filter(isNumber);
    preco = ''
    quilometragem = ''
    
    for (let i=0; i<precoArray.length; i++) {
        preco += precoArray[i]
    }
    preco = Number(preco).toFixed(2) / 100
    
    for (let i=0; i<quilometragemArray.length; i++) {
        quilometragem += quilometragemArray[i]
    }

    fotosCarros
        .create({
            id_carro : req.params.id,
            foto1 : foto1,
            foto2 : foto2,
            foto3 : foto3
        })

    carros
        .update({
            combustivel : req.body.combustivel,
            cambio : req.body.cambio,
            quilometragem : quilometragem,
            preco : preco,
            descricao : (req.body.descricao).toUpperCase(),
        }, 
        {
            where : {
                id : req.params.id
            }
        })
    .then(() => {
        res.render('sucessoCarro', {
            id : req.params.id
        })
        console.log('-- correct update/create carro')
    })

    .catch((err) => {
        console.log('-- incorrect update/create carro: ' + err)
    })

}
