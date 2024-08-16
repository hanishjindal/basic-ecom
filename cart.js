document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Get products from localStorage
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  // Function to calculate total price
  function calculateTotalPrice() {
    let total = 0;
    storedProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Function to load cart items
  function loadCartItems() {
    cartItemsContainer.innerHTML = "";

    if (storedProducts.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      calculateTotalPrice(); // Recalculate total price after clearing cart
      return;
    }

    storedProducts.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
          <img src="product-placeholder.jpg" alt="${product.name}">
          <div class="cart-item-details">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" data-product="${
              product.name
            }">-</button>
            <input type="text" value="${
              product.quantity
            }" class="quantity-input" readonly>
            <button class="quantity-btn" data-product="${
              product.name
            }">+</button>
          </div>
        `;

      cartItemsContainer.appendChild(cartItem);
    });

    calculateTotalPrice(); // Recalculate total price after loading cart
  }

  // Function to update product quantity in localStorage
  function updateProductQuantity(productName, quantity) {
    const productIndex = storedProducts.findIndex(
      (product) => product.name === productName
    );

    if (productIndex > -1) {
      if (quantity === 0) {
        storedProducts.splice(productIndex, 1);
      } else {
        storedProducts[productIndex].quantity = quantity;
      }

      localStorage.setItem("products", JSON.stringify(storedProducts));
      loadCartItems(); // Reload cart items after updating quantity
    }
  }

  // Event delegation for quantity buttons
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-btn")) {
      const productName = e.target.getAttribute("data-product");
      const quantityInput = e.target
        .closest(".cart-item-quantity")
        .querySelector(".quantity-input");
      let quantity = parseInt(quantityInput.value, 10);

      if (e.target.textContent === "+") {
        quantity += 1;
      } else if (e.target.textContent === "-" && quantity > 0) {
        quantity -= 1;
      }

      updateProductQuantity(productName, quantity);
    }
  });

  // Load cart items on page load
  loadCartItems();
});
