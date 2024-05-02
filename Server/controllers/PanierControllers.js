const User = require("../models/user");

exports.panier = async (req, res) => {
  try {
    const iduser = req.body.iduser;
    const idcommande = req.body.idmedicamnt;
    await User.findByIdAndUpdate(
      {
        _id: iduser,
      },
      {
        $push: { panier: idcommande },
      },
      { new: true }
    );
    res.status(200).json("added!");
  } catch (error) {
    console.log(error);
    res.status(400).json("failed to add panier");
  }
};

exports.getallpalnierbyuser = async (req, res) => {
  try {
    const iduser = req.params.id;
    const existuser = await User.findById({ _id: iduser }).populate("panier");
    res.status(200).json(existuser.panier);
  } catch (error) {
    console.log(error);
    res.status(400).json("failed to get panier");
  }
};
