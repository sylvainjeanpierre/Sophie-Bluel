const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginFailed = document.createElement("p");


function loginSuccess() {
    window.location.href = "/FrontEnd/index.html";
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (emailInput.value === "test" && passwordInput.value === "test") {
        
    }
    else {
        if (loginFailed != "Erreur dans l'identifiant ou le mot de passe"){
        loginFailed.innerText = "Erreur dans l'identifiant ou le mot de passe";
        loginForm.appendChild(loginFailed)
        }
    }
})
