const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    statut: {
        type: String,
        required: true
    }
});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;