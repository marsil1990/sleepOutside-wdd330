import {
  getLocalStorage,
  setLocalStorage,
  cartCount,
  alertMessage,
} from "./utils.mjs";
//Product details
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

  addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const existingItem = cart.find((item) => item.Id === this.product.Id);

    const quantity = getLocalStorage("quantity") || [];

    if (existingItem) {
      const newQuantity = quantity.map((e) => {
        if (e.id === existingItem.Id) {
          return { ...e, quantity: e.quantity + 1 };
        }
        return e;
      });

      setLocalStorage("quantity", newQuantity);
    } else {
      cart.push(this.product);
      setLocalStorage("so-cart", cart);
      quantity.push({ id: this.product.Id, quantity: 1 });
      setLocalStorage("quantity", quantity);
    }

    cartCount();
    alertMessage("The product has been added successfully");
  }
  renderProductDetails() {
    document.querySelector(".product-detail h2").textContent =
      this.product.Brand.Name;

    document.querySelector(".product-detail h3").textContent =
      this.product.NameWithoutBrand;

    const image = document.getElementById("productImage");
    if (this.product.Image !== undefined) {
      image.src = this.product.Image;
    } else {
      image.src = this.product.Images.PrimaryLarge;
    }

    image.alt = this.product.Name;

    document.getElementById("productPrice").textContent =
      `$${this.product.FinalPrice}`;

    document.getElementById("productColor").textContent =
      this.product.Colors[0].ColorName;

    document.getElementById("productDesc").innerHTML =
      this.product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = this.product.Id;
  }
}
