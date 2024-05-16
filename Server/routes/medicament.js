const express = require("express");
const medicamentController = require("../controllers/medicamentController");
const router = express.Router();
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
// GET /medicaments
router.get("/", medicamentController.listMedicaments);

// GET /medicaments/:id
router.get("/onemedicat/:id", medicamentController.oneMedicament);

//Search Médicaments
router.get("/search", medicamentController.searchMedic);

// POST /medicaments
router.post(
  "/add",
  upload.any("image"),
  medicamentController.addMedicament
);

// PUT /medicaments/:id
router.put("/edit/:id", upload.single('image'),medicamentController.editMedicament);

// DELETE /medicaments/:id
router.delete("/del/:id", medicamentController.deleteMedicament);

module.exports = router;
