import {
  getLocalStorage,
  setLocalStorage,
  cartCount,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function removeItemFromCart(id) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id !== id);

  setLocalStorage("so-cart", cartItems);

  cartCount();
  renderCartContents();
}

function renderCartContents() {
  cartCount();
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".product-list-cart").innerHTML = "";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list-cart").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      removeItemFromCart(id);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">

    <span class="remove-item" data-id="${item.Id}">X</span>

    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>

    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>

    </li>`;

  return newItem;
}

renderCartContents();
