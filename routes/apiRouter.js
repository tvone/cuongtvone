var express = require('express');
var router = express.Router();
const uploadCtrl = require('../controllers/uploadCtrl');
const verifyToken = require('../middleware/auth')
const uploadIMG = require('../middleware/uploadIMG')

router.post('/upload_avatar',uploadIMG,verifyToken,uploadCtrl.uploadAvatar)











module.exports = router