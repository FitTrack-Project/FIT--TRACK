const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// 회원가입 페이지
exports.registerPage = (req, res) => {
    res.render("register");
};

// 아이디 중복 확인
exports.checkUsername = (req, res) => {
    const { username } = req.body;
    User.findOne({ where: { username: username } })
        .then((user) => {
            if (user) {
                console.log("아이디 중복 확인: 이미 사용 중인 아이디입니다.");
                res.status(409).json({ message: "이미 사용 중인 아이디입니다." });
            } else {
                console.log("아이디 중복 확인: 사용 가능한 아이디입니다.");
                res.status(200).json({ message: "사용 가능한 아이디입니다." });
            }
        })
        .catch((error) => {
            console.error("아이디 중복 확인 실패:", error);
            res.status(500).json({ message: "아이디 중복 확인에 실패했습니다." });
        });
};

// 회원가입 처리
exports.registerUser = (req, res) => {
    const { username, name, pw } = req.body;

    // 비밀번호 암호화
    const hashedPassword = bcrypt.hashSync(pw, 10).substring(0, 255);

    const newUser = {
        username,
        name,
        pw: hashedPassword,
    };

    User.create(newUser)
        .then((user) => {
            console.log("회원가입 성공");
            res.status(200).json({ message: "회원가입에 성공했습니다." });
        })
        .catch((error) => {
            console.error("회원가입 실패:", error);
            res.status(500).json({ message: "회원가입에 실패했습니다." });
        });
};

// 로그인 페이지
exports.loginPage = (req, res) => {
    res.render("login");
};

// 로그인 처리
exports.loginUser = (req, res) => {
    const { username, pw } = req.body;
    User.findOne({ where: { username: username } })
        .then((user) => {
            if (!user) {
                console.log("로그인 실패: 사용자 정보가 일치하지 않습니다.");
                res.status(401).json({ message: "로그인에 실패했습니다." });
                return;
            }

            // 비밀번호 일치 여부를 확인
            bcrypt.compare(pw, user.pw, (err, result) => {
                if (err) {
                    console.error("비밀번호 비교 실패:", err);
                    res.status(500).json({ message: "로그인에 실패했습니다." });
                    return;
                }

                if (result) {
                    // 로그인 성공 시 세션에 사용자 정보 저장
                    req.session.user = user;

                    // 쿠키 생성
                    res.cookie("myCookie", "cookie value", {
                        maxAge: 3600000, // 쿠키 유효 기간 (예: 1시간)
                        httpOnly: true, // 클라이언트에서 쿠키에 접근하지 못하도록 설정
                    });

                    console.log("로그인 성공");
                    res.status(200).json({ message: "로그인에 성공했습니다." });
                } else {
                    console.log("로그인 실패: 비밀번호가 일치하지 않습니다.");
                    res.status(401).json({ message: "로그인에 실패했습니다." });
                }
            });
        })
        .catch((error) => {
            console.error("로그인 실패:", error);
            res.status(500).json({ message: "로그인에 실패했습니다." });
        });
};

// 로그아웃 요청을 처리하는 함수
exports.logout = (req, res) => {
    // 쿠키 삭제
    res.clearCookie("myCookie");
    // 세션 삭제
    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 실패:", err);

            res.send({ message: "로그아웃에 실패했습니다." });
        } else {
            // 로그아웃 성공 메시지를 응답으로 전송
            res.send({ message: "로그아웃 되셨습니다." });
        }
    });
};

// 로그인 여부를 체크하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        // 로그인 상태인 경우 다음 미들웨어로 이동
        next();
    } else {
        // 로그인 상태가 아닌 경우 로그인 페이지로 리다이렉트
        res.redirect("/auth/login");
    }
};

module.exports = exports;
