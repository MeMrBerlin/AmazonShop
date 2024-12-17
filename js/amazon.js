import { cart, addToCartFunc } from "./cart.js";
import { products } from "./products.js";
import { formatCurrency } from "./utils/money.js";

let productHtml = "";
products.forEach((product) => {
  productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            <span>${product.name}</span>
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price"> &#8377 ${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id = "${product.id}"><span>
          Add to Cart</span></button>
        </div>
`;
});

// console.log(productHtml);
document.querySelector(".js-products-grid").innerHTML = productHtml;

//! update cart quantity function
function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

function checkLogin(event) {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    event.preventDefault();
    alert("You have to login first!");
  }
}

//! Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantity = button
      .closest(".product-container")
      .querySelector(".product-quantity-container select").value;

    addToCartFunc(quantity, productId);
    updateCartQuantity();
  });
});

//! Add event listener to the cart icon to check if user is logged in
document.querySelector(".cart-link").addEventListener("click", checkLogin);

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const addToCart = button.previousElementSibling;
    if (addToCart) {
      addToCart.style.opacity = "1";
      addToCart.classList.remove("fade-out");
      setTimeout(() => {
        addToCart.classList.add("fade-out");
      }, 700);
    }
  });
});

//! Function to update the login icon after successful login
function updateLoginIcon() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    const loginIcon = document.getElementById("loginIcon");
    if (loginIcon) {
      loginIcon.src = "images/icons/panda.png"; //! Change the image to panda.png
    }
  }
}
document.addEventListener("DOMContentLoaded", updateLoginIcon);
