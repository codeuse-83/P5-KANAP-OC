const sectionItems = document.getElementById("items");

getData();

// Récupération de l'API et envoie une requête au back-end //
async function getData () {
  fetch("http://localhost:3000/api/products")
    // Récupération des données de l'API dans un fichier.json //
    .then((response) => response.json())
    //  Données mises dans la variable value //
    .then((value) => displayItems(value))
    //Si une erreure se produit un message s'affichera //
    .catch(() => {
      alert("Aucun article diponinle ce jour.<br>Merci de réessayer d'ici quelques jours ")
    });
};

// Fonction pour afficher les élements HTML //
function displayItems(value) {
  let displayHtml = "";
  //Boucle pour chaque article que l'on récupère //
  for (let product of value) {
    // C'est ici que les canapés s'affichent //
    displayHtml +=
      (`<a href="./product.html?id=${product._id}">
    <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}"/>
    <h3 class='productName'>${product.name}</h3>
    <p class='productDescription'>${product.description}</p>
    </article>
    </a>`);
  };
  // Affichage dans la section items //
  sectionItems.insertAdjacentHTML("afterbegin", displayHtml);
};


  