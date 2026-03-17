import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { cartCount, loadHeaderFooter, getParam } from "./utils.mjs";

//My MAIN

const category = getParam("category");
const productData = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, productData, listElement);
loadHeaderFooter();
productList.init();
cartCount();

const maxInput = document.getElementById("maxPrice");
const maxButton = document.getElementById("filterBtn");
maxButton.addEventListener("click", () => {
  const max = Number(maxInput.value);
  productList.sortListByprice(max);
});
