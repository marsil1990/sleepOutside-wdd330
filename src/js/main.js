import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { cartCount } from "./utils.mjs";

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", productData, listElement);
productList.init();
cartCount();
