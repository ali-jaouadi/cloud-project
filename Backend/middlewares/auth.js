const jwt = require("jsonwebtoken");
const User = require("../Models/User");
module.exports = async function (req, res, next) {
  try {
    const token=req.headers.authorization.replace('Bearer ',"")
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.body.user = payload.id;
    let userInformations = await User.findById(payload.id);
    if (!userInformations) return res.status(404).json("Le compte n'existe pas ou a été supprimé !");
    if (userInformations.emailConfirmer == false) return res.status(400).json("Veuillez Confirmer votre email !");
    if (userInformations.etatDeCompte == false) return res.status(400).send("votre compte a éte bloqué !" );
    if (userInformations.DeconnectionDate > payload.iat * 1000) return res.status(401).send("Votre session a été expiré veuillez vous reconnecter" );
    else next();
  } catch (e) {
    return res.status(500).send("Erreur d'identification veuillez reconnecter !");
  }
};