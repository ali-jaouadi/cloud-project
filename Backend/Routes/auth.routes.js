const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const proprietaireAuth = require("../middlewares/proprietaireAuth");
const AdminAuth = require("../middlewares/adminAuth");
const authController=require('../Controllers/authController')
router.post('/login',authController.login)
router.post('/register',authController.register)
router.post('/logout',Auth,authController.logout)
router.put('/password',Auth,authController.changePassword)
router.post('/reclamation',authController.reclamer)
router.post('/activer',AdminAuth,authController.activerCompte)
router.post('/desactiver',AdminAuth,authController.desactiverCompte)
router.get('/confirmeEmail/:token',authController.confirmeEmail)
router.post('/forgot-password',authController.forgotPassword)
router.post('/reset-password',authController.resetPassword)
router.post('/email',authController.findByEmail)
router.get('/profile',Auth,authController.getUserData)
router.get('/all',Auth,authController.getAllUsers)
router.get('/:id',authController.getUserById)
router.get('/name/:id',authController.getUserName)
router.put('/image',Auth,authController.AjoutImage)
router.get('/image/:name',authController.getImage)
module.exports = router