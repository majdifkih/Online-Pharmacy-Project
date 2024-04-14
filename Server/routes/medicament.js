const express = require("express");
const medicamentController = require("../controllers/medicamentController");

const router = express.Router();

// GET /medicaments
router.get("/", medicamentController.listMedicaments);

// GET /medicaments/:id
router.get("/onemedicat/:id", medicamentController.oneMedicament);

//Search Médicaments
router.get("/search", medicamentController.searchMedic);

// POST /medicaments
router.post("/add", medicamentController.addMedicament);

// PUT /medicaments/:id
router.put("/edit/:id", medicamentController.editMedicament);

// DELETE /medicaments/:id
router.delete("/del/:id", medicamentController.deleteMedicament);

module.exports = router;
