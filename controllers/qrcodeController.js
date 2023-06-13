const qrcode = require("qrcode");
const authController = require("../controllers/authController");

// qrcode 페이지
exports.qrcodePage = function (req, res) {
    const loggedIn = req.session.user ? true : false; // 로그인 여부를 세션 정보를 기반으로 설정
    let message = null; // 알림 메시지를 초기값으로 설정

    if (!loggedIn) {
        message = "로그인 후 이용 가능합니다."; // 로그인되지 않은 경우 알림 메시지 설정
    }

    res.render("qrcodePage", { loggedIn, qrCodeUrl: null, message }); // qrCodeUrl과 message를 뷰 템플릿으로 전달
};

// 데드리프트
exports.generateQRCode = (req, res) => {
    const videoUrl = "https://www.youtube.com/watch?v=EBjYQeeBI-0";

    // QR 코드 생성
    qrcode.toDataURL(videoUrl, (err, qrCodeUrl) => {
        if (err) {
            console.error("QR 코드 생성 실패:", err);
            res.sendStatus(500);
        } else {
            // QR 코드 이미지 URL을 클라이언트로 전송
            res.render("qrcodePage", { loggedIn: true, qrCodeUrl, message: null });
        }
    });
};

// 올인원
exports.generateAllInOneQRCode = (req, res) => {
    const videoUrl = "https://www.youtube.com/watch?v=zruKSHfD7b4";

    // QR 코드 생성
    qrcode.toDataURL(videoUrl, (err, qrCodeUrl) => {
        if (err) {
            console.error("QR 코드 생성 실패:", err);
            res.sendStatus(500);
        } else {
            // QR 코드 이미지 URL을 클라이언트로 전송
            res.render("qrcodePage", { loggedIn: true, qrCodeUrl, message: null });
        }
    });
};

// 스쿼트
exports.generateSquatQRCode = (req, res) => {
    const videoUrl = "https://www.youtube.com/watch?v=kz84Fc6HGu4";

    // QR 코드 생성
    qrcode.toDataURL(videoUrl, (err, qrCodeUrl) => {
        if (err) {
            console.error("QR 코드 생성 실패:", err);
            res.sendStatus(500);
        } else {
            // QR 코드 이미지 URL을 클라이언트로 전송
            res.render("qrcodePage", { loggedIn: true, qrCodeUrl, message: null });
        }
    });
};

// 10분 운동
exports.generateTenQRCode = (req, res) => {
    const videoUrl = "https://www.youtube.com/watch?v=kNZUvU54wRw";

    // QR 코드 생성
    qrcode.toDataURL(videoUrl, (err, qrCodeUrl) => {
        if (err) {
            console.error("QR 코드 생성 실패:", err);
            res.sendStatus(500);
        } else {
            // QR 코드 이미지 URL을 클라이언트로 전송
            res.render("qrcodePage", { loggedIn: true, qrCodeUrl, message: null });
        }
    });
};

// 10분 운동
exports.generateAbsQRCode = (req, res) => {
    const videoUrl = "https://www.youtube.com/watch?v=kETh8T3it4k";

    // QR 코드 생성
    qrcode.toDataURL(videoUrl, (err, qrCodeUrl) => {
        if (err) {
            console.error("QR 코드 생성 실패:", err);
            res.sendStatus(500);
        } else {
            // QR 코드 이미지 URL을 클라이언트로 전송
            res.render("qrcodePage", { loggedIn: true, qrCodeUrl, message: null });
        }
    });
};

exports.playVideo = (req, res) => {
    // QR 코드에서 추출한 동영상 URL
    const videoUrl = req.query.url;

    // 동영상 재생 로직 구현 (예: 동영상을 HTML5 <video> 요소로 재생)
    // 여기서는 간단히 동영상 URL을 응답으로 보냄
    res.send(`동영상 재생: ${videoUrl}`);
};
