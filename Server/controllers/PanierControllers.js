const User = require("../models/user");

exports.panier = async (req, res) => {
  try {
    const iduser = req.body.iduser;
    const idmedic = req.body.idmedicamnt;
    const isExist = await User.findOne({ panier: req.body.idmedicamnt });
    console.log(isExist);
    if (isExist) {
      return res.json("Vous avez Déja ajouter ce produit dans le panier");
    } else if (!isExist) {
      await User.findByIdAndUpdate(
        {
          _id: iduser,
        },

        {
          $push: { panier: idmedic },
        },
        { new: true }
      );
      return res.json("added!");
    }
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
