const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const profil = require("./routes/profil")
const cookieParser = require("cookie-parser");
const cors = require('cors')
dotenv.config();

//database and port env variables
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/auth", auth);
app.use("", profil);
//connecting to database url and starting local server
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
