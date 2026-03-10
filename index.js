import express from "express";
import "dotenv/config";
import formidable from "formidable";
import path from "path";

const cfg = {
  port: process.env.PORT || 3000,
  dir: { uploads: "./uploads" },
};

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Sans ce middleware, les fichiers uploadés seraient stockés dans un dossier temporaire du système
app.use("/uploads", express.static(cfg.dir.uploads));

app.get("/", (req, res) => {
  res.render("form", {
    title: "Parse HTTP POST file data",
    data: {},
  });
});

app.post("/", (req, res, next) => {
  const form = formidable({
    uploadDir: cfg.dir.uploads,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const data = { ...fields };

    const fichier = Array.isArray(files.monfichier)
      ? files.monfichier[0]
      : files.monfichier;

    console.dir(files, { depth: null, color: true }); 
    
   if (fichier && fichier.size > 0) {
      data.filename = fichier.originalFilename;
      data.filetype = fichier.mimetype;
      data.filesize = Math.ceil(fichier.size / 1024) + " KB";
      data.uploadto = fichier.filepath;
    data.imageurl = "/uploads/" + path.basename(fichier.filepath);
    }

    res.render("form", {
      title: "Parse HTTP POST file data",
      data,
    });
  });
});



app.listen(cfg.port, () => {
  console.log(`Server is listening on port ${cfg.port}`);
});