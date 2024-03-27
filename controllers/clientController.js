const Client = require("../models/client");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//registring Client
exports.registerClient = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const client = new Client({ username, email, password });
    await client.save();
    // Rediriger l'utilisateur vers la page de connexion après l'enregistrement réussi
    res.status(200).send("Client registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};



//login client
exports.loginClient = async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await Client.findOne({ username: username });
    if (!client) {
      return res.status(400).send("username is incorrect");
    }
    const VerifPassword = await bcyrpt.compare(password, client.password);
    if (!VerifPassword) {
      return res.status(400).send("password is incorrect");
    }
    const token = jwt.sign(
      { id: client._id, email: client.email },
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

//logout client
exports.logoutClient = async (req, res) => {
  await res.clearCookie("token");
  return res.status(200).send("logged out successfully");
};
