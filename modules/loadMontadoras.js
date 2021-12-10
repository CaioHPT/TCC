const fileSystem = require('fs')

const getJSON = fileSystem.readFile('./public/json/montadoras/montadoras.json', (err, data) => {
    if (err) {
        console.log(err)
    }
    let montadoras = data.toString('utf8')
    return montadoras
})

const montadoras = getJSON

const loadMontadoras =  (req, res) => {
    res.json(montadoras)
}

module.exports = loadMontadoras