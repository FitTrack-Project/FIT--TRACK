const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const qrcodeController = require("../controllers/qrcodeController");

// 운동배우기 페이지
router.get("/qrcodePage", authController.isLoggedIn, qrcodeController.qrcodePage);

// 추천 qrcode
router.post("/deadlift", qrcodeController.generateQRCode);
router.post("/allinone", qrcodeController.generateAllInOneQRCode);
router.post("/squat", qrcodeController.generateSquatQRCode);
router.post("/ten", qrcodeController.generateTenQRCode);
router.post("/abs", qrcodeController.generateAbsQRCode);

router.get("/qrcode", qrcodeController.generateQRCode);
router.get("/video", qrcodeController.playVideo);
router.get("/index3", qrcodeController.index3);

module.exports = router;
