import { cart, removeFromCart, updateDeliveryOption } from "../cart.js";
import { products, getProduct } from "../products.js";
import { deliveryOptions, getDeliveryOption } from "../deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { formatCurrency } from "../utils/money.js";

// Function to update the cart quantity display
function updateCartQuantity() {
  let cartQuantity = 0; // Reset cartQuantity each time it's updated
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
}

export function renderOrderSummary() {
  // Render the cart summary
  let cartSummeryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const deliveryString = deliveryDate.format("dddd, MMMM D");

    cartSummeryHTML += `
<div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${deliveryString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">&#8377 ${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
`;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummeryHTML;

  // Update the cart quantity display when rendering order summary
  updateCartQuantity();

  // Add event listeners for delete links
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      if (container) {
        container.remove(); // Only remove if the container exists
      }

      // Update the cart quantity after deletion
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const deliveryString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `&#8377 ${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
    <div class="delivery-option js-delivery-option" data-product-id = "${
      matchingProduct.id
    }" data-delivery-option-id = "${deliveryOption.id}">
                  <input
                    type="radio"
                    ${isChecked ? "Checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${deliveryString}</div>
                    <div class="delivery-option-price">${priceString} - Shipping</div>
                  </div>
                </div>
    `;
    });
    return html;
  }

  // Only update delivery option, without affecting cart quantity
  document.querySelectorAll(".js-delivery-option").forEach((e) => {
    e.addEventListener("click", () => {
      const { productId, deliveryOptionId } = e.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      // Re-render the order summary and payment summary without updating cart quantity
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
