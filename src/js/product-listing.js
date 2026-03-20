import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { cartCount, loadHeaderFooter, getParam } from "./utils.mjs";

// My MAIN

const category = getParam("category");
const search = getParam("search");
const query = search || category;

const productData = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(query, productData, listElement);

async function initPage() {
  loadHeaderFooter();

  if (search) {
    const results = await productData.searchProducts(search);
    productList.renderList(results);
  } else {
    productList.init();
  }

  cartCount();

  const maxInput = document.getElementById("maxPrice");
  const maxButton = document.getElementById("filterBtn");

  maxButton.addEventListener("click", () => {
    const max = Number(maxInput.value);
    productList.sortListByprice(max);
  });
}

initPage();
