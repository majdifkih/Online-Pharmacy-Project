const User = require("../models/user");

exports.panier = async (req, res) => {
  try {
    const iduser = req.body.iduser;
    const idmedic = req.body.idmedicamnt;
    const isExist = await User.findOne({ _id:iduser,panier: req.body.idmedicamnt });
    if (isExist) {
      return res.json("Exists");
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
      return res.json("Added!");
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

exports.deleteItemFromPanier = async (req, res) => {
  try {
    const userId = req.body.userId;
    const medicId = req.body.medicId;
    const newPanier = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { panier: medicId },
      },
      { new: true }
    );
    res.json("Medication removed from panier successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to remove medication from panier");
  }
};
