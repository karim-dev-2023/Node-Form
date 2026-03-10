import express from "express";
import "dotenv/config";
import multer from "multer";
import path from "path";

const cfg = {
  port: process.env.PORT || 3000,
  dir: { uploads: "./uploads" },
};

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/uploads", express.static(cfg.dir.uploads));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cfg.dir.uploads);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.render("form", {
    title: "Parse HTTP POST file data",
    data: {},
  });
});

app.post("/", upload.single("monfichier"), (req, res) => {
  const data = { ...req.body };

  const fichier = req.file;

  console.dir(req.body, { depth: null, color: true });
  console.dir(req.file, { depth: null, color: true });

  if (fichier) {
    data.filename = fichier.originalname;
    data.filetype = fichier.mimetype;
    data.filesize = Math.ceil(fichier.size / 1024) + " KB";
    data.uploadto = fichier.path;
    data.imageurl = "/uploads/" + fichier.filename;
  }

  res.render("form", {
    title: "Parse HTTP POST file data",
    data,
  });
});

app.listen(cfg.port, () => {
  console.log(`Server is listening on port ${cfg.port}`);
});