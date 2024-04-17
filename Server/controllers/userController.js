const User = require("../models/user");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registring User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, prenom, adresse, telephone } = req.body;
    const user = new User({
      username,
      email,
      password,
      prenom,
      adresse,
      telephone,
    });
    await user.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json("Invalid username");
    }
    const VerifPassword = await bcyrpt.compare(password, user.password);
    if (!VerifPassword) {
      return res.status(401).json("Invalid password");
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
  }
};

//logout user
exports.logoutUser = async (req, res) => {
  await res.clearCookie("token");
  return res.status(200).send("logged out successfully");
};
