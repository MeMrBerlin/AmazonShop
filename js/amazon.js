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
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price"> &#8377 ${formatCurrency(
            product.priceCents
          )}</div>

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

console.log(productHtml);
document.querySelector(".js-products-grid").innerHTML = productHtml;

//! update cart quantity function
function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}
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
