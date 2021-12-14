//l'acceuil -----------------------------------------------------
const sectionCards = document.getElementById("items");

//---------------------------
//
/**
 * Variable pour stocker les données des canapé = kanapData
 * Fonction async pour aller chercher les donées dans l'api = fetchDataKanap
 *@param { Object[] } kanapData
 *@param { string } kanapData[]._id
 *@param { array of string } kanapData[].colors
 *@param { string } kanapData[].name
 *@param { string } kanapData[].imageUrl
 *@param { string } kanapData[].description
 *@param { string } kanapData[].altTxt
 * @type {*[]}
 */
let kanapData = [];
const fetchDataKanap = async () => {

    await fetch("http://localhost:3000/api/products")
        //La méthode .json() => méthode qui s'auto-résout en renvoyant le Body de la requête.
        .then((res) => res.json())
        .then((data) => (kanapData = data))
        .catch((err) => alert("An error has occurred => " + " " + err + " " + ", you have to launch the API"))

    console.log("API data : ", kanapData)
}

function totalProductDisplay() {
    const totalCartDisplay = document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(2) > li")
    //Total items in the Cart
    if (localStorage.getItem("totalProduct") === null){
        totalCartDisplay.textContent = `Cart`
    } else {
        totalCartDisplay.textContent = `Cart : ${JSON.parse(localStorage.getItem("totalProduct"))} items`
    }
}

// Une fonction pour afficher les canapé dans les cards
const kanapCardsDisplay = () => {
    totalProductDisplay();
    sectionCards.innerHTML = kanapData.map((data) =>
        `
        <a href="./product.html?id=${data._id}">
        <article>
              <img src="${data.imageUrl}" alt="${data.altTxt}">
              <h3 class="productName">${data.name}</h3>
              <p class="productDescription">${data.description}</p>
        </article>
        </a>
        `
    ).join("")//join remove quotes between each article.
};

fetchDataKanap()
    .then(() => kanapCardsDisplay())
