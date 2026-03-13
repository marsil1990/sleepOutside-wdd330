import { getLocalStorage, setLocalStorage, cartCount } from "./utils.mjs";
//Product details
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    cartCount();
  }
  renderProductDetails() {
    const productDetail = document.querySelector(".product-detail");

    productDetail.querySelector("h3").textContent = this.product.Brand.Name;
    productDetail.querySelector("h2").textContent =
      this.product.NameWithoutBrand;
    productDetail.querySelector("img").src = this.product.Image;
    productDetail.querySelector("img").alt = this.product.Name;
    productDetail.querySelector(".product-card__price").textContent =
      `$${this.product.FinalPrice}`;
    productDetail.querySelector(".product__color").textContent =
      this.product.Colors[0].ColorName;
    productDetail.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple;
    productDetail.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}
