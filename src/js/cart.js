import {
  getLocalStorage,
  loadHeaderFooter,
  renderListWithTemplate,
  setLocalStorage,
  cartCount,
  
} from "./utils.mjs";

loadHeaderFooter();



function cartItemTemplate(item) {
  const quantityArray = getLocalStorage("quantity") || [];
  const quantityItem = quantityArray.find((e) => e.id === item.Id);
  const quantity = quantityItem ? quantityItem.quantity : 1;

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
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function removeItemFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  let quantityArray = getLocalStorage("quantity") || [];

  quantityArray = quantityArray.filter((item) => item.id !== id);
  cartItems = cartItems.filter((item) => item.Id !== id);

  setLocalStorage("quantity", quantityArray);
  setLocalStorage("so-cart", cartItems);

  cartCount();
  renderCartContents();
}

function renderCartContents() {
  cartCount();

  const cartItems = getLocalStorage("so-cart") || [];
  const quantityArray = getLocalStorage("quantity") || [];
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".list-total");
  const cartList = document.querySelector(".product-list-cart");

  if (cartItems.length === 0) {
    cartList.innerHTML = `<li class="empty-cart">Your cart is empty.</li>`;
    cartFooter.classList.add("hide");
    cartTotal.textContent = "0.00";
    return;
  }

  cartFooter.classList.remove("hide");

  let total = 0;
  cartItems.forEach((item) => {
    const quantityItem = quantityArray.find((element) => element.id === item.Id);
    const quantity = quantityItem ? quantityItem.quantity : 1;
    total += Number(quantity) * item.FinalPrice;
  });

  renderListWithTemplate(cartItemTemplate, cartList, cartItems, "beforeend", true);
  cartTotal.textContent = total.toFixed(2);

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      removeItemFromCart(id);
    });
  });
}

renderCartContents();
