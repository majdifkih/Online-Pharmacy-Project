const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const auth = require("../middleware/authentication");

router.post("/commande", commandeController.passerCommande);
router.get("/listcommande", commandeController.listCommandes);
router.get("/commande/:id", commandeController.getCommandeByUser);

module.exports = router;
