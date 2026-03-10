// Express Application
import express from "express";
import "dotenv/config";

// Port de l'application
const cfg = { port: process.env.PORT || 3000 };

const app = express();
const formidable = require("formidable");

app.set("view engine", "ejs");
app.set("views", "views");

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));
// Route pour afficher le formulaire
app.all("/", (req, res) => {
  if (req.method === "GET" || req.method === "POST") {
    res.render("form", {
      title: "Analyser les données GET",
      data: req.body ? req.body : req.query,
    });
  } else {
    next();
  }
});

// Démarrer le serveur
app.listen(cfg.port, () => {
  console.log(`Server is listening on port ${cfg.port}`);
});
