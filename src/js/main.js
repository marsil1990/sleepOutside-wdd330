import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { cartCount, loadHeaderFooter } from "./utils.mjs";

//My MAIN

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", productData, listElement);
loadHeaderFooter();
productList.init();
cartCount();
