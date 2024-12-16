class Cart {
  cartItems = undefined;

  localStorageKey = undefined;
  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));
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
  }

  //! function to save cart to localStorage
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  //! add to cart function
  addToCartFunc(quantity, productId) {
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
  }

  //! function to delete items from cart
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart();
// cart.addToCartFunc(2, "8b5a2ee1-6055-422a-a666-b34ba28b76d4");
cart.localStorageKey = "cart-oop";
cart.loadFromStorage();
console.log(cart);

const businessCart = new Cart();
businessCart.localStorageKey = "business-cart-oop";
businessCart.loadFromStorage();
console.log(businessCart);
