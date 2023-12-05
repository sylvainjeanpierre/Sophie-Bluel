// *** API recovery *** //
const reponse = await fetch("http://localhost:5678/api/works");
let portofolio = await reponse.json();



// *** The function to generate the portfolio *** //
function generatePortofolio(portofolio) {
    for (let i = 0; i < portofolio.length; i++) {

        const projet = portofolio[i];
        // *** DOM elements recovery *** //
        const sectionGallery = document.querySelector(".gallery");
        // *** HTML tags creation *** //
        const portofolioElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = projet.title;

        // *** Link tags to the DOM *** //
        sectionGallery.appendChild(portofolioElement);
        portofolioElement.appendChild(imageElement);
        portofolioElement.appendChild(titleElement);

    }
}

generatePortofolio(portofolio);


const btnFilterTous = document.querySelector(".filter-tous");
btnFilterTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generatePortofolio(portofolio);
});


const btnFilterObjets = document.querySelector(".filter-objets");
btnFilterObjets.addEventListener("click", function () {
    const portofolioFiltered = portofolio.filter(function (portofolio) {
        return portofolio.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generatePortofolio(portofolioFiltered);
});


const btnFilterAppartements = document.querySelector(".filter-appartements");
btnFilterAppartements.addEventListener("click", function () {
    const portofolioFiltered = portofolio.filter(function (portofolio) {
        return portofolio.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generatePortofolio(portofolioFiltered);
});


const btnFilterHotelsRestaurants = document.querySelector(".filter-hotels-restaurants");
btnFilterHotelsRestaurants.addEventListener("click", function () {
    const portofolioFiltered = portofolio.filter(function (portofolio) {
        return portofolio.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generatePortofolio(portofolioFiltered);
});