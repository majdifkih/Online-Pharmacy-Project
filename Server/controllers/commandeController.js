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

module.exports.getAllCommands = async (req, res) => {
  try {
    const allCommandes = await Commande.find()
              .populate('userId', 'username') 
              .populate('medicaments.medicId', 'nommedicament'); 
    allCommandes ? res.status(200).json(allCommandes) : res.send("not found");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.getCommandeByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userCommande = await Commande.find({ userId: id }).populate(
      "medicaments.medicId",
      "nom"
    );
    if (userCommande) {
      res.status(200).json(userCommande);
    } else {
      res.status(404).send("no commandes for this user");
    }
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.getOneCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const Commande = await Commande.find(id)
    .populate('userId', 'username') 
    .populate('medicaments.medicId', 'nom'); 
    if (Commande) {
      res.status(200).json(Commande);
    } else {
      res.status(404).send("no commande info");
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.ChangerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const userCommande = await Commande.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );

    if (userCommande) {
      res.status(200).json(userCommande);
    } else {
      res.status(404).send("No commandes for this user");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

