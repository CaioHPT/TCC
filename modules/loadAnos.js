const fileSystem = require('fs')

const getJSON = fileSystem.readFile('./public/json/anos/anos.json', (err, data) => {
    if (err) {
        console.log(err)
    }
    let anos = data.toString('utf8')
    return anos
})

const anos = getJSON

const loadAnos =  (req, res) => {
    res.json(anos)
}

module.exports = loadAnos