const User = require("../models/user"); 
const Commande = require("../models/commande");
// Afficher toutes les informations de l'utilisateur
exports.displayUserInfo = async (req, res) => {
    try {
        const { userId } = req.params; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête

        // Trouve l'utilisateur par son ID
        const user = await User.findById(userId);
        

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: "Utilisateur introuvable" });
        }
    } catch (error) {
        res.status(500).json({ error: "Échec de l'affichage des informations de l'utilisateur" });
    }
};
// Mettre à jour le compte utilisateur
exports.updateAccount = async (req, res) => {
    try {
        const { userId } = req.params; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête
        const { username, email, password, prenom, adresse,telephone } = req.body; // Récupère le nom, l'email, le mot de passe, l'âge et l'adresse depuis le corps de la requête

        // Trouve l'utilisateur par son ID
        const user = await User.findById(userId);

        // Met à jour les informations de l'utilisateur
        user.username = username;
        user.email = email;
        user.password = password;
        user.prenom = prenom;
        user.adresse = adresse;
        user.telephone = telephone;
        // Sauvegarde l'utilisateur mis à jour
        await user.save();

        res.status(200).json({ message: "Compte mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Échec de la mise à jour du compte" });
    }
};

// Supprimer le compte utilisateur
exports.deleteAccount = async (req, res) => {
    try {
        const { userId } = req.params; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête
        console.log(userId);

        // Supprime toutes les commandes associées à l'utilisateur
        await Commande.deleteMany({ userId });

        // Trouve l'utilisateur par son ID et le supprime
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "Compte et commandes supprimés avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Échec de la suppression du compte et des commandes" });
    }
};



// Controller function
module.exports.verifyPassword = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ isValid: false, message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password); // assuming comparePassword is a method in your user model
        if (isMatch) {
            return res.status(200).json({ isValid: true });
        } else {
            return res.status(400).json({ isValid: false, message: 'Password incorrect' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

