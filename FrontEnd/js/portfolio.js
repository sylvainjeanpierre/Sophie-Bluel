// API base URL
const baseUrl = "http://localhost:5678/api"

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

let portfolio = ""

// API portfolio fetch function
async function portfolioFetch() {
    let reponse = await fetch(`${baseUrl}/works`);
    portfolio = await reponse.json();
    generatePortfolio(portfolio);
    generatePortfolioModale(portfolio)
}

// Portfolio creation function on main page
function generatePortfolio(portfolio) {
    // DOM element recovery
    const sectionGallery = document.querySelector(".gallery");
    // Gallery clear
    sectionGallery.innerHTML = ""

    for (let i = 0; i < portfolio.length; i++) {

        const projet = portfolio[i];
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

portfolioFetch();


// Categories filters buttons
const btnFilterTous = document.querySelector(".filter-tous");
btnFilterTous.addEventListener("click", function () {
    generatePortfolio(portfolio);
});

const btnFilterObjets = document.querySelector(".filter-objets");
btnFilterObjets.addEventListener("click", function () {
    const portfolioFiltered = portfolio.filter(function (portfolio) {
        return portfolio.categoryId === 1;
    });
    generatePortfolio(portfolioFiltered);
});

const btnFilterAppartements = document.querySelector(".filter-appartements");
btnFilterAppartements.addEventListener("click", function () {
    const portfolioFiltered = portfolio.filter(function (portfolio) {
        return portfolio.categoryId === 2;
    });
    generatePortfolio(portfolioFiltered);
});

const btnFilterHotelsRestaurants = document.querySelector(".filter-hotels-restaurants");
btnFilterHotelsRestaurants.addEventListener("click", function () {
    const portfolioFiltered = portfolio.filter(function (portfolio) {
        return portfolio.categoryId === 3;
    });
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

sectionModale.appendChild(errorMsg);

// Portfolio preview creation function on modal (with remove project function call inside)
function generatePortfolioModale(portfolio) {

    // Gallery clear
    galleryModale.innerHTML = ""

    for (let i = 0; i < portfolio.length; i++) {

        const project = portfolio[i];
        const portfolioElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const btnDelete = document.createElement("img")
        imageElement.src = project.imageUrl;
        btnDelete.src = "./assets/icons/trash.png";
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
    categorieInput.value = "";
    newImageInput.value = null;
    noImageUpload.style.display = "flex";
    imageUpload.style.display = "none";
    errorMsg.innerText = "";
    btnAjouter.style.backgroundColor = "#1D6154"
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
    categorieInput.value = "";
    newImageInput.value = null;
    noImageUpload.style.display = "flex";
    imageUpload.style.display = "none"
    generatePortfolioModale(portfolio);
    errorMsg.innerText = "";
    btnAjouter.style.backgroundColor = "#1D6154"
}

function modalAdd() {
    galleryModale.innerHTML = "";
    galleryModale.style.display = "none"
    btnBack.style.display = "block"
    titreModale.innerText = "Ajout photo"
    btnAjouter.innerText = "Valider"
    addForm.style.display = "flex"
    btnAjouter.style.backgroundColor = "grey"
}

// Input categorie recovery for new project page
let categories = await fetch(`${baseUrl}/categories`);
categories = await categories.json()

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

// Upload validation popup
function popupValidation() {
    const popup = document.createElement("div");
    popup.classList.add("popup-validation");
    popup.textContent = "Projet ajouté avec succés !";
  
    popup.style.display = "flex";

    body.appendChild(popup);
  
    setTimeout(function() {
        popup.style.display = "none";
    }, 3000);
  }


// New project fetch function
async function newProjectFetch() {

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
            portfolioFetch(portfolio);
            modalEchap()
            popupValidation()
        }
    })

    newImageInput.value = "";
    titreInput.value = "";
}

// Function that checks if all inputs are filled
function formCheck() {

    if (newImageInput.value === "") {
        errorMsg.innerText = "Veuillez selectionner une image";
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
        }
    }

    if (categorieInput.value === "") {
        if (newImageInput.value === "" || titreInput.value === "") {
            errorMsg.innerText = errorMsg.innerText + `${" et une catégorie"}`
        }
        else {
            errorMsg.innerText = "Veuillez selectionner une catégorie";
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
    }).then(function () {
        portfolioFetch();
    })
}


addForm.addEventListener("change", function () {
    if (newImageInput.value != "" && titreInput.value != "" && categorieInput.value != "") {
        btnAjouter.style.backgroundColor = "#1D6154"
    }
    else {
        btnAjouter.style.backgroundColor = "grey"
    }
})


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
    }
})


btnBack.addEventListener("click", function () {
    modalBack()
})

modaleOverlay.addEventListener("click", function () {
    modalEchap()
})

// Selected image preview function for the new project page with file size check
newImageInput.addEventListener("change", function (event) {
    if (this.files[0].size < 4194304) {
        imageUpload.src = URL.createObjectURL(event.target.files[0]);
        noImageUpload.style.display = "none";
        imageUpload.style.display = "block";
        errorMsg.innerText = "";
    }
    else {
        errorMsg.innerText = "L'image est trop lourde (4 Mo max.)";
        newImageInput.value = ""
    }
})