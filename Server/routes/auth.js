const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

//post methods
router.post("/register", clientController.registerClient);
router.post("/login", clientController.loginClient);
router.post("/logout", clientController.logoutClient);

module.exports = router;
