const fileSystem = require('fs')

const getJSON = fileSystem.readFile('./public/json/cores/cores.json', (err, data) => {
    if (err) {
        console.log(err)
    }
    let cores = data.toString('utf8')
    return cores
})

const cores = getJSON

const loadCores =  (req, res) => {
    res.json(cores)
}

module.exports = loadCores