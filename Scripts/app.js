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
    cardAuthor.innerText = book.author;

    var cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = book.description;

    var cardGenre = document.createElement("p");
    cardGenre.classList.add("card-text");
    cardGenre.innerText = book.genre;

    var cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.innerText = book.price;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardAuthor);
    cardBody.appendChild(cardGenre);
    cardBody.appendChild(cardPrice);

    card.appendChild(cardBody);
    col.appendChild(card);

    var cardContainer = document.getElementById("card-container");
    cardContainer.appendChild(col);
}
axios.get('https://localhost:44380/api/books')
    .then(function (response) {
        if (response.data.lenth == 0) {
            var cardContainer = document.getElementById("card-container");
            cardContainer.innerText = "There are no books in the DB at this moment";
        }
        for (let i = 0; i < response.data.length; i++) {
            createCard(response.data[i]);
        }

    })
    .catch(function (error) {
        console.log(error);
    });

function createBook() {
    var newBook = {
        title:  "New title",
        description: "New desc",
        author: "New author",
        genre: "New genre",
        quantity: 100,
        price: 200
    }
    axios.post('https://localhost:44380/api/books', newBook)
        .then(function (response) {
            createCard(newBook);

        })
        .catch(function (error) {
            console.log(error);
        });
}



