const Stade = require("../Models/Stade");
const multer=require('multer');
const User = require("../Models/User");
const nodemailer = require('nodemailer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //   console.log(file);
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname.replace(' ', '_'));
    }
  })
const upload = multer({ storage: storage }).array('image')
exports.ajoutStade = (req, res) => {
    user=req.body.user
    images=[]
    upload(req, res, (err) => {
        req.files.forEach(element => {
            images.push(element.filename)
        });
        let coordonnes=req.body.coordonnes.split(",")
        req.body.coordonnes={long:coordonnes[0],lat:coordonnes[1]}
        let stade={
            proprietaire:user,
            nom:req.body.nom,
            coordonnes:{long:coordonnes[0],lat:coordonnes[1]},
            adresse:{ville:req.body.ville,rue:req.body.rue},
            terrains:req.body.terrains,
            capacite:req.body.capacite,
            images:images
        }
    try {
        Stade(stade).save().then(()=> {
            return res.status(200).json("Votre demande a ete bien reçu ");
        }).catch((error) => {
            return res.status(400).json("Erreur d'ajout !")
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e.error || "autre erreur");
    }
})
}

exports.updateStade = (req, res) => {
    console.log(req.params.id);
    try {
        let coordonnes=req.body.coordonnes.split(",")
        req.body.coordonnes={long:coordonnes[0],lat:coordonnes[1]}
        Stade.findByIdAndUpdate(req.params.id, { $set: {
            capacite:req.body.capacite ,coordonnes:req.body.coordonnes,nom:req.body.nom,
            'adresse.rue':req.body.rue ,'adresse.ville':req.body.ville } }, (err, result)=> {
            if (result) return res.status(200).json("Stade modifiée")
            if(err) return res.status(400).json( "Erreur");
        })
    } catch (e) {
        console.log(e);
        res.status(500).send("Autre erreur");
    }
}

exports.getStades =async (req, res) => {
    console.log("a");
    if(req.query.page==null||isNaN(req.query.page)||req.query.page==1) req.query.page=0
    if(req.query.ville==null) req.query.ville=""
    capacite=[req.query.capacite]
    if(req.query.capacite==null||req.query.capacite=="") capacite=[16,18]
   
    orderBy=""
    if(req.query.orderBy==null||req.query.orderBy!="nom"||req.query.orderBy!="capacite") orderBy={nom:1}
    if(req.query.orderBy=="capacite") orderBy={capacite:1}
    if(req.query.orderBy=="nom") orderBy={nom:1}
    try {
        Stade.find({ 'adresse.ville':{ $regex: req.query.ville},capacite:{"$in" :capacite},verifier:true,etat:true},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json("aucun stades trouver")
        }).skip(req.query.page*12).limit(12).sort(orderBy)
    } catch (e) {
        res.status(500).send(e || "autre erreur !");
    }
}

exports.getStadesDemande =async (req, res) => {
    try {
        Stade.find({verifier:false},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json("aucun stades trouver")
        })
    } catch (e) {
        res.status(500).send(e || "autre erreur !");
    }
}

exports.countStades = (req, res) => {
    try {
        Stade.count({verifier:true},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json("aucun stades trouver")
        })
    } catch (e) {
        res.status(500).send(e || "autre erreur !");
    }
}

exports.getStadeById = (req, res) => {
    try {
        Stade.findById(req.params.id).then((result) => {
            if (result) return res.status(200).json(result)
        }).catch((error) => {
            return res.status(400).json("Stade n'existe pas")
        })
    } catch (e) {
        res.status(500).send("autre erreur !");
    }
}
exports.getStadesByNom = (req, res) => {
    let nom = req.params.nom
    try {
        Stade.find({ nom: { $regex: nom },verifier:true,etat:true }, (err, result)=> {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun stade trouvé" })
        }).limit(10)
    } catch (e) {
        res.status(500).send({ message: e });
    }
}
exports.getStadesByProprietaire = (req, res) => {
    try {
        console.log(req.body.user);
        Stade.find({ proprietaire:req.body.user }, (err, result)=> {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun stade trouvé" })
        })
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

exports.accepterDemande =async (req, res) => {
    try {  
     const stade =await Stade.findById(req.params.id)
     const prop=await User.findById(stade.proprietaire)
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAILER_EMAIL_ID,
          pass: process.env.MAILER_PASSWORD
        },
      });
      var mailOptions = {
        to: prop.email,
        subject: 'Stade confirmer',
        text: "Bonjour "+prop.nom+" , votre stade a etait bien confirmer"

      };
      transporter.sendMail(mailOptions).then(()=> {
        return res.status(200).json('E-mail de confirmation envoyé!');
      })
        Stade.findByIdAndUpdate(req.params.id,{$set:{verifier:true}}, (err, result)=> {
            if (result) return res.status(200).json(result)
        })

    } catch (e) {
        res.status(500).send({ message: e });
    }
}

exports.refuserDemande =async (req, res) => {
    try {  
     const stade =await Stade.findById(req.params.id)
     const prop=await User.findById(stade.proprietaire)
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAILER_EMAIL_ID,
          pass: process.env.MAILER_PASSWORD
        },
      });
      var mailOptions = {
        to: prop.email,
        subject: 'Stade Refuser',
        text: "Bonjour "+prop.nom+" ,nous vouz informe que votre stade a etait refuser , pour plus d'information vous puvez nous contacter"

      };
      transporter.sendMail(mailOptions).then(()=> {
        return res.status(200).json('E-mail de confirmation envoyé!');
      })
        Stade.findByIdAndDelete(req.params.id, (err, result)=> {
            if (result) return res.status(200).json(result)
        })

    } catch (e) {
        res.status(500).send({ message: e });
    }
}


exports.activerStade = (req, res) => {
    try {  
        Stade.findByIdAndUpdate(req.params.id,{$set:{etat:true}}, (err, result)=> {
            if (result) return res.status(200).json("stade activer")
        })
    } catch (e) {
        res.status(500).send({ message: e });
    }
}
exports.desactiverStade = (req, res) => {
    try {  
        Stade.findByIdAndUpdate(req.params.id,{$set:{etat:false}}, (err, result)=> {
            if (result) return res.status(200).json("Stade desactiver")
        })
    } catch (e) {
        res.status(500).send({ message: e });
    }
}