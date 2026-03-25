//UTILS
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = true,
) {
  const htmlStrings = list.map(template);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(
  template,
  parentElement,
  // data,
  callback,
) {
  // parentElement.innerHTML = template;
  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);
  if (callback) {
    callback();
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, () => {
    cartCount();
    initSearchForm();
  });
  renderWithTemplate(footerTemplate, footerElement);
}

// get product by id from search tool
function initSearchForm() {
  console.log("initSearchForm running");

  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");

  console.log(searchForm, searchInput);

  if (!searchForm || !searchInput) return;

  searchForm.addEventListener("submit", (e) => {
    console.log("submit detected");
    e.preventDefault();

    const searchTerm = searchInput.value.trim();
    console.log("search term:", searchTerm);

    if (!searchTerm) return;

    window.location.href = `/product_listing/index.html?search=${encodeURIComponent(searchTerm)}`;
  });
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function cartCount() {
  const cart = JSON.parse(localStorage.getItem("quantity")) || [];
  const sum = cart.reduce((acum, q) => Number(q.quantity) + acum, 0);
  const itemsNumber = document.querySelector(".itemsNumber");

  if (itemsNumber) {
    itemsNumber.textContent = sum;
  }
}

export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  if (!main) return;
  if (document.querySelector("ul")) ul.remove();
  const ul = document.createElement("ul");
  const div = document.createElement("div");
  div.classList.add("container-errors");
  if (message && typeof message === "object") {
    Object.values(message).forEach((value) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");
      span.innerHTML = value;
      button.classList.add("remove");
      button.innerHTML = "X";

      button.addEventListener("click", () => {
        li.remove();
        button.remove();
        if (!ul.children.length) {
          ul.remove();
        }
      });
      li.append(span);
      li.append(button);
      ul.append(li);
    });
  } else {
    const li = document.createElement("li");

    const button = document.createElement("button");
    li.innerHTML = message;
    button.classList.add("remove");
    button.innerHTML = "X";

    button.addEventListener("click", () => {
      li.remove();
      button.remove();
      if (!ul.children.length) {
        ul.remove();
      }
    });
    li.append(button);
    ul.append(li);
  }
  div.appendChild(ul);
  main.prepend(div);

  if (scroll) window.scrollTo(0, 0);
}
