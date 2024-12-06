var errorInputs = document.getElementById("error-inputs");
var successMessage = document.getElementById("success");
var errorWrong = document.getElementById("error-wrong");
var signupBtn = document.getElementById("signup-btn");
var loginBtn = document.getElementById("login-btn");
var errorDuplicate = document.getElementById("duplicate");
var nameInputSignup = document.getElementById("name-signup");
var emailInputSignup = document.getElementById("email-signup");
var passwordInputSignup = document.getElementById("password-signup");

var userStorage = JSON.parse(localStorage.getItem("user")) || [];

if (signupBtn) {
  signupBtn.addEventListener("click", signup);
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

var userNameDisplay = localStorage.getItem("userName").toUpperCase();
document.getElementById(
  "nameDisplay"
).innerHTML = `<p class="text-center text-white h1 pb-3">Welcome, ${userNameDisplay}!</p>`;
