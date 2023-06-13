const express = require("express");
const path = require("path");
const PORT = 3000;
const session = require("express-session");
const authRoutes = require("./routes/auth");
const authController = require("./controllers/authController");
const qrcodeController = require("./controllers/qrcodeController");
const logger = require("morgan");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.render("login", { loggedIn: req.session.user ? true : false });
});
app.get("/auth/logout", authController.logout);

app.get("/qrcode", qrcodeController.generateQRCode);
app.get("/video", qrcodeController.playVideo);

app.use("/", require("./routes/qrcode"));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
