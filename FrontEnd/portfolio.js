// *** API recovery *** //
const reponse = await fetch("http://localhost:5678/api/works");
let portfolio = await reponse.json();


const btnLog = document.querySelector("#btn-log");
const btnModifier = document.querySelector("#btn-modifier")

function login() {
    btnLog.innerText = "logout";
    btnModifier.style.display = "block"
}

function logout() {
    localStorage.removeItem("log");
    localStorage.removeItem("token");
    location.reload()
}

if (localStorage.getItem("log") === "true") {
    login()
}

btnLog.addEventListener("click", function () {
    if (localStorage.getItem("log") === "true") {
        logout()
    }
    else {
        window.location.href = "login.html"
    }

});


// *** The function to generate the portflio *** //
function generatePortfolio(portfolio) {
    for (let i = 0; i < portfolio.length; i++) {

        const projet = portfolio[i];
        // *** DOM elements recovery *** //
        const sectionGallery = document.querySelector(".gallery");
        // *** HTML tags creation *** //
        const portfolioElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = projet.title;

        // *** Link tags to the DOM *** //
        sectionGallery.appendChild(portfolioElement);
        portfolioElement.appendChild(imageElement);
        portfolioElement.appendChild(titleElement);
    }
}

generatePortfolio(portfolio);


const btnFilterTous = document.querySelector(".filter-tous");
btnFilterTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generatePortfolio(portfolio);
});


const btnFilterObjets = document.querySelector(".filter-objets");
btnFilterObjets.addEventListener("click", function () {
    const portfolioFiltered = portfolio.filter(function (portfolio) {
        return portfolio.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generatePortfolio(portfolioFiltered);
});


const btnFilterAppartements = document.querySelector(".filter-appartements");
btnFilterAppartements.addEventListener("click", function () {
    const portfolioFiltered = portfolio.filter(function (portfolio) {
        return portfolio.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generatePortfolio(portfolioFiltered);
});


const btnFilterHotelsRestaurants = document.querySelector(".filter-hotels-restaurants");
btnFilterHotelsRestaurants.addEventListener("click", function () {
    const portfolioFiltered = portfolio.filter(function (portfolio) {
        return portfolio.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generatePortfolio(portfolioFiltered);
});


// ******* Modale code *******//

const body = document.querySelector("body");
const sectionModale = document.querySelector("#modale");
const modaleOverlay = document.querySelector("#modale-overlay");
const galleryModale = document.querySelector("#gallery-modale");
const addForm = document.querySelector("#add-form");

const newImageButton = document.querySelector("#new-image-button");
const noImageUpload = document.querySelector("#no-image-upload")
const imageUpload = document.querySelector("#image-upload");

const titreInput = document.querySelector("#titre-input");
const categorieInput = document.querySelector("#categorie-input")

const btnBack = document.querySelector("#btn-back");
const btnEchap = document.querySelector("#btn-echap");
const btnAjouter = document.querySelector("#btn-ajouter");
const titreModale = document.querySelector("#modale h3")

function generatePortfolioModale(portfolio) {
    for (let i = 0; i < portfolio.length; i++) {

        const projet = portfolio[i];
        const portfolioElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const btnDelete = document.createElement("img")
        imageElement.src = projet.imageUrl;
        btnDelete.src = "/FrontEnd/assets/icons/trash.png";
        btnDelete.classList.add("btn-delete");
        imageElement.classList.add("image-figure");

        galleryModale.appendChild(portfolioElement);
        portfolioElement.appendChild(imageElement);
        portfolioElement.appendChild(btnDelete);
    }
}


function modalLunch() {
    sectionModale.style.display = "flex";
    galleryModale.style.display = "flex";
    modaleOverlay.style.display = "block";
    body.style.overflow = "hidden";
    generatePortfolioModale(portfolio)
}

function modalEchap() {
    galleryModale.innerHTML = "";
    sectionModale.style.display = "none"
    btnBack.style.display = "none"
    titreModale.innerText = "Galerie photo"
    btnAjouter.innerText = "Ajouter une photo"
    addForm.style.display = "none"
    modaleOverlay.style.display = "none"
    body.style.overflow = "visible";
    imageUpload.src = "";
    newImageButton.value = null;
    noImageUpload.style.display = "flex";
    imageUpload.style.display = "none"
}

function modalBack() {
    btnBack.style.display = "none";
    sectionModale.style.display = "flex";
    galleryModale.style.display = "flex";
    titreModale.innerText = "Galerie photo"
    btnAjouter.innerText = "Ajouter une photo"
    addForm.style.display = "none"
    imageUpload.src = "";
    newImageButton.value = null;
    noImageUpload.style.display = "flex";
    imageUpload.style.display = "none"
    generatePortfolioModale(portfolio)
}

function modalAdd() {
    galleryModale.innerHTML = "";
    galleryModale.style.display = "none"
    btnBack.style.display = "block"
    titreModale.innerText = "Ajout photo"
    btnAjouter.innerText = "Valider"
    addForm.style.display = "flex"
}


// ** Buttons actions ** //
btnModifier.addEventListener("click", function () {
    modalLunch()
})

btnEchap.addEventListener("click", function () {
    modalEchap()
})


btnAjouter.addEventListener("click", function () {
    modalAdd()
})


btnBack.addEventListener("click", function () {
    modalBack()
})


newImageButton.addEventListener("change", function (event) {
    imageUpload.src = URL.createObjectURL(event.target.files[0]);
    noImageUpload.style.display = "none";
    imageUpload.style.display = "block"
})


// btnAjouter.addEventListener("click", function (event) {
//     event.preventDefault();
//     portfolio.lenght++
//     const infosLog = {
//         "id": portfolio.lenght
//         "title": titreInput,
//         "imageUrl": imageUpload.src,
//         "categoryId": categorieInput,
//         "userId": 0
//     }
//     const infosLogJSON = JSON.stringify(infosLog);

//     fetch("http://localhost:5678/api/users/login", {
//         method: "POST",
//         body: infosLogJSON,
//         headers: {
//             "Content-Type": "application/json",
//         }
//     }).then(function (response) {
//         if (response.status === 200) {
//             return response.json();
//         } else if (response.status === 404) {
//             loginFailed.innerText = "Erreur dans l'identifiant ou le mot de passe";
//         } else {
//             console.log("Erreur " + response.status);
//         }
//     }).then(function (response) {
//         if (response.token) {
//             localStorage.setItem("token", response.token);
//             localStorage.setItem("log", true);
//             window.location.href = "index.html"
//         }
//     }).catch(function (error) {
//         console.log(error);
//     });
// });