const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const profil = require("./routes/profil");
const medicament = require("./routes/medicament");
const commande = require("./routes/commande");
const panier=require("./routes/panierRoute")
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

//database and port env variables
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"))
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/auth", auth);
app.use("", profil);
app.use("/medicament", medicament);
app.use("", commande);
app.use("/panier",panier)//connecting to database url and starting local server
try {
  mongoose.connect(DATABASE_URL).then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  });
} catch (err) {
  console.log("error connecting ");
}
