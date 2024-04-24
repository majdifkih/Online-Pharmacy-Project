const express = require("express");
const router = express.Router();
const panierController = require("../controllers/PanierControllers");

router.post("/addpanier", panierController.panier);
router.get("/getpanier/:id", panierController.getallpalnierbyuser);

module.exports = router;
