const mongoose = require("mongoose");
const Medicament = require("./medicament");

const commandeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  medicaments: [
    {
      medicId: {
        type: mongoose.Schema.ObjectId,
        ref: "Medicament",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  PrixTotal: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  statut: {
    type: String,
    default: "pending",
  },
});

const Commande = mongoose.model("Commande", commandeSchema);

module.exports = Commande;
