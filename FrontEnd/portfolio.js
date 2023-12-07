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

const sectionModale = document.querySelector("#modale");
const galleryModale = document.querySelector("#gallery-modale");
const addForm = document.querySelector("#add-form")
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
    sectionModale.style.display = "flex"
    galleryModale.style.display = "flex"
    generatePortfolioModale(portfolio)
}

function modalEchap() {
    galleryModale.innerHTML = "";
    sectionModale.style.display = "none"
    btnBack.style.display = "none"
    titreModale.innerText = "Galerie photo"
    btnAjouter.innerText = "Ajouter une photo"
    addForm.style.display = "none"
}

function modalBack() {
    btnBack.style.display = "none";
    sectionModale.style.display = "flex";
    galleryModale.style.display = "flex";
    titreModale.innerText = "Galerie photo"
    btnAjouter.innerText = "Ajouter une photo"
    addForm.style.display = "none"
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
btnModifier.addEventListener("click", function() {
    modalLunch()
})

btnEchap.addEventListener("click", function() {
    modalEchap()
})


btnAjouter.addEventListener("click", function() {
    modalAdd()
})


btnBack.addEventListener("click", function() {
    modalBack()
})


