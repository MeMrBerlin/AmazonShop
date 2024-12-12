export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

// try {
//   const storedCart = JSON.parse(localStorage.getItem("cart"));
//   if (Array.isArray(storedCart)) {
//     cart = storedCart;
//   }
// } catch (e) {
//   console.error("Error parsing cart from localStorage:", e);
// }
// if (!cart.length) {
//   cart = [
//     {
//       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity: 2,
//       deliveryOptionId: "1",
//     },
//     {
//       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//       quantity: 1,
//       deliveryOptionId: "2",
//     },
//   ];
//   saveToStorage();
// }

//! function to save cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//! add to cart function
export function addToCartFunc(quantity, productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += parseInt(quantity);
  } else {
    cart.push({
      productId: productId,
      quantity: parseInt(quantity),
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

//! function to delete items from cart

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
