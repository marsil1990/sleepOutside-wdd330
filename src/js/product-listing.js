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
