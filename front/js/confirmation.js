if (JSON.parse(localStorage.getItem("dataCarts")) !== null) {
    let orderId;
    let searchParams = new URLSearchParams(window.location.search)
    // console.log(window.location.search)
    if (searchParams.has("_orderId")) {
        orderId = searchParams.get("_orderId")
        console.log(" The id of retrieved from the URL : ", orderId)
    }

    const displayOrderId = document.getElementById("orderId");
    displayOrderId.textContent = orderId;
} else {
    window.location.href = "index.html"
}

const resumeCommande = JSON.parse(localStorage.getItem("dataCarts"));
const resumePrise = JSON.parse(localStorage.getItem("totalPrice"));
const resumeTotalArticles = JSON.parse(localStorage.getItem("totalProduct"))
// console.log(resumePrise + "   " + resumeTotalArticles)

const listeKanapCommande = document.querySelector("#limitedWidthBlock > div >p")
listeKanapCommande.innerHTML += resumeCommande.map((Cart) =>
    `<ul>
<li>You added order <b>${Cart.quantity}</b> <b>${Cart.name}</b> with color <b>${Cart.color}</b></li>
</ul>
`
).join(" ")
listeKanapCommande.innerHTML +=
    `<br>Total items : <b>${resumeTotalArticles}</b>
     <br>Total price of order : <b>${resumePrise} €</b>`

const listeKanapCommandeStyle = document.querySelectorAll("#limitedWidthBlock > div >p > ul")
for (let x = 0; x < listeKanapCommandeStyle.length; x++) {
    listeKanapCommandeStyle[x].style.listStyleType = "none";
}

/**
 * Function => countdown
 * @param {Number} value
 * @return {Number}
 */
function compteRebour(value) {
    setTimeout(() => {
        const buttonReturnToHome = document.querySelector("#order")
        // console.log(buttonReturnToHome)
        let counter = value;
        let timer = setInterval(() => {
            counter--
            buttonReturnToHome.value = "Back at home (" + counter + ")";
            if (counter === 0) {
                window.location.reload();
                // console.log("over");
                window.location.href = "index.html";
                localStorage.clear();
                clearInterval(timer);
            }
        }, 1000);
    }, 1000);
    return value;
}

//Construction du button ------
const buttonReturnToHome = document.querySelector(".confirmation > p")
buttonReturnToHome.innerHTML +=
    `<br><div class="buttonReturnToHomme" style="padding-top: 15px">
     <input type="submit" id="order" value="Revenir à l'accueil (${compteRebour(150)})">
     </div>`

const button = document.querySelector("#limitedWidthBlock > div > p > div > input")

button.style.borderRadius = "40px"
button.style.fontSize = "22px"
button.style.border = "0"
button.style.backgroundColor = "#2c3e50"
button.style.color = "white"
button.style.padding = "18px 20px"
button.style.cursor = "pointer"

button.addEventListener('click', (e) => {
    localStorage.clear();
    window.location.reload();
    window.location.href = "index.html";
})


button.addEventListener("mouseenter", (e) => {
    button.style.boxShadow = "rgb(42 18 206 / 90%) 0 0 22px 6px";
})
button.addEventListener("mouseleave", (e) => {
    button.style.boxShadow = "";
})

// Click on the icon or Carts or home
const cleanLocalStorageOnClick = [document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(2) > li"),
    document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(1) > li"), document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > a > img")];
// console.log(cleanLocalStorageOnClick)
cleanLocalStorageOnClick.forEach(el => {
    // console.log(el)
    el.addEventListener('click', (e) => {
        window.location.reload();
        localStorage.clear();
    })
});

//----------------------------------------------
//If the page is reload:
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        window.location.href = "index.html"
        localStorage.clear();
}



