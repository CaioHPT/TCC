const express = require('express')
const app = express()
const path = require('path')

const methodOverride = require('method-override')

const readCarroIndex = require('./controllers/readCarroIndex')
const countCarro = require('./controllers/countCarro')
const readCarroCatalogo = require('./controllers/readCarroCatalogo')
const createClienteAndEndereco = require('./controllers/createClienteAndEndereco')
const createCarro = require('./controllers/createCarro')
const continuesCreateCarro = require('./controllers/continuesCreateCarro')
const completeCreateCarro = require('./controllers/completeCreateCarro')

const flash = require("connect-flash")
const uploadCarro = require('./modules/uploadCarro')
const upload = require('./modules/upload')
const loadEstadosAndCidades = require('./modules/loadEstadosAndCidades')
const loadAnos = require('./modules/loadAnos')
const loadCores = require('./modules/loadCores')
const loadMontadoras = require('./modules/loadMontadoras')
const passport = require("passport")
const session = require("express-session")
const carros = require('./models/carros');
const fotosCarros = require('./models/fotosCarros')
const usuarios = require("./models/usuarios");
const clientes = require("./models/clientes");


const sequelize = require('./models/db')

require('dotenv').config()
require("./controllers/userLogin")(passport)

app.use(session({
    secret: process.env.KEY_AES_ENCRYPT,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    res.locals.teste = {}
    next()
})


app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/incluircarro', (req, res) => {
    if(req.isAuthenticated()){
        res.render('incluircarro01')
        console.log(req.user)
    }else{
        res.redirect('/login')
    }
})

app.get('/json/estadosandcidades/', loadEstadosAndCidades)
app.get('/json/cores/', loadCores)
app.get('/json/anos/', loadAnos)
app.get('/json/montadoras/', loadMontadoras)

app.get('/', countCarro)
app.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/personalInfo')
    }else{
        res.render('login')
    }
})

app.get('/cadastro', (req, res) => {let message = ''; res.render('cadastro', {message : message})})
app.post('/cadastro', upload.array('doc', 2), createClienteAndEndereco)

app.get('/catalogo' , readCarroIndex)

app.get('/personalInfo', (req, res) => {
    if (req.isAuthenticated()) {
        sequelize.query(`select cli.nome, cli.email, cli.telefone, ende.logradouro, ende.numero from clientes as cli
        inner join enderecos as ende
        on cli.endereco = ende.id 
        where cli.id = ${req.user.id_cliente};`)
            .then((usuario) => {
                const user = usuario[0][0]
                res.render('personalInfo', {
                    userInfo: {
                        nome: user.nome,
                        telefone: user.telefone,
                        email: user.email,
                        logradouro: user.logradouro,
                        numero: user.numero
                    }
                })
            })
    } else {
        res.redirect('/login')
    }
})

app.get('/alterPassword', (req, res) => {
    if (req.isAuthenticated()) {
        sequelize.query(`select cast(aes_decrypt(user.senha, ${process.env.KEY_AES_ENCRYPT})  as char ) as 'senha',
        cli.nome, cli.email, cli.telefone, user.id_cliente
        from usuarios user
        inner join clientes as cli
        ON user.id_cliente = cli.id
        where id_cliente=${req.user.id_cliente};`)
            .then((usuario) => {
                const user = usuario[0][0]
                res.render("alterPassword", {
                    userInfo: {
                        id_cliente: user.id_cliente,
                        nome: user.nome,
                        email: user.email,
                        telefone: user.telefone,
                        senha: user.senha
                    }
                })
            })
    } else {
        res.redirect('/login')
    }
})

app.get('/myCars', (req, res) => {
    if(req.isAuthenticated()){
        carros.findAll({
            where : {
                proprietario : req.user.id_cliente
            }
        })
        .then(carros => {
            fotosCarros.findAll()
            .then(fotoscarros => {
                clientes.findByPk(req.user.id_cliente)
                .then(cliente => {[
                    usuarios.findOne({
                        where : {
                            id_cliente : req.user.id_cliente                        }
                    })
                    .then(usuario => {
                        res.render("myCars", {
                            userInfo : usuario,
                            carros : carros,
                            fotosCarros : fotoscarros,
                            cliente : cliente
                        })
                    })
                ]})
            })
        })

    } else {
        res.redirect("/login")
    }
})

app.get('/signOut', (req, res) => {
    if(req.isAuthenticated()){
        req.logout()
        res.redirect('/')
    }else{
        res.redirect('/')
    }
})

app.post('/catalogo', readCarroIndex)
app.post('/catalogoBuscar', readCarroCatalogo)
app.post('/incluircarro', uploadCarro.array('fotoCarro', 3), createCarro)

app.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/personalInfo",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

app.put('/updateInfo/:id_cliente', (req, res) => {
    if(req.isAuthenticated()){
        const vetEndereco = req.body.endereco.split(',')
        const logradouro = vetEndereco[0]
        const numero = vetEndereco[1].split(' ')[1]

        sequelize.query(`SELECT endereco from clientes where id = ${req.params.id_cliente}`)
        .then((id) => {
            sequelize.query(`UPDATE usuarios SET email = '${req.body.email}' where id_cliente = ${req.params.id_cliente}`)

            sequelize.query(`UPDATE clientes SET nome = '${req.body.nome}', email = '${req.body.email}', telefone = '${req.body.telefone}' where id = ${req.params.id_cliente}`) 

            sequelize.query(`UPDATE enderecos SET logradouro = '${logradouro}', numero = '${numero}' where id = ${id[0][0].endereco}`)
        }).catch((err) => console.log(err))

        res.redirect('/personalInfo')
    }else{
        res.redirect("/")
    }
})

app.put('/updatePassword/:id_cliente', (req, res) => {
    if(req.isAuthenticated()){

        sequelize.query(`UPDATE usuarios SET senha = AES_ENCRYPT("${req.body.newPassword}", ${process.env.KEY_AES_ENCRYPT}) WHERE id_cliente = ${req.params.id_cliente};`)
        .then(() => {console.log("Correct update password from user")})

        sequelize.query(`UPDATE clientes SET senha = AES_ENCRYPT("${req.body.newPassword}", ${process.env.KEY_AES_ENCRYPT}) WHERE id = ${req.params.id_cliente};`)
        .then(() => {
            console.log("Correct update password from client")
            res.redirect('/alterPassword')
        })

    } else {
        res.redirect('/')
    }
})

app.put('/:id', uploadCarro.array('fotoCarro', 3), continuesCreateCarro)
app.put('/finaliza/:id', completeCreateCarro)
app.get('/sucessoCarro', (req, res) => {res.render('sucessoCarro')})

app.listen(process.env.PORT || 9090, () => {
    console.log(`-- Server running in port: ${process.env.PORT}.  Default: 9090 `)
})