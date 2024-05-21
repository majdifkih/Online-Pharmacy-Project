const express = require('express');

const router = express.Router();
const profilcontroller= require('../controllers/profilController')
// Display user
router.get('/profil/:userId',profilcontroller.displayUserInfo);

// Update user
router.put('/editprofil/:userId',profilcontroller.updateAccount);

// Delete user
router.delete('/delprofil/:userId',profilcontroller.deleteAccount);

router.post('/verifyPassword', profilcontroller.verifyPassword);
module.exports = router;