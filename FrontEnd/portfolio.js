// *** API recovery *** //
const reponse = await fetch("http://localhost:5678/api/works");
let portfolio = await reponse.json();



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