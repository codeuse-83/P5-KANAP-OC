// récupération de l'API et envoie une requête au back-end//

fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  // c'est ici que j'affiche les canapés //

  .catch(function(err) {
    // Une erreur est survenue
  });