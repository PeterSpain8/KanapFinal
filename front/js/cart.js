window.onload = function () {

    const product = document.querySelector("#cart__items")


    const CartsDisplay = () => {

        //On récupère les information du localStorage
        if (typeof localStorage !== 'undefined' && localStorage.getItem("dataCarts") !== null) {
           dataCarts = JSON.parse(localStorage.getItem("dataCarts"));
            console.log("dataCarts in the localStorage: ", dataCarts)

            product.innerHTML = dataCarts.map((Carts) =>

                `
        <article class="cart__item" data-id="${Carts._id}" data-color="${Carts.color}">
    <div class="cart__item__img">
        <img src="${Carts.img}" alt="${Carts.alt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
            <h2>${Carts.name} ${Carts.color}</h2>
            <p>${Carts.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Quantity : ${Carts.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${Carts.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Remove</p>
            </div>
        </div>
    </div>
</article>
        `
            ).join(" ")
            if (dataCarts.length !== 0) {
// For remove article article------------------------------------
                const functionDeleteItem = () => {
                    const deleteItem = document.querySelectorAll('p.deleteItem')
                    console.log(" dutton delete : ", deleteItem)
                    for (let i = 0; i < deleteItem.length; i++) {
                        deleteItem[i].addEventListener('click', (e) => {
                            const getId = e.path[4].getAttribute("data-id")
                            const getColor = e.path[4].getAttribute("data-color")
                            console.log(getId + getColor)
                            console.log(e)



                            if (getId === dataCarts[i]._id && getColor === dataCarts[i].color) {
                                dataCarts.splice(i, 1)// Retire l'objet de dataCarts grace a splice
                                localStorage.setItem("dataCarts", JSON.stringify(dataCarts))
                                CartsDisplay();
                            }
                        })
                    }
                };

//Calcule du price total et du lastNamebre d'articles total -------------------------
                const functionpriceTotalCart = () => {
                    const totalPrice = document.querySelector("#totalPrice");
                    const totalQuantity = document.querySelector("#totalQuantity")
//Calcul du price total dans le Cart ---
                    let priceTotalCart = [];
                    let quantityArticleTotal = [];
                    // console.log("Varriable priceTotalCart : ", priceTotalCart)
                    // console.log("Varriable quantityArticleTotal : ", quantityArticleTotal)

//Prendre tous les price qui se trouve dans le Cart
                    for (let t = 0; t < dataCarts.length; t++) {
                        let priceArticleInCart = dataCarts[t].price;
                        let quantityDeUnArticle = dataCarts[t].quantity;

                        let calculPriceUnArticle = priceArticleInCart * quantityDeUnArticle

                        //Je mes les price et articles dans une variable "priceTotalCart" et "quantityArticleTotal"
                        priceTotalCart.push(calculPriceUnArticle)
                        quantityArticleTotal.push(quantityDeUnArticle)
                    }
                    //Additionner les price qu'il y a dans la variable "Quantity Article Total" avec reduce.
//La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
                    const reducerForArticles = (previousValue, currentValue) => previousValue + currentValue;
                    const articleTotal = quantityArticleTotal.reduce(reducerForArticles, 0)
                    //Affichage résultat d'article total et je réactulise le totalProduct dans le localStorage.
                    localStorage.setItem("totalProduct", JSON.stringify(articleTotal))
                    totalQuantity.textContent = articleTotal;
                    // console.log(articleTotal)

//Additionner les price qu'il y a dans la variable "priceTotalCart" avec reduce.
                    const reducerForprice = (previousValue, currentValue) => previousValue + currentValue;
                    const priceTotal = priceTotalCart.reduce(reducerForprice, 0);
                    //J'affiche le résultat du price total
                    totalPrice.textContent = priceTotal.toFixed(2);
                    // console.log(priceTotal)
                    localStorage.setItem("totalPrice", priceTotal.toFixed(2));

                }

// Je modifie la quatité dans le Cart-----------------------
                const changeQuantity = () => {
                    const inputQuantity = document.querySelectorAll("input.itemQuantity");
                    for (let q = 0; q < inputQuantity.length; q++) {
                        // console.log( "Les input de quantité 'change'", inputQuantity[q])

                        inputQuantity[q].addEventListener('change', (e) => {
                            let valueQuantity = parseInt(e.target.value);
                            // console.log(valueQuantity)
                            if (valueQuantity === 0) {
                                alert("Click REMOVE for remove item ")

                            } else if (valueQuantity > 100) {
                                alert("More then 100 articles in your cart")

                            }
                            if (valueQuantity !== 0 && valueQuantity <= 100) {
                                dataCarts[q].quantity = parseInt(valueQuantity);
                                localStorage.setItem("dataCarts", JSON.stringify(dataCarts))

                                document.querySelectorAll(".cart__item__content__settings__quantity > p")[q].textContent = 'Quantity : ' + valueQuantity;
                                document.querySelector("#totalQuantity").textContent = valueQuantity;
                                functionpriceTotalCart();
                            }

                        })
                    }

                }
                functionpriceTotalCart();
                changeQuantity();
                functionDeleteItem();
            } else {
                localStorage.clear();
                document.querySelector("#cartAndFormContainer > h1").innerHTML =
                    `
                   <h1>Cart is empty</h1>
                    `
                totalPrice.textContent = 0;
                totalQuantity.textContent = 0;
            }
        }
    }
    CartsDisplay();

    //------------------- Form --------------------------

    const inputCommander = document.getElementById("order");
    //FirstName  + error message----
    let textFirstName = document.getElementById("firstName");
    let textFirstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    //lastName + error message-----
    let textlastName = document.getElementById("lastName");
    let textlastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    //Adress + error message ----
    let textAdresse = document.getElementById("address");
    let textAdresseErrorMsg = document.getElementById("addressErrorMsg");
    //City + error message ------
    let textCity = document.getElementById("city");
    let textCityErrorMsg = document.getElementById("cityErrorMsg");
    //Email+error message ------------
    let textEmail = document.getElementById("email");
    let textEmailErrorMsg = document.getElementById("emailErrorMsg");

    //--------------------------------------------------------------------------------
// put the condition back twice to make it more understandable.
    inputCommander.addEventListener('click', (e) => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem("dataCarts") !== null) {
            e.preventDefault();

//Class allows to create an object 
            class Form {
                constructor() {
                    this.firstName = textFirstName.value;
                    this.lastName = textlastName.value;
                    this.address = textAdresse.value;
                    this.city = textCity.value;
                    this.email = textEmail.value;
                }
            }

//Calling the Form class instance to create an object.
            const FormValue = new Form();

// ------------------- VALIDATION Form with RegEx---------------------//
//Regular expressions are patterns or patterns used to perform searches and replacements in strings.
// Function expression which will allow us to reetulize the regEx 3 times.
            const regExFirstNameLastNameCity = (value) => {
                return /^([A-Za-z]{3,20})?((-){0,1})?([A-Za-z]{3,20})$/.test(value)
            }
            const regExEmail = (value) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)
            }
            // there are regEx for all countries
            const regExAdresse = (value) => {
                return /^[A-Za-z0-9 \s]{3,40}$/.test(value)
            }

            function firstNamecontrol() {
                const firstName = FormValue.firstName
                if (regExFirstNameLastNameCity(firstName)) {
                    return true;
                } else {
                    return false;
                }
            }

            function lastNamecontrol() {
                const lastName = FormValue.lastName
                if (regExFirstNameLastNameCity(lastName)) {
                    return true;
                } else {
                    return false;
                }
            }

            function adressecontrol() {
                const adresse = FormValue.address
                if (regExAdresse(adresse)) {
                    return true;
                } else {
                    return false;
                }
            }

            function cityNameControl() {
                const City = FormValue.city
                if (regExFirstNameLastNameCity(City)) {
                    return true;
                } else {
                    return false;
                }
            }

            function emailcontrol() {
                const email = FormValue.email
                if (regExEmail(email)) {
                    return true;
                } else {
                    return false;
                }
            }

            if (firstNamecontrol()) {
                textFirstNameErrorMsg.style.color = "green";
                textFirstNameErrorMsg.textContent = "First Name valid";
            } else {
                textFirstNameErrorMsg.style.color = "Red";
                textFirstNameErrorMsg.textContent = "Numbers are not allowed. The '-' symbol is only allowed. Do not exceed 20 characters and a minimum of 3 characters";
            }
            if (lastNamecontrol()) {
                textlastNameErrorMsg.style.color = "green";
                textlastNameErrorMsg.textContent = "Last Name valid";
            } else {
                textlastNameErrorMsg.style.color = "Red";
                textlastNameErrorMsg.textContent = "Numbers are not allowed. Do not exceed 20 characters minimum 3 characters";
            }
            if (adressecontrol()) {
                textAdresseErrorMsg.style.color = "green";
                textAdresseErrorMsg.textContent = "Adresse valide";
            } else {
                textAdresseErrorMsg.style.color = "Red";
                textAdresseErrorMsg.textContent = "The address must contain only letters without punctuation and numbers"
            }
            if (cityNameControl()) {
                textCityErrorMsg.style.color = "green";
                textCityErrorMsg.textContent = "City valid";
            } else {
                textCityErrorMsg.style.color = "Red";
                textCityErrorMsg.textContent = "Numbers are not allowed. Do not exceed 20 characters minimum 3 characters";
            }
            if (emailcontrol()) {
                textEmailErrorMsg.style.color = "green"
                textEmailErrorMsg.textContent = "Email valid";
            } else {
                textEmailErrorMsg.style.color = "Red";
                textEmailErrorMsg.textContent = "email format not valid. Correct format: example@example.com";
            }

