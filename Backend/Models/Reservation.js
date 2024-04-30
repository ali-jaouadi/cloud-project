const mongose = require('mongoose')
const ReservationSchema = mongose.Schema({
    stadeId: {
        type: String,
        required: true
    },
    joueurId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    montant: {
        type: Number,
        default: 60
    },
})
module.exports = mongose.model('Reservation', ReservationSchema)