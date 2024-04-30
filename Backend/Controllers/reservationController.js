const Reservation = require("../Models/Reservation");
const Stade = require("../Models/Stade");
exports.AddReservation =async (req, res) => {
    let date=new Date(req.body.date) //
    date.setHours(date.getHours()+1)
    req.body.date=date
    req.body.joueurId=req.body.user
    let startDate=new Date(req.body.date)
    let endDate= new Date(req.body.date)
    startDate.setHours(startDate.getHours()-1)
    startDate.setMinutes(startDate.getMinutes()-29)
    endDate.setHours(endDate.getHours()+1)
    endDate.setMinutes(endDate.getMinutes()+30)
    req.body.montant=req.body.equipe*5-10
    if(req.body.date<Date.now()) return res.status(400).json("date de reseervation doit etre superieur a la date actuel");
    let reservations = await Reservation.find({stadeId:req.body.stadeId,date:{$gte: startDate, $lt: endDate}});
    if(reservations.length>0) return res.status(400).json("il y a une autre reservation dans ce date essaie une a autre date");
    Reservation(req.body).save().then(() => {
        return res.status(200).json("Votre reservation a ete envoye avec success");
    }).catch(err => {
        console.log(err)
        res.status(500).send("Autre Erreur !");
    })
}

exports.getAllReservations =async (req, res) => {
    let stadesId=[]
    let stades = await Stade.find({proprietaire:req.body.user})
    stades.forEach(element => {
        stadesId.push(element._id)
    });
        Reservation.find({ stadeId:{ $in: stadesId } }).then((result)=> {
            res.status(200).send(result)  
        })    
}

// exports.getReservationsByStadeId = (req, res) => {
    
//     Reservation.find({ 'stadeId': req.body.stadeId }).then((result)=> {
//         res.status(200).send(result)   
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Server Error."
//         });
//     })
// }

exports.getReservationsByDate =async (req, res) => {
    let stadesId=[]
    let stades = await Stade.find({proprietaire:req.body.user})
    stades.forEach(element => {
        stadesId.push(element._id)
    });
    let d=new Date(req.params.date)
    d.setDate(d.getDate()+7)
    Reservation.find({ date: {$gte: req.params.date, $lt: d},stadeId:{ $in: stadesId }}).then((result)=> {
        res.status(200).send(result)   
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}

exports.countReservations = (req, res) => {
    try {
        Reservation.count({},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json("aucun reservation trouver")
        })
    } catch (e) {
        res.status(500).send(e || "autre erreur !");
    }
}