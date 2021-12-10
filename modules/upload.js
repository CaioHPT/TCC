const multer = require('multer')


const storage = multer.diskStorage ({
    destination : (req, file, cb) => {
        cb(null, './public/documents')
    },
    filename : (req, file, cb) => {

        let cnpj_cpf = req.body.cnpj_cpf

        function isNumber(num) {
            return !isNaN(num)
        }

        let cnpj_cpfArray =  (cnpj_cpf.split('')).filter(isNumber);

        cnpj_cpf = ''
    
        for (let i=0; i<cnpj_cpfArray.length; i++) {
            cnpj_cpf += cnpj_cpfArray[i]
        }

        cb(null,  cnpj_cpf + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(err, false) 
    }
}

const upload = multer({ 
    storage: storage, 
    limits : {
        fileSize : 1280 * 720 * 5,
        files : 2
    },
    fileFilter : fileFilter
})

module.exports = upload