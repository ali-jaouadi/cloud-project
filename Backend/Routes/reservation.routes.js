const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const proprietaireAuth = require("../middlewares/proprietaireAuth");
const ReservationController = require("../Controllers/reservationController");
router.post('/reserver',Auth,ReservationController.AddReservation)
router.get('/all',proprietaireAuth,ReservationController.getAllReservations)
router.get('/date/:date',proprietaireAuth,ReservationController.getReservationsByDate)
router.get('/count',ReservationController.countReservations)
// router.get('/proprietaire',Auth,ReservationController.getProprietaireReservation)
module.exports = router