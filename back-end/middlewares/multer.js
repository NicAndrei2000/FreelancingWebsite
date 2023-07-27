const multer = require('multer');
const storage=multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits: {
    fileSize: 5*1024*1024
    },
    fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
    return cb( new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
    }
    })

    module.exports=upload;
