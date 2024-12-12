import { cart, removeFromCart, updateDeliveryOption } from "./cart.js";
import { products } from "./products.js";
import { deliveryOption } from "./deliveryOptions.js";
// //! default export
// import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

let cartSummeryHTML = ""; // Initialize with an empty string

// cart.forEach((cartItem) => {
//   const productId = cartItem.productId;
//   let matchingProduct;
//   products.forEach((product) => {
//     if (product.id === productId) {
//       matchingProduct = product;
//     }
//   });

//   const deliveryOptionId = cartItem.deliveryOptionId;
//   let deliveryOption;
//   deliveryOption.forEach((option) => {
//     if (option.id === deliveryOptionId) {
//       deliveryOption = option;
//     }
//   });

//   const today = dayjs();
//   const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
//   const deliveryString = deliveryDate.format("dddd, MMMM D");

//   cartSummeryHTML += `<div class="cart-item-container js-cart-item-container-${
//     matchingProduct.id
//   }">
//     <div class="delivery-date">Delivery date: ${deliveryString}</div>

//             <div class="cart-item-details-grid">
//               <img
//                 class="product-image"
//                 src="${matchingProduct.image}"
//               />

//               <div class="cart-item-details">
//                 <div class="product-name">
//                   ${matchingProduct.name}
//                 </div>
//                 <div class="product-price">&#8377 ${(
//                   (matchingProduct.priceCents / 100) *
//                   84.86
//                 ).toFixed(2)}</div>
//                 <div class="product-quantity">
//                   <span> Quantity: <span class="quantity-label">${
//                     cartItem.quantity
//                   }</span> </span>
//                   <span class="update-quantity-link link-primary">
//                     Update
//                   </span>
//                   <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
//                     matchingProduct.id
//                   }">
//                     Delete
//                   </span>
//                 </div>
//               </div>

//               <div class="delivery-options">
//               <div class="delivery-options-title">
//                   Choose a delivery option:
//                 </div>
//                 ${deliveryOptionHTML(matchingProduct, cartItem)}
//               </div>
//             </div>
//         </div>
//     `;
// });

// // console.log(cartSummeryHTML);
// function deliveryOptionHTML(matchingProduct, cartItem) {
//   let html = "";
//   deliveryOption.forEach((deliveryOption) => {
//     const today = dayjs();
//     const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
//     const deliveryString = deliveryDate.format("dddd, MMMM D");
//     const priceString =
//       deliveryOption.priceCents === 0
// ? "FREE"
//         : `&#8377 ${((deliveryOption.priceCents / 100) * 84.86).toFixed(2)} -`;
//     const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
//     html += `

//     <div class="delivery-option js-delivery-option" data-product-id = "${
//       matchingProduct.id
//     }" data-delivery-id = "${deliveryOption.id}">
//                   <input
//                     type="radio"
//                     ${isChecked ? "Checked" : ""}
//                     class="delivery-option-input"
//                     name="delivery-option-${matchingProduct.id}"
//                   />
//                   <div>
//                     <div class="delivery-option-date">${deliveryString}</div>
//                     <div class="delivery-option-price">${priceString} - Shipping</div>
//                   </div>
//                 </div>

//     `;
//   });
//   return html;
// }

// document.querySelector(".js-order-summary").innerHTML = cartSummeryHTML;

// document.querySelectorAll(".js-delete-link").forEach((link) => {
//   link.addEventListener("click", () => {
//     // console.log("delete");
//     const productId = link.dataset.productId;
//     // console.log(productId);
//     removeFromCart(productId);
//     // console.log(cart);

//     document.querySelector(`.js-cart-item-container-${productId}`).remove();
//   });
// });

// document.querySelectorAll(".js-delivery-option").forEach((e) => {
//   e.addEventListener("click", () => {
//     const { productId, deliveryOptionId } = e.dataset;
//     updateDeliveryOption(productId, deliveryOptionId);
//   });
// });

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  // console.log(matchingProduct);

  cartSummeryHTML += `
<div class="cart-item-container js-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">&#8377 ${(
                  (matchingProduct.priceCents / 100) *
                  84.86
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummeryHTML;
