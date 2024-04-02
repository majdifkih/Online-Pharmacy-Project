const Medicament = require('../models/medicament');

// Fonction pour lire tous les médicaments
module.exports.listMedicaments = async (req, res) => {
    try {
        // Récupérer tous les médicaments de la base de données
        const medicaments = await Medicament.find();

        res.json(medicaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Fonction pour lire un médicament par son ID
module.exports.oneMedicament = async (req, res) => {
    try {
        const { id } = req.params;

        // Rechercher le médicament par son ID dans la base de données
        const medicament = await Medicament.findById(id);

        if (!medicament) {
            return res.status(404).json({ message: 'Médicament non trouvé' });
        }

        res.json(medicament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour ajouter un médicament
module.exports.addMedicament = async (req, res) => {
    try {
        const { nom, description, prix, quantite } = req.body;

        // Créer une nouvelle instance de Medicament
        const nouveauMedicament = new Medicament({
            nom,
            description,
            prix,
            quantite,
        });

        // Mettre à jour le statut du médicament en fonction de la quantité
        if (nouveauMedicament.quantite <= 0) {
            nouveauMedicament.statut = 'Indisponible';
        } else {
            nouveauMedicament.statut = 'Disponible';
        }

        // Enregistrer le médicament dans la base de données
        const medicament = await nouveauMedicament.save();

        res.status(201).json(medicament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fonction pour modifier un médicament
module.exports.editMedicament = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, prix, quantite } = req.body;

        // Rechercher le médicament par son ID et le mettre à jour
        const medicament = await Medicament.findByIdAndUpdate(
            id,
            { nom, description, prix, quantite },
            { new: true }
        );

        if (!medicament) {
            return res.status(404).json({ message: 'Médicament non trouvé' });
        }

        // Mettre à jour le statut du médicament si la quantité est inférieure à 10
        if (medicament.quantite <= 0) {
            medicament.statut = 'Indisponible';
        } else {
            medicament.statut = 'Disponible';
        }

        // Enregistrer les modifications dans la base de données
        await medicament.save();

        res.json(medicament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fonction pour supprimer un médicament
module.exports.deleteMedicament = async (req, res) => {
    try {
        const { id } = req.params;

        // Rechercher le médicament par son ID et le supprimer
        const medicament = await Medicament.findByIdAndDelete(id);

        if (!medicament) {
            return res.status(404).json({ message: 'Médicament non trouvé' });
        }

        res.json({ message: 'Médicament supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




