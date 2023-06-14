// menu
$(document).ready(function () {
    $(".btn").click(function () {
        $(".main-menu").addClass("active");
    });
    $(".close").click(function () {
        $(".main-menu").removeClass("active");
    });
});

// 로그인 후 이용 가능
$(document).ready(function () {
    $(".qrcodeBtn").click(function (e) {
        e.preventDefault(); // 링크 클릭 동작 중지
        location.href = $(this).attr("href"); // qrcodePage로 이동
    });
});

function showAlert() {
    if (!isLoggedIn()) {
        // 로그인되지 않은 상태인지 확인
        alert("로그인 후 이용가능합니다.");
    }
}

function isLoggedIn() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // 로그인 상태 확인
    return isLoggedIn === "true"; // 문자열로 저장된 상태를 불리언 값으로 반환
}

function login() {
    const username = document.querySelector("#username").value;
    const pw = document.querySelector("#pw").value;

    // 서버로 로그인 요청 보내기
    axios
        .post("/auth/login", {
            username,
            pw,
        })
        .then((response) => {
            alert(response.data.message);
            window.location.href = "/index3";
        })
        .catch((error) => {
            console.error("로그인 실패:", error);
            alert("로그인에 실패했습니다.");
        });
}

// 로그아웃
function logout() {
    const logoutLink = document.querySelector("#logoutLink");

    if (logoutLink) {
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();

            axios
                .get("auth/logout")
                .then((response) => {
                    alert(response.data.message);
                    deleteAllCookies();
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.error("로그아웃 실패:", error);
                    alert("로그아웃에 실패했습니다.");
                });
        });
    }
}

// 쿠키를 삭제하는 함수
function deleteAllCookies() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
