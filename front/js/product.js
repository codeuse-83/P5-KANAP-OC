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



