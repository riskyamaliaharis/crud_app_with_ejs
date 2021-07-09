const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const connectDB = require("./server/database/connection");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(morgan("tiny"));

connectDB();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("card")
);

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.set(`css`, express.static(path.resolve(__dirname, "assets/css")));
app.set(`img`, express.static(path.resolve(__dirname, "assets/img")));
app.set(`js`, express.static(path.resolve(__dirname, "assets/js")));

app.use("/", require("./server/routes/router"));
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
