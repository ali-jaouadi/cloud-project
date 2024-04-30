const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const proprietaireAuth = require("../middlewares/proprietaireAuth");
const AdminAuth = require("../middlewares/adminAuth");
const stadeController = require("../Controllers/stadeController");
router.post('/add',proprietaireAuth,stadeController.ajoutStade)
router.get('/all',stadeController.getStades)
router.get('/demande',stadeController.getStadesDemande)
router.get('/nom/:nom',stadeController.getStadesByNom)
router.get('/id/:id',stadeController.getStadeById)
router.get('/proprietaire',proprietaireAuth,stadeController.getStadesByProprietaire)
router.put('/update/:id',proprietaireAuth,stadeController.updateStade)
router.put('/accepter/:id',AdminAuth,stadeController.accepterDemande)
router.put('/refuser/:id',AdminAuth,stadeController.refuserDemande)
router.put('/activer/:id',proprietaireAuth,stadeController.activerStade)
router.put('/desactiver/:id',proprietaireAuth,stadeController.desactiverStade)
router.get('/count',stadeController.countStades)
module.exports = router