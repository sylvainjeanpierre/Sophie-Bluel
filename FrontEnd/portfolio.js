// API base URL
const baseUrl = "http://localhost:5678/api"

// Projects and categories fetch
const portfolioJSON = await fetch(`${baseUrl}/works`);
const categoriesJSON = await fetch(`${baseUrl}/categories`);
let portfolio = await portfolioJSON.json();
let categories = await categoriesJSON.json();


const btnLog = document.querySelector("#btn-log");
const btnModifier = document.querySelector("#btn-modifier")

function login() {
    btnLog.innerText = "logout";
    btnModifier.style.display = "block";
}

function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    location.reload()
}

if (localStorage.getItem("userId") === "1") {
    login()
}

// If user connected, first click => logout and second => open login page
btnLog.addEventListener("click", function () {
    if (localStorage.getItem("userId") === "1") {
        logout()
    }
    else {
        window.location.href = "login.html"
    }
});


// Portfolio creation function on main page
function generatePortfolio(portfolio) {
    for (let i = 0; i < portfolio.length; i++) {

        const projet = portfolio[i];
        // DOM elements recovery
        const sectionGallery = document.querySelector(".gallery");
        // HTML tags creation
        const portfolioElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = projet.title;

        // Link tags to DOM
        sectionGallery.appendChild(portfolioElement);
        portfolioElement.appendChild(imageElement);
        portfolioElement.appendChild(titleElement);
    }
}

generatePortfolio(portfolio);


// Categories filters buttons
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









// Modal code

// DOM elements recovery
const body = document.querySelector("body");
const sectionModale = document.querySelector("#modale");
const modaleOverlay = document.querySelector("#modale-overlay");
const galleryModale = document.querySelector("#gallery-modale");
const addForm = document.querySelector("#add-form");

const newImageInput = document.querySelector("#new-image-input");
const noImageUpload = document.querySelector("#no-image-upload")
const imageUpload = document.querySelector("#image-upload");

const titreInput = document.querySelector("#titre-input");
const categorieInput = document.querySelector("#categorie-input")

const btnBack = document.querySelector("#btn-back");
const btnEchap = document.querySelector("#btn-echap");
const btnAjouter = document.querySelector("#btn-ajouter");
const errorMsg = document.querySelector("#error-message");
const titreModale = document.querySelector("#modale h3");

// Portfolio preview creation function on modal (with remove project function call inside)
function generatePortfolioModale(portfolio) {
    for (let i = 0; i < portfolio.length; i++) {

        const project = portfolio[i];
        const portfolioElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const btnDelete = document.createElement("img")
        imageElement.src = project.imageUrl;
        btnDelete.src = "/FrontEnd/assets/icons/trash.png";
        btnDelete.classList.add("btn-delete");
        btnDelete.addEventListener("click", function () {
            removeProject(project.id)
        })
        imageElement.classList.add("image-figure");

        galleryModale.appendChild(portfolioElement);
        portfolioElement.appendChild(imageElement);
        portfolioElement.appendChild(btnDelete);
    }
}

// Functions for open, close the modal and switch between the preview page and the new project page
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
    titreInput.value = "";
    newImageInput.value = null;
    noImageUpload.style.display = "flex";
    imageUpload.style.display = "none";
    errorMsg.innerText = "";
}

function modalBack() {
    btnBack.style.display = "none";
    sectionModale.style.display = "flex";
    galleryModale.style.display = "flex";
    titreModale.innerText = "Galerie photo"
    btnAjouter.innerText = "Ajouter une photo"
    addForm.style.display = "none"
    imageUpload.src = "";
    titreInput.value = "";
    newImageInput.value = null;
    noImageUpload.style.display = "flex";
    imageUpload.style.display = "none"
    generatePortfolioModale(portfolio);
    errorMsg.innerText = "";
}

function modalAdd() {
    galleryModale.innerHTML = "";
    galleryModale.style.display = "none"
    btnBack.style.display = "block"
    titreModale.innerText = "Ajout photo"
    btnAjouter.innerText = "Valider"
    addForm.style.display = "flex"
}

// Input categorie recovery for new project page
function generateCategories(categories) {
    for (let i = 0; i < categories.length; i++) {

        const category = categories[i];

        const categoryName = document.createElement("option");
        categoryName.innerText = category.name;
        categoryName.value = category.id;

        categorieInput.appendChild(categoryName);
    }
}

generateCategories(categories)


// New project fetch function
function newProjectFetch() {

    var newProject = new FormData()

    newProject.append("image", newImageInput.files[0])
    newProject.append("title", titreInput.value)
    newProject.append("category", categorieInput.value)

    fetch(`${baseUrl}/works`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: newProject

    }).then(function (response) {
        if (response.status === 201) {
            generatePortfolio(portfolio);
        }
    })

    newImageInput.value = "";
    titreInput.value = "";
}

// Function that checks if all inputs are filled
function formCheck() {

    if (newImageInput.value === "") {
        errorMsg.innerText = "Veuillez selectionner une image";
        sectionModale.appendChild(errorMsg)
    }

    if (titreInput.value === "") {
        if (newImageInput.value === "" && categorieInput.value != "") {
            errorMsg.innerText = errorMsg.innerText + `${" et un titre"}`
        }
        else if (newImageInput.value === "" && categorieInput.value === "") {
            errorMsg.innerText = errorMsg.innerText + `${", un titre"}`
        }
        else {
            errorMsg.innerText = "Veuillez selectionner un titre";
            sectionModale.appendChild(errorMsg)
        }
    }

    if (categorieInput.value === "") {
        if (newImageInput.value === "" || titreInput.value === "") {
            errorMsg.innerText = errorMsg.innerText + `${" et une catégorie"}`
        }
        else {
            errorMsg.innerText = "Veuillez selectionner une catégorie";
            sectionModale.appendChild(errorMsg)
        }
    }

    if (newImageInput.value != "" && titreInput.value != "" && categorieInput.value != "") {
        errorMsg.innerText = "";
        newProjectFetch()
    }

}

// Remove project ferch function
function removeProject(projectId) {
    fetch(`${baseUrl}/works/${projectId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
}


// Buttons actions
btnModifier.addEventListener("click", function () {
    modalLunch()
})

btnEchap.addEventListener("click", function () {
    modalEchap()
})


btnAjouter.addEventListener("click", function () {
    if (btnAjouter.innerText === "Ajouter une photo") {
        modalAdd()
    }
    else if (btnAjouter.innerText === "Valider") {
        formCheck()
        console.log(newImageInput.value)
    }
})


btnBack.addEventListener("click", function () {
    modalBack()
})

modaleOverlay.addEventListener("click", function () {
    modalEchap()
})

// Selected image preview function for the new project page
newImageInput.addEventListener("change", function (event) {
    imageUpload.src = URL.createObjectURL(event.target.files[0]);
    noImageUpload.style.display = "none";
    imageUpload.style.display = "block"
})