const usuario = require('../models/usuarios')
const sequelize = require('../models/db')
const localStrategy = require("passport-local").Strategy


module.exports = (passport) => {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        usuario.findOne({where: { email: email}})
            .then((usuario) => {
                if(usuario == undefined){
                    console.log('usuario não existe')
                    return done(null, false, { message: 'Usuario não existe'})
                }
                sequelize.query(`select cast(aes_decrypt(senha, ${process.env.KEY_AES_ENCRYPT})  as char) as 'senha', id_cliente, id from usuarios  where email='${email}'`)
                .then((usuario) => {
                    if(usuario[0][0].senha != senha){
                        return done(null, false, { message: "Senha invalida"})
                    }
                    const user = usuario[0][0]
                    return done(null, user)
                })
            })
            .catch((err) => console.log(err))
    }))
    

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        usuario.findByPk(id)
          .then((usuario) => {
            if(!usuario) {
              let error = new Error("Não identificado")
              done(error, usuario)
    
            } else {
              done(null, usuario)
            }
          })
          .catch(error => console.log(error))
      })
}
