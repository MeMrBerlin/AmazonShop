import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "./products.js";
// import "../js/cart-class.js";
// import "./backend-practice.js";
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
