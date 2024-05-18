const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  medicaments: [
    {
      medicId: {
        type: mongoose.Schema.Types.ObjectId,
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
  status: {
    type: String,
    default: "Pending",
  },
  ordonnance: {
    type: String,
  },
});

const Commande = mongoose.model("Commande", commandeSchema);

module.exports = Commande;
