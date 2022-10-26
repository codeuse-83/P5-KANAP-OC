// Récupération de l'ID dans l'URL avec URLSearchParams.
var url = new URL(window.location.href);
var currentId = url.searchParams.get("id");

//Appel de l'API pour recevoir les données du produit possédant l'ID récupéré et ajourt de ses valeurs dans le HTML.
fetch(`http://localhost:3000/api/products/${currentId}`)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    document.getElementById("title").textContent=value.name;
    document.getElementById("price").textContent=value.price;
    document.getElementById("description").textContent=value.description;
    let imageProduct = document.createElement("img");
    imageProduct.setAttribute("src",`${value.imageUrl}`);
    imageProduct.setAttribute("alt",`${value.altTxt}`);
    document.getElementsByClassName("item__img")[0].appendChild(imageProduct);
    let colorOptions = document.getElementById("color");
    for (i in value.colors) {
        let newColor = document.createElement("option");
        newColor.setAttribute("value",value.colors[i]);
        newColor.textContent = value.colors[i];
        colorOptions.appendChild(newColor);
    }
})
.catch(function(err) {
    console.log(err)
});

// Fonction alerte du choix aprés l'ajout au panier.
function afterAdd() {
    if (confirm("Le produit a bien été ajouté à votre panier.")) {
        window.location.href="../html/cart.html"
    } else {
        window.location.href="../html/index.html"
    }
}

// Ajout du produit dans le panier.
function addToCart() {
    //Paramètres actuels du produit
    let currentProduct = {
        id : currentId,
        color : document.getElementById("colors").value,
        quantity :document.getElementById("quantity").value
    };
    let cart = [];
    // Alerte si la couleur et la quantité n'est pas séléctionnée
    if (currentProduct.color == "" || currentProduct.quantity <= 0 || currentProduct.quantity > 100) {
       alert("Veuillez séléctionner une couleur et une quantité");
       return 
    }

     //Vérifier si le produit est dans le panier avec la même couleur afin de modifier que la quantité
     if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        for (i in cart) {
            if (cart[i].id == product_client.id && cart[i].color == product_client.color) {
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(product_client.quantity);
               localStorage.setItem("product_client", JSON.stringify(cart));
                afterAdd();
                return
            }
        };
    };
    if (currentProduct.color != "" && currentProduct.quantity > 0 && currentProduct.quantity < 101) {
        cart.push(currentProduct);
        localStorage.setItem("product_client", JSON.stringify(cart))
        afterAdd();
    }
}

document.getElementById("addToCart").addEventListener("click", addToCart);