// ------------------- FIN VALIDATION Form ---------------------//
            if (firstNamecontrol() && lastNamecontrol() && cityNameControl() && adressecontrol() && emailcontrol() && dataCarts !== null) {
                localStorage.removeItem("Form")
                localStorage.setItem("Form", JSON.stringify(FormValue))

//Send the products and data from the Form to the server
                // scan the id's in dataCart and push them into arrayID to send only the id's
                let arrayID = []
                dataCarts.forEach((x) => {
                    arrayID.push(x._id);
                });

                const dataAEnvoyer = {
                    'products': arrayID,
                    'contact': FormValue
                }
                console.log("Data send to API : ", dataAEnvoyer)
// Send the object with the POST method.
                const envoyerData = fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify(dataAEnvoyer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                let response;
                envoyerData
                    .then(async (res) => {
                        response = await res.json()
                        console.log(' response :', response)
                        console.log(response.orderId)
                        window.location.href = "http://localhost:63342/finalKanap/front/html/confirmation.html?_orderId=" + response.orderId;
                    })
                    .catch((e) => {
                        console.log(e)
                    });


                    console.log(response.orderId)
            }
        } else {
            e.preventDefault()
            document.querySelector("#cartAndFormContainer > h1").innerHTML =
                `
                   <h1>Select items</h1>
                    `
        }
    });

//Stock in the localStorage to keep the person's information so as not to rewrite everything
    if (localStorage.getItem("Form") !== null) {
        //We retrieve the data from the Form in localStorage to inject them into the Form
        const dataLocalStorageObject = JSON.parse(localStorage.getItem("Form"))

        //Function to keep the Form fields filled.
        function inputRempliParLocalStorage(input) {
            document.querySelector(`#${input}`).value = dataLocalStorageObject[input];
        }

        inputRempliParLocalStorage("firstName")
        inputRempliParLocalStorage("lastName")
        inputRempliParLocalStorage("address")
        inputRempliParLocalStorage("city")
        inputRempliParLocalStorage("email")
        // console.log(dataLocalStorageObject);
    }


    //FIN du onload
}


