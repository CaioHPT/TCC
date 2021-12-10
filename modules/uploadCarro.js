const multer = require('multer')

const storage = multer.diskStorage ({
    destination : (req, file, cb) => {
        cb(null, './public/photos')
    },
    filename : (req, file, cb) => {
        cb(null,  req.params.id + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(err, false) 
    }
}

const uploadCarro = multer({ 
    storage: storage, 
    limits : {
        fileSize : 1280 * 720 * 5,
        files : 3
    },
    fileFilter : fileFilter
})

module.exports = uploadCarro