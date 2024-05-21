const Commande = require("../models/commande");
const Medicament = require("../models/medicament");
const nodeMailer = require("nodemailer");
const moment = require("moment");
require("dotenv").config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

module.exports.passerCommande = async (req, res) => {
  try {
    const { userId, medicaments } = req.body;
    const image = req.file ? req.file.path : null;
    const medicamentsArray = JSON.parse(medicaments);
    let prixTotal = 0;
    for (const medicament of medicamentsArray) {
      const { prix } = await Medicament.findById(medicament.medicId);
      prixTotal += medicament.quantity * prix;
    }
    const commande = new Commande({
      medicaments: medicamentsArray,
      userId: userId,
      PrixTotal: prixTotal,
      ordonnance: image,
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
      .populate("userId", "username")
      .populate("medicaments.medicId", "nom");
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
      .populate("userId", "username")
      .populate("medicaments.medicId", "nom");
    if (Commande) {
      res.status(200).json(Commande);
    } else {
      res.status(404).send("no commande info");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const sendEmail = async (to, subject, text) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: email, // Sender address
    to: to, // List of receivers
    subject: subject, // Subject line
    text: text, // Plain text body
  });
};

module.exports.ChangerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const userCommande = await Commande.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    ).populate("userId").populate("medicaments.medicId", "nom");

    if (userCommande) {
      const userEmail = userCommande.userId.email;
      const emailSubject = "Info about your command";
      const formattedDate = moment(userCommande.date).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      const emailText = `Your Command of ${formattedDate} is : ${status}`;
      await sendEmail(userEmail, emailSubject, emailText);
      res.status(200).json(userCommande);
    } else {
      res.status(404).send("No commandes for this user");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


module.exports.deleteCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findByIdAndDelete(id);
    if (commande) {
      res.status(200).json({ message: "Commande supprimée avec succès" });
    } else {
      res.status(404).json({ message: "Commande non trouvée" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur lors de la suppression de la commande");
  }
};