import http from "node:http";
import express from "express";
import "dotenv/config";

const cfg = { port: process.env.PORT || 3000 };

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  console.dir(req, { depth: null, color: true });
  res.render("form", {
    title: "Analyser les données GET",
    data: req.query,
  });
});

app.listen(cfg.port, () => {
  console.log(`Server is listening on port ${cfg.port}`);
});
