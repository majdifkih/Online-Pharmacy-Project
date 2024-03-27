const User = require("../models/user");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//registring User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
     // Vérifier si un utilisateur avec le rôle admin existe déjà
     const existingAdmin = await User.findOne({ role: 'admin' });

     // Si un administrateur existe déjà, retourner un message d'erreur
     if (existingAdmin) {
       return res.status(400).send("An admin user already exists. Only one admin user is allowed.");
     }
 
    const user = new User({ username, email, password, role });
    await user.save();
    // Rediriger l'utilisateur vers la page de connexion après l'enregistrement réussi
    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};



//login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send("username is incorrect");
    }
    const VerifPassword = await bcyrpt.compare(password, user.password);
    if (!VerifPassword) {
      return res.status(400).send("password is incorrect");
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token);
    return res.status(200).send("login successfully");
  } catch (err) {
    console.log(err.message);
  }
};

//logout user
exports.logoutUser = async (req, res) => {
  await res.clearCookie("token");
  return res.status(200).send("logged out successfully");
};