const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    quantite: {
        type: Number,
        required: true
    }
});

const Medicament = mongoose.model('Medicament', medicamentSchema);

module.exports = Medicament;
