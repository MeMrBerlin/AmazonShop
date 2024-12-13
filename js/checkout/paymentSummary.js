import { cart } from "../cart.js";
import { getProduct } from "../products.js";
import { getDeliveryOption } from "../deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  //   console.log(productPriceCents);
  //   console.log(shippingPriceCents);
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const Tax = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + Tax;

  const paymentSummaryHTML = `
  <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${(
              84.86 *
              (productPriceCents / 100)
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${(
              84.86 *
              (shippingPriceCents / 100)
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${(
              84.86 *
              (totalBeforeTax / 100)
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${((Tax / 100) * 84.86).toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${(
              84.86 *
              (totalCents / 100)
            ).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
