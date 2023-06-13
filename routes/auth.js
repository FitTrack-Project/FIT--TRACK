const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 회원가입 페이지
router.get("/register", authController.registerPage);
// 회원가입 처리
router.post("/register", authController.registerUser);
// 아이디 중복 확인
router.post("/checkUsername", authController.checkUsername);

// 로그인 페이지
router.get("/login", authController.loginPage);
// 로그인 처리
router.post("/login", authController.loginUser);

// 로그아웃 처리
router.get("/logout", authController.logout);

module.exports = router;
