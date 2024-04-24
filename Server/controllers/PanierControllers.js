const  User=require("../models/user")
const medicanment = require("../models/medicament")

exports.panier=async(req,res)=>{
    try {
       const iduser= req.body.iduser
       const idcommande=req.body.idmedicamnt
     
       console.log(iduser);
       await User.findByIdAndUpdate({
        _id:iduser
       },
    {
        $push:{panier:idcommande}
    },
{new:true
})
    res.status(200).json("panier added with success")


        
    } catch (error) {
        console.log(error);
        res.status(400).json("failed to add panier")
        
    }
}
exports.getallpalnierbyuser=async(req,res)=>{
    try {
        const iduser=req.params.id
        const existuser= await User.findById({_id:iduser}).populate("panier")
        
        res.status(200).json(existuser.panier)
    } catch (error) {
        console.log(error);
        res.status(400).json("failed to get panier")
        
    }
}