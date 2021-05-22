
function initCart() {
    getAllOfferCardsFromLocalStorage();
}
function getAllOfferCardsFromLocalStorage() {
    var cartItems = [];
    var storageData = localStorage.getItem('cartItems');

    if (storageData != null) {
        cartItems = JSON.parse(storageData);
    }
    var cardContainer = document.getElementById("cart-card-container");
    if (cartItems.length == 0) {
        message = "The cart is empty";
        alert(cardContainer, message);
    } else {
        debugger;
        renderOffersTable(cardContainer, cartItems);
    }
}
function alert(container, message) {
    var alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-danger");
    alert.setAttribute("role", "alert");
    alert.innerText = message;

    container.appendChild(alert)
}
function renderOffersBody(container, book) {
    var bodyRow = document.createElement("tr");

    var bodyCol1 = document.createElement("td");
    bodyCol1.classList.add("col");
    var cardInfo = document.createElement("h4");
    cardInfo.classList.add("card-title");
    cardInfo.innerText = "The book " + book.title + " from " + book.author + ".";

    var bodyCol2 = document.createElement("td");
    bodyCol2.classList.add("col");
    var priceInfo = document.createElement("h6");
    priceInfo.innerText = "Price: " + book.price + " MKD";

    var bodyCol3 = document.createElement("td");
    bodyCol3.classList.add("col");
    var cardBtn = document.createElement("button");
    cardBtn.classList.add("btn");
    cardBtn.classList.add("btn-success");
    cardBtn.innerHTML = "Remove from cart";

    bodyCol1.appendChild(cardInfo);
    bodyCol2.appendChild(priceInfo);
    bodyCol3.appendChild(cardBtn);

    bodyRow.appendChild(bodyCol1);
    bodyRow.appendChild(bodyCol2);
    bodyRow.appendChild(bodyCol3);

    container.appendChild(bodyRow);
}
function renderOffersTable(container, ordersArray) {
    debugger;
    var table = document.createElement("table");
    table.classList.add("table");

    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");

    var headCol = document.createElement("th");
    headCol.classList.add("col");
    headCol.classList.add("text-center");
    var tableTitle = document.createElement("h4");
    tableTitle.classList.add("card-title");
    tableTitle.innerText = "Cart items:";
    headCol.appendChild(tableTitle);
    headCol.setAttribute("colspan", "3");

    var tbody = document.createElement("tbody");

    ordersArray.forEach(x => {
        axios.get(`https://localhost:44380/api/books/${x}`)
            .then(function (response) {
                renderOffersBody(tbody, response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    headRow.appendChild(headCol);
    thead.appendChild(headRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}
initCart();
