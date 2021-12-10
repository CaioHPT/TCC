const clientes = require("../models/clientes");
const enderecos = require("../models/enderecos");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const usuario = require("../models/usuarios");
require('dotenv').config();

module.exports = (req, res) => {

    let message = ''
    let cnpj_cpf = req.body.cnpj_cpf
    let rg = req.body.rg

    function isNumber(num) {
        return !isNaN(num)
    }

    let rgArray = (rg.split('')).filter(isNumber);
    let cnpj_cpfArray = (cnpj_cpf.split('')).filter(isNumber);

    cnpj_cpf = ''
    rg = ''

    for (let i = 0; i < rgArray.length; i++) {
        rg += rgArray[i]
    }

    for (let i = 0; i < cnpj_cpfArray.length; i++) {
        cnpj_cpf += cnpj_cpfArray[i]
    }


    if ((req.body.senha == req.body.confsenha) && (req.body.email == req.body.confemail)) {

        message = 'Cliente inserido com sucesso !'

        let docFrente = 'documents/' + cnpj_cpf + req.files[0].originalname;
        let docVerso = 'documents/' + cnpj_cpf + req.files[1].originalname;

        enderecos
            .create({
                logradouro: (req.body.logradouro).toUpperCase(),
                numero: req.body.numero,
                bairro: (req.body.bairro).toUpperCase(),
                cidade: req.body.cidade,
                uf: req.body.uf,
                cep: req.body.cep
            })
            .then((endereco) => {
                console.log("-- correct create endereco")
                clientes
                    .create({
                        nome: (req.body.nome).toUpperCase(),
                        tipo: (req.body.tipo).toUpperCase(),
                        cnpj_cpf: cnpj_cpf,
                        rg: rg,
                        endereco: endereco.id,
                        telefone: req.body.telefone,
                        email: (req.body.email).toLowerCase(),
                        senha: sequelize.literal(
                            `AES_ENCRYPT('${req.body.senha}',${process.env.KEY_AES_ENCRYPT})`
                        ),

                        docFrente: docFrente,
                        docVerso: docVerso
                    })
                    .then((cliente) => {
                        usuario
                            .create({
                                email: (req.body.email).toLowerCase(),
                                senha: sequelize.literal(
                                    `AES_ENCRYPT('${req.body.senha}',${process.env.KEY_AES_ENCRYPT})`
                                ),
                                id_cliente: cliente.id
                            })
                        res.render('sucessoCliente'), console.log("-- correct create cliente")
                    });
            });

    } else {
        message = '* E-mails e/ou senhas não conferem. Tente novamente'
        return res.render('cadastro', { message: message }),
            console.log('-- correct read localizacoes ')
    }
};
