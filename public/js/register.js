const usernameInput = document.querySelector("#username");
const nameInput = document.querySelector("#name");
const pwInput = document.querySelector("#pw");
const confirmPwInput = document.querySelector("#pw_confirm");
const registerForm = document.querySelector("form");
let isUsernameAvailable = false;

usernameInput.addEventListener("input", () => {
    const username = usernameInput.value;
    const usernameError = document.querySelector("#username-error");

    if (!validateUsername(username)) {
        usernameError.textContent = "영문 5~10자로 입력해주세요.";
        usernameError.classList.add("invalid");
        isUsernameAvailable = false;
    } else {
        usernameError.textContent = "사용 가능한 ID입니다.";
        usernameError.classList.remove("invalid");
        isUsernameAvailable = false; // 아이디가 변경되면 중복 확인 상태를 초기화
    }
});

nameInput.addEventListener("input", () => {
    const name = nameInput.value;
    const nameError = document.querySelector("#name-error");

    if (name.length >= 10 || name.length <= 1) {
        nameError.textContent = "이름은 2~10자로 입력해주세요.";
        nameError.classList.add("invalid");
    } else {
        nameError.textContent = "사용 가능한 이름입니다.";
        nameError.classList.remove("invalid");
    }
});

pwInput.addEventListener("input", () => {
    const pw = pwInput.value;
    const pwError = document.querySelector("#pw-error");

    if (!validatePassword(pw)) {
        pwError.textContent = "영문, 숫자, 특수문자를 필수로 조합하여 7글자 이상으로 입력해주세요.";
        pwError.classList.add("invalid");
    } else {
        pwError.textContent = "사용 가능한 패스워드입니다.";
        pwError.classList.remove("invalid");
    }
});

confirmPwInput.addEventListener("input", () => {
    const pw = pwInput.value;
    const confirmPwInput = confirmPwInput.value;
    const pwConfirmError = document.querySelector("#pw-confirm-error");

    if (pw !== confirmPwInput) {
        pwConfirmError.textContent = "비밀번호가 일치하지 않습니다.";
        pwConfirmError.classList.add("invalid");
    } else {
        pwConfirmError.textContent = "동일한 비밀번호입니다.";
        pwConfirmError.classList.remove("invalid");
    }
});

const idConfirmButton = document.querySelector(".id_confirm");
idConfirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = usernameInput.value;

    if (!validateUsername(username)) {
        alert("영문 5~10자로 입력해주세요.");
        return;
    }

    axios
        .post("/auth/checkUsername", { username: username })
        .then((response) => {
            if (response.data.message === "사용 가능한 아이디입니다.") {
                alert("사용 가능한 ID입니다.");
                isUsernameAvailable = true;
            } else {
                alert("이미 사용중인 ID입니다.");
                isUsernameAvailable = false;
            }
        })
        .catch((error) => {
            console.error("이미 사용중인 ID입니다.", error);
            alert("이미 사용중인 ID입니다.");
        });
});

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const name = nameInput.value;
    const pw = pwInput.value;
    const confirmPw = confirmPwInput.value;

    // 입력 유효성 검사
    if (!username || !name || !pw || !confirmPw) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
    }

    // 아이디 중복 확인 여부 검사
    if (!isUsernameAvailable) {
        alert("아이디 중복 확인을 해주세요.");
        return;
    }

    registerUser();
});

function registerUser() {
    const username = usernameInput.value;
    const name = nameInput.value;
    const pw = pwInput.value;
    const confirmPw = confirmPwInput.value;

    if (!validateUsername(username)) {
        alert("영문 5~10자로 입력해주세요.");
        return;
    }

    if (name.length < 2 || name.length > 10) {
        alert("이름은 2~10자로 입력해주세요.");
        return;
    }

    if (!validatePassword(pw)) {
        alert("영문, 숫자, 특수문자를 필수로 조합하여 7글자 이상으로 입력해주세요.");
        return;
    }

    if (pw !== confirmPw) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    if (!username || !name || !pw || !confirmPw) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
    }

    axios
        .post("/auth/register", {
            username,
            name,
            pw,
        })
        .then((response) => {
            alert(response.data.message);
            if (response.data.message.includes("회원가입에 성공했습니다.")) {
                window.location.href = "/auth/login";
            }
        })
        .catch((error) => {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다.");
        });
}

function validateUsername(username) {
    const regex = /^[a-zA-Z]{5,10}$/;
    return regex.test(username);
}

function validatePassword(pw) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
    return regex.test(pw);
}
