var express = require('express');
const userCtrl = require('../controllers/userCtrl');
var router = express.Router();
const verifyToken = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// Register : 
router.post('/register',userCtrl.register)

//Activate Email:
router.post('/activate',userCtrl.activateEmail)

//Login:
router.post('/login',userCtrl.login)

//Get ACCESS TOKEN:
router.post('/refresh_token',userCtrl.getAccessToken)

// Forgot Password:
router.post('/forgot',userCtrl.forgotPassword)

//Reset Password :
router.post('/reset',verifyToken,userCtrl.resetPassword)

// Get Info User:
router.get('/infor',verifyToken,userCtrl.getUserInfo)

//Get All Info Users:
router.get('/all_infor',verifyToken,authAdmin,userCtrl.getAllUsersInfo)

//Logout:
router.get('/logout',userCtrl.logout)

//Update user:
router.patch('/update',verifyToken,userCtrl.updateUser)

// Update all users:
router.patch('/update_role/:id',verifyToken,authAdmin,userCtrl.updateUsersRole)

// Delete User:
router.delete('/delete/:id',verifyToken,authAdmin,userCtrl.deleteUser)

// Cart: 
router.patch('/add_cart',verifyToken,userCtrl.addCart)

router.post('/delete_cart',verifyToken,userCtrl.deleteCart)

// Socical :
router.post('/google_login',userCtrl.googleLogin)

router.post('/facebook_login',userCtrl.facebookLogin)

module.exports = router;