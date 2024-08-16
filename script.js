document.addEventListener("DOMContentLoaded", () => {
  // Initialize the products array in localStorage if not already present
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Select all quantity selectors and favourite buttons
  const quantitySelectors = document.querySelectorAll(".quantity-selector");
  const favouriteButtons = document.querySelectorAll(".favourite-btn");

  quantitySelectors.forEach((selector) => {
    const minusBtn = selector.querySelector(".quantity-btn:first-child");
    const plusBtn = selector.querySelector(".quantity-btn:last-child");
    const quantityInput = selector.querySelector(".quantity-input");
    const productCard = selector.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = parseFloat(
      productCard.querySelector("p").textContent.replace("$", "")
    );

    // Load initial quantity from localStorage if available
    const savedProduct = storedProducts.find(
      (product) => product.name === productName
    );
    if (savedProduct) {
      quantityInput.value = savedProduct.quantity;
    }

    // Increase quantity
    plusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value, 10);
      quantity += 1;
      quantityInput.value = quantity;
      updateLocalStorage(productName, productPrice, quantity);
    });

    // Decrease quantity
    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value, 10);
      if (quantity > 0) {
        quantity -= 1;
        quantityInput.value = quantity;
        if (quantity === 0) {
          removeFromLocalStorage(productName);
        } else {
          updateLocalStorage(productName, productPrice, quantity);
        }
      }
    });
  });

  // Function to update localStorage for products
  function updateLocalStorage(productName, productPrice, quantity) {
    const productIndex = storedProducts.findIndex(
      (product) => product.name === productName
    );

    if (productIndex > -1) {
      // Update existing product
      storedProducts[productIndex].quantity = quantity;
    } else {
      // Add new product
      storedProducts.push({
        name: productName,
        price: productPrice,
        quantity: quantity,
      });
    }

    localStorage.setItem("products", JSON.stringify(storedProducts));
  }

  // Function to remove product from localStorage
  function removeFromLocalStorage(productName) {
    const productIndex = storedProducts.findIndex(
      (product) => product.name === productName
    );
    if (productIndex > -1) {
      storedProducts.splice(productIndex, 1);
      localStorage.setItem("products", JSON.stringify(storedProducts));
    }
  }

  // Handle favourite button clicks
  favouriteButtons.forEach((button) => {
    const productCard = button.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;

    // Check if the product is already in favourites
    const isFavourite = storedFavourites.some(
      (product) => product.name === productName
    );

    if (isFavourite) {
      button.textContent = "Remove from Favourites";
      button.classList.add("favourited");
    } else {
      button.textContent = "Add to Favourites";
    }

    button.addEventListener("click", () => {
      const isFavourite = storedFavourites.some(
        (product) => product.name === productName
      );

      if (isFavourite) {
        // Remove from favourites
        removeFromFavourites(productName);
        button.textContent = "Add to Favourites";
        button.classList.remove("favourited");
      } else {
        // Add to favourites
        addToFavourites(productName);
        button.textContent = "Remove from Favourites";
        button.classList.add("favourited");
      }
    });
  });

  // Function to add a product to favourites
  function addToFavourites(productName) {
    const productIndex = storedProducts.findIndex(
      (product) => product.name === productName
    );

    if (productIndex > -1) {
      storedFavourites.push(storedProducts[productIndex]);
      localStorage.setItem("favourites", JSON.stringify(storedFavourites));
    }
  }

  // Function to remove a product from favourites
  function removeFromFavourites(productName) {
    const productIndex = storedFavourites.findIndex(
      (product) => product.name === productName
    );
    if (productIndex > -1) {
      storedFavourites.splice(productIndex, 1);
      localStorage.setItem("favourites", JSON.stringify(storedFavourites));
    }
  }
});
