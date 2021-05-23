
function initCart() {
    getAllOfferCardsFromLocalStorage();
}
function getAllOfferCardsFromLocalStorage() {
    var cartItems = localStorageService.getAll("cartItems");

    var cardContainer = document.getElementById("cart-card-container");
    if (cartItems.length == 0) {
        var message = "The cart is empty";
        var statusColor = "alert-danger";
        alert(cardContainer, message, statusColor);
    } else {
        renderOffersTable(cardContainer, cartItems);
    }
}
function alert(container, message, statusColor) {
    var alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add(statusColor);
    alert.classList.add("text-center");
    alert.setAttribute("role", "alert");
    alert.innerText = message;

    container.setAttribute("alert", "on");
    container.appendChild(alert);
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
    cardBtn.onclick = function (e) {
        removeFromCart(e, book.id);
    }

    bodyCol1.appendChild(cardInfo);
    bodyCol2.appendChild(priceInfo);
    bodyCol3.appendChild(cardBtn);

    bodyRow.appendChild(bodyCol1);
    bodyRow.appendChild(bodyCol2);
    bodyRow.appendChild(bodyCol3);

    container.appendChild(bodyRow);
}
function renderOffersTable(container, ordersArray) {
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
                if (response.data.quantity < 1) {
                    var bodyRow = document.createElement("tr");

                    var bodyCol1 = document.createElement("th");
                    bodyCol1.classList.add("col");
                    bodyCol1.setAttribute("colspan", "2");


                    var expired = document.createElement("h5");
                    expired.classList.add("text-danger");
                    expired.innerText = "The book " + response.data.title + " went out of stock. Refresh your cart if you want to see your updated cart items.";

                    var bodyCol2 = document.createElement("td");
                    bodyCol2.classList.add("col");
                    var cardBtn = document.createElement("button");
                    cardBtn.classList.add("btn");
                    cardBtn.classList.add("btn-success");
                    cardBtn.innerHTML = "Remove from cart";
                    cardBtn.onclick = function (e) {
                        removeFromCart(e, response.data.id);
                    }

                    bodyCol1.appendChild(expired);
                    bodyCol2.appendChild(cardBtn);

                    bodyRow.appendChild(bodyCol1);
                    bodyRow.appendChild(bodyCol2);
                    tbody.appendChild(bodyRow);
                    localStorageService.remove("cartItems", response.data.id)
                } else {
                    renderOffersBody(tbody, response.data);
                }
            })
            .catch(function (error) {
                if (error.response.status == 400) {
                    var cardContainer = document.getElementById("cart-card-container");
                    alert(cardContainer, "One of the books in your cart went out of stock. Please refresh your cart.", danger)
                }
                console.log(error);
            });
    });
    headRow.appendChild(headCol);
    thead.appendChild(headRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}
function removeFromCart(event, bookId) {
    localStorageService.remove("cartItems", bookId);
    event.target.parentElement.parentElement.remove();
}
function orderBook() {
    var fullName = document.getElementById("customerName").value;
    var email = document.getElementById("customerEmail").value;
    var address = document.getElementById("customerAddress").value;
    var phone = parseInt(document.getElementById("customerPhone").value);

    var bookIds = localStorageService.getAll("cartItems");

    var data = {
        fullName: fullName,
        email: email,
        address: address,
        phone: phone,
        bookIds: bookIds
    }

    if (validateForm()) {
        axios.post("https://localhost:44380/api/orders", data)
            .then(function (response) {
                var cardContainer = document.getElementById("cart-card-container");
                cardContainer.innerHTML = "";
                localStorageService.clear("cartItems");

                var orderFormContainer = document.getElementById("orderFormContainer");
                orderFormContainer.innerHTML = "";

                var message = response.data;
                var statusColor = "alert-success";

                alert(cardContainer, message, statusColor);

                //redirecting:
                //location.href = "./index.html";

            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status == 400) {
                    alert("There has been a change in your order. Please refresh your page.");
                //     var cardContainer = document.getElementById("cart-card-container");

                //     for (const property in error.response.data.errors) {

                //         var message = error.response.data.errors[property];
                //         alert(cardContainer, message, "danger");
                //     }
                };
            });
    } else {
        var cardContainer = document.getElementById("cart-card-container");
        if (!cardContainer.hasAttribute("alert")) {
            var message = "All fields are required!";
            var statusColor = "alert-danger";
            alert(cardContainer, message, statusColor);
        }
    }
}

initCart();
