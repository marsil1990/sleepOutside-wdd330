export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    const element = document.querySelector(".product-detail");

    element.querySelector("h3").textContent = this.product.Brand;
    element.querySelector("h2").textContent = this.product.NameWithoutBrand;
    element.querySelector("img").src = this.product.Image;
    element.querySelector(".product-card__price").textContent = `$${this.product.FinalPrice}`;
  }

  addProductToCart() {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    localStorage.setItem("so-cart", JSON.stringify(cart));
  }
}

