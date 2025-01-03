import { cart } from "../../data/cart.js";
import { WindowUtils } from "../../utils/WindowUtils.js";
import { ComponentV2 } from "../componentV2.js";
import { checkLogin } from "../../utils/LoginUtils.js";

export class AmazonHeader extends ComponentV2 {
  events = {
    "click .js-hamburger-menu-toggle": (event) =>
      this.#toggleDropdownMenu(event),
    "keyup .js-search-bar": (event) => this.#handleSearchBarInput(event),
    "click .js-search-button": (event) => this.#handleSearchClick(event),
  };

  render() {
    const searchParams = new URLSearchParams(WindowUtils.getSearch());
    const searchText = searchParams.get("search") || "";
    const totalCartQuantity = cart.calculateTotalQuantity();

    // Check if the user is logged in using the checkLogin function
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    this.element.innerHTML = `
      <section class="left-section">
        <div class="logo-container">
          <a href="amazon.html" class="header-link">
            <img class="amazon-logo"
              src="images/amazon-logo-white.png">
            <img class="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png">
          </a>
          <a class="login-link header-link" href="login.html">
            <img src="images/icons/login-icon2.png" class="login-icon" id="loginIcon">
          </a>
        </div>
    </section>

      <section class="middle-section">
        <input class="js-search-bar search-bar" type="text"
          placeholder="Search" value="${searchText}"
          data-testid="search-input">

        <button class="js-search-button search-button"
          data-testid="search-button">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </section>

      <section class="right-section">
        <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="js-cart-quantity cart-quantity" data-testid="cart-quantity">
          ${totalCartQuantity}
        </div>
        <div class="cart-text">Cart</div>
      </a>
      </section>

      <section class="right-section-mobile">
        <img class="js-hamburger-menu-toggle hamburger-menu-toggle"
          src="images/icons/hamburger-menu.png"
          data-testid="hamburger-menu-toggle">
      </section>

      <div class="js-hamburger-menu-dropdown hamburger-menu-dropdown"
        data-testid="hamburger-menu-dropdown">
        <a class="hamburger-menu-link" href="orders.html" onclick="checkLogin(event, 'orders.html')">
          Returns & Orders
        </a>
        <a class="hamburger-menu-link" href="checkout.html" onclick="checkLogin(event, 'checkout.html')">
          Cart (<span class="js-cart-quantity-mobile cart-quantity-mobile"
            data-testid="cart-quantity-mobile">${totalCartQuantity}</span>)
        </a>
      </div>
    `;

    // If the user is logged in, change the login icon to panda.png
    if (isLoggedIn) {
      this.changeLoginIconToPanda();
    }

    this.bindEvents();
  }

  updateCartCount() {
    const totalCartQuantity = cart.calculateTotalQuantity();
    this.element.querySelector(".js-cart-quantity").textContent =
      totalCartQuantity;
    this.element.querySelector(".js-cart-quantity-mobile").textContent =
      totalCartQuantity;
  }

  bindEvents() {
    const ordersLink = this.element.querySelector(".orders-link");
    const cartLink = this.element.querySelector(".cart-link");

    if (ordersLink) {
      ordersLink.addEventListener("click", (event) =>
        checkLogin(event, "orders.html")
      );
    }

    if (cartLink) {
      cartLink.addEventListener("click", (event) =>
        checkLogin(event, "checkout.html")
      );
    }
  }

  #toggleDropdownMenu() {
    const dropdownMenu = this.element.querySelector(
      ".js-hamburger-menu-dropdown"
    );
    const isOpened = dropdownMenu.classList.contains("hamburger-menu-opened");

    if (!isOpened) {
      dropdownMenu.classList.add("hamburger-menu-opened");
    } else {
      dropdownMenu.classList.remove("hamburger-menu-opened");
    }
  }

  #handleSearchBarInput(event) {
    if (event.key === "Enter") {
      this.#searchProducts(this.element.querySelector(".js-search-bar").value);
    }
  }

  #handleSearchClick() {
    this.#searchProducts(this.element.querySelector(".js-search-bar").value);
  }

  #searchProducts(searchText) {
    if (!searchText) {
      WindowUtils.setHref("./");
      return;
    }

    WindowUtils.setHref(`./?search=${searchText}`);
  }

  // New function to change the login icon to panda.png
  changeLoginIconToPanda() {
    const loginIcon = this.element.querySelector("#loginIcon");
    if (loginIcon) {
      loginIcon.src = "images/icons/panda.png"; // Change the icon source
    }
  }
}

// Add event listeners to the orders and cart links when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const ordersLink = document.querySelector(".orders-link");
  const cartLink = document.querySelector(".cart-link");

  if (ordersLink) {
    ordersLink.addEventListener("click", (event) =>
      checkLogin(event, "orders.html")
    );
  }

  if (cartLink) {
    cartLink.addEventListener("click", (event) =>
      checkLogin(event, "checkout.html")
    );
  }
});
