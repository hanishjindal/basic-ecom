document.addEventListener("DOMContentLoaded", () => {
  const favouriteItemsContainer = document.getElementById("favourite-items");

  // Get favourite products from localStorage
  const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Function to load favourite items
  function loadFavouriteItems() {
    favouriteItemsContainer.innerHTML = "";

    if (storedFavourites.length === 0) {
      favouriteItemsContainer.innerHTML =
        "<p>Your favourite list is empty.</p>";
      return;
    }

    storedFavourites.forEach((product) => {
      const favouriteItem = document.createElement("div");
      favouriteItem.classList.add("favourite-item");

      favouriteItem.innerHTML = `
          <img src="product-placeholder.jpg" alt="${product.name}">
          <div class="favourite-item-details">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
          </div>
          <div class="favourite-item-actions">
            <button class="remove-btn" data-product="${
              product.name
            }">Remove</button>
          </div>
        `;

      favouriteItemsContainer.appendChild(favouriteItem);
    });
  }

  // Function to remove product from favourites in localStorage
  function removeFromFavourites(productName) {
    const productIndex = storedFavourites.findIndex(
      (product) => product.name === productName
    );

    if (productIndex > -1) {
      storedFavourites.splice(productIndex, 1);
      localStorage.setItem("favourites", JSON.stringify(storedFavourites));
      loadFavouriteItems();
    }
  }

  // Event delegation for remove buttons
  favouriteItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const productName = e.target.getAttribute("data-product");
      removeFromFavourites(productName);
    }
  });

  // Load favourite items on page load
  loadFavouriteItems();
});
