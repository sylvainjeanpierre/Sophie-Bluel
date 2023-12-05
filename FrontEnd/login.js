
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginFailed = document.createElement("p")

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (emailInput.value === "test" && passwordInput.value === "test") {
        console.log("test ok")
        window.location.href = "/FrontEnd/index.html";
    }
    else {
        if (loginFailed != "Echec de la connexion"){
        loginFailed.innerText = "Echec de la connexion";
        loginForm.appendChild(loginFailed)
        }
    }
})