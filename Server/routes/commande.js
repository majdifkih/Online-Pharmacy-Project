const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const auth = require("../middleware/authentication");

router.post("/commande", commandeController.passerCommande);

module.exports = router;
