var errorInputs = document.getElementById("error-inputs");
var successMessage = document.getElementById("success");
var errorWrong = document.getElementById("error-wrong");
var passGuide = document.getElementById("pass-guide");
var signupBtn = document.getElementById("signup-btn");
var loginBtn = document.getElementById("login-btn");
var errorDuplicate = document.getElementById("duplicate");
var nameInputSignup = document.getElementById("name-signup");
var emailInputSignup = document.getElementById("email-signup");
var passwordInputSignup = document.getElementById("password-signup");

var userStorage = JSON.parse(localStorage.getItem("user")) || [];

if (signupBtn) {
  signupBtn.addEventListener("click", function () {
    if (
      nameValidation() == true &&
      emailValidation() == true &&
      passwordValidation() == true
    ) {
      signup();
    }
  });
} else if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

function signup() {
  var nameInputValue = nameInputSignup.value.trim();
  var emailInputValue = emailInputSignup.value.trim();
  var passwordInputValue = passwordInputSignup.value.trim();
  if (
    nameInputValue !== "" &&
    emailInputValue !== "" &&
    passwordInputValue !== ""
  ) {
    var isDuplicate = userStorage.some(
      (user) => user.email === emailInputValue
    );
    if (isDuplicate) {
      errorDuplicate.classList.remove("d-none");
      errorInputs.classList.add("d-none");
      successMessage.classList.add("d-none");
    } else {
      storeUserData(nameInputValue, emailInputValue, passwordInputValue);
      successMessage.classList.remove("d-none");
      errorInputs.classList.add("d-none");
      errorDuplicate.classList.add("d-none");
      localStorage.setItem("userName", nameInputValue);
    }
  } else {
    errorInputs.classList.remove("d-none");
    successMessage.classList.add("d-none");
    errorDuplicate.classList.add("d-none");
  }
}

function storeUserData(name, email, password) {
  var userData = {
    userName: name,
    email: email,
    password: password,
  };
  userStorage.push(userData);
  localStorage.setItem("user", JSON.stringify(userStorage));
}

function login() {
  var emailInputLogin = document.getElementById("email-login").value.trim();
  var passwordInputLogin = document
    .getElementById("password-login")
    .value.trim();

  if (emailInputLogin !== "" && passwordInputLogin !== "") {
    var userFound = false;

    for (var i = 0; i < userStorage.length; i++) {
      if (
        emailInputLogin == userStorage[i].email &&
        passwordInputLogin == userStorage[i].password
      ) {
        userFound = true;
        localStorage.setItem("userName", userStorage[i].userName);
        window.location.href = "home.html";
        break;
      }
    }
    if (!userFound) {
      errorWrong.classList.remove("d-none");
      errorInputs.classList.add("d-none");
    }
  } else {
    errorInputs.classList.remove("d-none");
    errorWrong.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var userNameDisplay =
    localStorage.getItem("userName")?.toUpperCase() || "Guest";
  var nameElement = document.getElementById("nameDisplay");
  if (nameElement) {
    nameElement.innerHTML = `<p class="text-center text-white h1 pb-3">Welcome, ${userNameDisplay}!</p>`;
  }
});

function nameValidation() {
  var nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
  if (nameRegex.test(nameInputSignup.value)) {
    nameInputSignup.classList.remove("is-invalid");
    nameInputSignup.classList.add("is-valid");
    return true;
  } else {
    nameInputSignup.classList.remove("is-valid");
    nameInputSignup.classList.add("is-invalid");
    return false;
  }
}
function emailValidation() {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(emailInputSignup.value)) {
    emailInputSignup.classList.remove("is-invalid");
    emailInputSignup.classList.add("is-valid");
    return true;
  } else {
    emailInputSignup.classList.remove("is-valid");
    emailInputSignup.classList.add("is-invalid");
    return false;
  }
}
function passwordValidation() {
  var passRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
  if (passRegex.test(passwordInputSignup.value)) {
    passwordInputSignup.classList.remove("is-invalid");
    passwordInputSignup.classList.add("is-valid");
    passGuide.classList.add("d-none");
    return true;
  } else {
    passwordInputSignup.classList.add("is-invalid");
    passwordInputSignup.classList.remove("is-valid");
    passGuide.classList.remove("d-none");
    return false;
  }
}
