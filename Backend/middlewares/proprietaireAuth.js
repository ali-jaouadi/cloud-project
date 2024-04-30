const jwt = require("jsonwebtoken");
const User = require("../Models/User");
module.exports = async function (req, res, next) {
  try {
    const token=req.headers.authorization.replace('Bearer ',"")
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    
    req.body.user = payload.id;
    let userInformations = await User.findById(payload.id);
    if (!userInformations) return res.status(404).json({ message: "Le compte n'existe pas ou a été supprimé !" });
    if (userInformations.emailConfirmer == false) return res.status(400).json({ message: "Veuillez Confirmer votre email !" });
    if (userInformations.etatDeCompte == false) return res.status(400).send({ message: "votre compte a éte bloqué !" });
    if (userInformations.DeconnectionDate > payload.iat * 1000) return res.status(401).send({ message: "Votre session a été expiré veuillez vous reconnecter" });
    if (userInformations.role == "proprietaire") next();
    else return res.status(401).json({ message: "Vous n'avez pas la permission de faire cet action !" });
  } catch (e) {
    return res.status(500).send({ message: "JSON Web Token invalide ou expiré !" });
  }
};