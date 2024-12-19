const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connecté"))
  .catch((err) => console.error("Erreur de connexion  :", err));

// Routes
const routes = require("./routes");
app.use("/", routes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(` Serveur démarré `);
});
