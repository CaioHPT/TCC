const fileSystem = require('fs')

const getJSON = fileSystem.readFile('./public/json/estadosandcidades/estadosAndCidades.json', (err, data) => {
    if (err) {
        console.log(err)
    }
    let estadosAndCidades = data.toString('utf8')
    return estadosAndCidades
})

const estadosAndCidades = getJSON

const loadEstadosAndCidades =  (req, res) => {
    res.json(estadosAndCidades)
}

module.exports = loadEstadosAndCidades