const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema
const UserSchema = new mongoose.Schema({
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
        type: String
    },
    role: {
        type: String,
        default: "client"
    },
    prenom: {
        type: String
    },
    adresse: {
        type: String
    },
    telephone: {
        type: Number
    },
    panier:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medicament"
    }]
});

// Hashing password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});
UserSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;