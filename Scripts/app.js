function initApp() {
    getAllBooksFromApi();
}

function getAllBooksFromApi() {
    renderCards('https://localhost:44380/api/books');
}
function createCard(book) {
    var col = document.createElement("div");
    col.classList.add("col-md-3");

    var card = document.createElement("div");
    card.classList.add("card");

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;

    var cardAuthor = document.createElement("h4");
    cardAuthor.classList.add("card-title");
    cardAuthor.innerText = "Author: " + book.author;

    var cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = "Description: " + book.description;

    var cardGenre = document.createElement("p");
    cardGenre.classList.add("card-text");
    cardGenre.innerText = "Genre: " + book.genre;

    var cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.innerText = "Price: " + book.price;

    var cardBtn = document.createElement("button");
    cardBtn.classList.add("btn");
    cardBtn.classList.add("btn-primary");

    var checkIfExistsInCart = existsInStorage(book.id);

    if (checkIfExistsInCart) {
        cardBtn.innerHTML = "Remove from cart";
        cardBtn.onclick = function (e) {
            removeFromCart(e, book.id);
        }
    } else {
        cardBtn.innerHTML = "Add to cart";
        cardBtn.onclick = function (e) {
            addToCart(e, book.id);
        }
    }

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardAuthor);
    cardBody.appendChild(cardGenre);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardBtn);

    card.appendChild(cardBody);
    col.appendChild(card);

    var cardContainer = document.getElementById("card-container");
    cardContainer.appendChild(col);
}

function getWithFilter() {
    var authorSearchInput = document.getElementById("authorSearchInput").value;
    var titleSearchInput = document.getElementById("titleSearchInput").value;
    renderCards(`https://localhost:44380/api/books?author=${authorSearchInput}&title=${titleSearchInput}`);
}
function renderCards(url) {
    axios.get(url)
        .then(function (response) {
            var cardContainer = document.getElementById("card-container");
            cardContainer.innerHTML = "";
            
            if (response.data.lenth == 0) {
                cardContainer.innerHTML = "There are no books in the DB at this moment";
            }else{
                for (let i = 0; i < response.data.length; i++) {
                    createCard(response.data[i]);
                }
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
}
function addToCart(event, bookId) {
    var cartItems = [];

    var storageData = localStorage.getItem("cartItems");
    if (storageData != null) {
        var cartItems = JSON.parse(storageData);
    }
    if (cartItems.indexOf(bookId) == -1) {
        cartItems.push(bookId);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    event.target.innerHTML = "Remove from cart";
    event.target.onclick = function (e) {
        removeFromCart(e, bookId);
    };
}
function removeFromCart(event, bookId) {

    var storageData = localStorage.getItem("cartItems");

    if (storageData != null) {
        var cartItems = JSON.parse(storageData);

        cartItems = cartItems.filter(x => x != bookId);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    event.target.innerHTML = "Add to cart";
    event.target.onclick = function (e) {
        addToCart(e, bookId);
    };
}
function existsInStorage(cartItem) {
    var exists = false;
    var storageData = localStorage.getItem("cartItems");

    if (storageData != null) {
        var cartItems = JSON.parse(storageData);

        if (cartItems.indexOf(cartItem) != -1) {
            exists = true;
        }
    }
    return exists;
}

// function createBook() {
//     var newBook = {
//         title:  "New title",
//         description: "New desc",
//         author: "New author",
//         genre: "New genre",
//         quantity: 100,
//         price: 200
//     }
//     axios.post('https://localhost:44380/api/books', newBook)
//         .then(function (response) {
//             createCard(newBook);

//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }



initApp();

