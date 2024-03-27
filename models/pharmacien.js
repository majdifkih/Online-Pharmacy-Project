const mongoose = require('mongoose');

const pharmacienSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Pharmacien = mongoose.model('Pharmacien', pharmacienSchema);

module.exports = Pharmacien;