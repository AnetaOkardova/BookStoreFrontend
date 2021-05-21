var cartItems = [];
debugger;
var storageData = localStorage.getItem('cartItems');
if (storageData != null) {
    cartItems = JSON.parse(storageData);
}

var cardContainer = document.getElementById("cart-card-container");
cardContainer.innerHTML = "";

for (let i = 0; i < cartItems.length; i++) {
    axios.get('https://localhost:44380/api/books/1' )
        .then(function (response) {
            createCard(response.data);

            // if (response.data.lenth == 0) {
            //     cardContainer.innerText = "The cart is empty";
            // }
            // for (let i = 0; i < response.data.length; i++) {
            //     createCard(response.data[i]);
            // }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// cartItems.forEach(item => {
//     debugger;
//     axios.get(`https://localhost:44380/api/books/${item}`)
//         .then(function (response) {


//             if (response.data.lenth == 0) {
//                 cardContainer.innerText = "The cart is empty";
//             }
//             for (let i = 0; i < response.data.length; i++) {
//                 createCard(response.data[i]);
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });