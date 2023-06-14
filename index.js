const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = 8000;

app.use(morgan("dev"));

// 템플릿
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 시작지점 기본주소 (localhost:8000)
const defaultRouter = require("./routes/postBord");
app.use("/", defaultRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
