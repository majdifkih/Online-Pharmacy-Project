const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const auth = require("../middleware/authentication");

router.post("/commande", commandeController.passerCommande);
router.get("/listcommande", commandeController.getAllCommands);
router.get("/commande/:id", commandeController.getCommandeByUser);
router.put("/changestatus/:id", commandeController.ChangerStatus);
router.get("/onecommandinfo/:id", commandeController.ChangerStatus);
module.exports = router;
