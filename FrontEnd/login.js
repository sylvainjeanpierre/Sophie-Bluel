const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginFailed = document.createElement("p");


loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const infosLog = {
        "email": emailInput.value,
        "password": passwordInput.value
    }
    const infosLogJSON = JSON.stringify(infosLog);
    const reponse = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: infosLogJSON
    });
    
    console.log(reponse.json())


})




// if (loginFailed != "Erreur dans l'identifiant ou le mot de passe") {
//     loginFailed.innerText = "Erreur dans l'identifiant ou le mot de passe";
//     loginForm.appendChild(loginFailed)
// }



// sophie.bluel@test.tld
// S0phie