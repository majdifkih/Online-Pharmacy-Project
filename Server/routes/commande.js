const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/commande",
  upload.single("ordonnance"),
  commandeController.passerCommande
);
router.get("/listcommande", commandeController.getAllCommands);
router.get("/commande/:id", commandeController.getCommandeByUser);
router.put("/changestatus/:id", commandeController.ChangerStatus);
router.get("/onecommandinfo/:id", commandeController.ChangerStatus);
module.exports = router;
