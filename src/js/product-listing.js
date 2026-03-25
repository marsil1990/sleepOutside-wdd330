import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { cartCount, loadHeaderFooter, getParam } from "./utils.mjs";

// My MAIN

let category = getParam("category");
const search = getParam("search");
// const query = search || category;
const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
let matchedCategory = "";
if (search) {
  const term = search.toLowerCase();

  matchedCategory = categories.find(
    (cat) => cat.includes(term) || term.includes(cat),
  );
  category = matchedCategory;
}

const externalServices = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(
  category,
  search,
  externalServices,
  listElement,
);

async function initPage() {
  loadHeaderFooter();

  if (search) {
    const results = await externalServices.searchProducts(search);
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
