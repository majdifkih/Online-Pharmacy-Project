const Commande = require("../models/commande");
const Medicament = require("../models/medicament");

module.exports.passerCommande = async (req, res) => {
  try {
    const { userId } = req.body;
    const { medicaments } = req.body;
    let prixTotal = 0;
    for (const medicament of medicaments) {
      const { prix } = await Medicament.findById(medicament.medicId);
      prixTotal += medicament.quantity * prix;
    }
    const commande = new Commande({
      medicaments: medicaments,
      userId: userId,
      PrixTotal: prixTotal,
    });
    const verifCommande = await commande.save();
    verifCommande ? res.status(200).send(verifCommande) : res.send("error");
  } catch (err) {
    console.log(err.message);
  }
};
