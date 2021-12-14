const imgProduct = document.querySelector("body > main > div > section > article > div.item__img")
const nameProduct = document.querySelector("#title")
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsOfProduct = document.querySelector("#colors");
const colorsOptionProduct = document.querySelector("select").value;
const quantityProduct = document.querySelector("#quantity");
const addCart = document.querySelector("#addToCart");

let productData = [];

//URL------------------------
//
/**
 *On récupère l'id dans l'url du canapé que on inject ensuit dans le fetch
 * @type {URLSearchParams}
 */
let id;
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has("id")) {
    id = searchParams.get("id")
    console.log(" L'id récupéré dans l'URL : ", id)
}
// console.log(window.location.search)
// ---------------------------

// Api call
const fetchDataProduct = async () => {

    await fetch("http://localhost:3000/api/products/" + id)
        .then((res) => res.json())
        .then((data) => productData = data)

    console.log("Product in productData : ", productData);
}

//Total d'articles dans le Cart --------------------
function totalProductDisplay() {
    const totalCartDisplay = document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(2) > li")
    if (localStorage.getItem("totalProduct") === null) {
        totalCartDisplay.textContent = `Cart`
    } else {
        totalCartDisplay.textContent = `Cart : ${JSON.parse(localStorage.getItem("totalProduct"))} articles`
    }
}


//Afficher le produit--------------------------------
const productDisplay = () => {
    totalProductDisplay();
    imgProduct.innerHTML =
        `
     <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    `
    nameProduct.innerHTML = productData.name;
    priceProduct.innerHTML = productData.price / 10;
    descriptionProduct.innerHTML = productData.description;
    colorsOfProduct.innerHTML += productData.colors
        .map((color) =>
            `
     <option value="${color}">${color}</option>
    `
        ).join(" ")
}


//When I change color it displays the amount of items in the Cart --------
function onChangeColor(e) {
    const colorsOptionProduct = document.querySelector("select");
    colorsOptionProduct.addEventListener('change', (e) => {
        const dataCart = JSON.parse(localStorage.getItem("dataCarts"));

        if (dataCart !== null) {
            for (let c = 0; c < dataCart.length; c++) {
                const productLocalStorage = dataCart[c].name + dataCart[c].color
                const product = e.path[3].querySelector(".item__content__titlePrice h1").textContent + e.target.value
                const quantityProduct = dataCart[c].quantity
                // console.log(product)
                // console.log(productLocalStorage)

                if (productLocalStorage !== product) {
                    document.querySelector(".item__content__settings__quantity > label").textContent = "Number of item(s) (1-100) : ";

                }
            }

            for (let c = 0; c < dataCart.length; c++) {
                const productLocalStorage = dataCart[c].name + dataCart[c].color
                const product = e.path[3].querySelector(".item__content__titlePrice h1").textContent + e.target.value
                const quantityProduct = dataCart[c].quantity
                // console.log(quantityProduct)


                if (productLocalStorage === product) {
                    document.querySelector(".item__content__settings__quantity > label").textContent =
                        `You added ${quantityProduct} ${dataCart[c].name} ${dataCart[c].color} In Your cart`
                }
            }
        }
    });
}

//When I click I add the product to the Cart (LocalStorage) ---------------------
function addToCart() {
    let chartCarts = [];

    function totalProduct() {
        //Total items in the Cart
        let chartTotalProduct = 0;
        chartCarts.forEach((productKanap) => {
            chartTotalProduct += productKanap.quantity
        })
        if (chartTotalProduct !== 0) {
            localStorage.setItem("totalProduct", JSON.stringify(chartTotalProduct))
            chartTotalProduct.textContent = `Cart : ${JSON.parse(localStorage.getItem("totalProduct"))}`
        }
    }


//Quantity of product
    let numberKanap;
    quantityProduct.addEventListener('change', (e) => {
        numberKanap = parseInt(e.target.value);
    })

    addCart.addEventListener('click', (e) => {
            e.preventDefault();
            let colorsOptionProduct = document.querySelector("select").value;
            const kanap = {
                img: productData.imageUrl,
                alt: productData.altTxt,
                name: productData.name,
                color: colorsOptionProduct,
                description: productData.description,
                price: productData.price / 10,
                quantity: numberKanap,
                _id: id,
            }
            //Not valid if there is no quantity and colors
            if (!colorsOptionProduct || !numberKanap || numberKanap > 100) {
                alert("Choose a color and an article number between 1 and 100")
            } else {
                //Send data to local storage + change quantity if color and id are the same
                if (typeof localStorage != 'undefined' && localStorage.getItem("dataCarts") != null) {
                    chartCarts = JSON.parse(localStorage.getItem("dataCarts"));
                    const findProduct = chartCarts.find((product) =>
                        kanap._id === product._id && kanap.color === product.color
                    )
                    if (findProduct) {
                        findProduct.quantity = numberKanap;
                        localStorage.setItem("dataCarts", JSON.stringify(chartCarts))
                        // and I inform the customers of the quantity of products in their Cart
                        document.querySelector(".item__content__settings__quantity > label").textContent =
                            `You added ${numberKanap} ${kanap.name} ${kanap.color} In Your cart`

                    } else {
                        //And if the product does not exist I push it in the chart
                        chartCarts.push(kanap)
                        localStorage.setItem("dataCarts", JSON.stringify(chartCarts))
                        document.querySelector(".item__content__settings__quantity > label").textContent =
                            `You added ${numberKanap} ${kanap.name} ${kanap.color} In Your cart`
                    }
                } else {
                    // Allows you to create the first product
                    chartCarts.push(kanap)
                    localStorage.setItem("dataCarts", JSON.stringify(chartCarts))
                    document.querySelector(".item__content__settings__quantity > label").textContent =
                        `You added ${numberKanap} ${kanap.name} ${kanap.color} In Your cart`
                }
                // chartCarts.push(kanap);
                //store in the local storage to retrieve the info in cart.js
                // localStorage.setItem("dataCarts", JSON.stringify(chartCarts));
            }
        console.log( "chartCarts which is sent to the local Storage: ", chartCarts)
            totalProduct();
            totalProductDisplay();
        }
    )
};


fetchDataProduct()
    .then(() => productDisplay())
    .then(() => onChangeColor())
    .then(() => addToCart())

