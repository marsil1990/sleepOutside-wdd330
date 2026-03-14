import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { cartCount, loadHeaderFooter } from "./utils.mjs";
//Product
const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();
product.init();
cartCount();
