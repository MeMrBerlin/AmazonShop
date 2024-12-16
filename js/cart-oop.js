function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage: function () {
      this.cartItem = JSON.parse(localStorage.getItem("localStorageKey"));
      if (!this.cartItems) {
        this.cartItems = [
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
    },
    //! function to save cart to localStorage
    saveToStorage: function () {
      localStorage.setItem("localStorageKey", JSON.stringify(this.cartItems));
    },

    //! add to cart function
    addToCartFunc: function (quantity, productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += parseInt(quantity);
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: parseInt(quantity),
          deliveryOptionId: "1",
        });
      }
      this.saveToStorage();
    },

    //! function to delete items from cart
    removeFromCart: function (productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateDeliveryOption: function (productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
// cart.addToCartFunc(2, "8b5a2ee1-6055-422a-a666-b34ba28b76d4");
cart.loadFromStorage();
console.log(cart);

const businessCart = Cart("business-cart-oop");
businessCart.loadFromStorage();
console.log(businessCart);
