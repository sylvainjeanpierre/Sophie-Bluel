// DOM elements recovery
const loginMain = document.querySelector("#login-main")
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const btnSeConnecter = document.querySelector("#btn-se-connecter")
const btnMdpOublie = document.querySelector("btn-mpd-oublie");
const loginFailed = document.createElement("p");
loginMain.appendChild(loginFailed);

// Fetch login function with token and userId recovery
btnSeConnecter.addEventListener("click", function (event) {
    event.preventDefault();
    const infosLog = {
        "email": emailInput.value,
        "password": passwordInput.value
    }
    const infosLogJSON = JSON.stringify(infosLog);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: infosLogJSON,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 404) {
            loginFailed.innerText = "Erreur dans l'identifiant ou le mot de passe";
        } else {
            console.log("Erreur " + response.status);
        }
    }).then(function (response) {
        if (response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);
            window.location.href = "index.html"
        }
    }).catch(function (error) {
        console.log(error);
    });
});