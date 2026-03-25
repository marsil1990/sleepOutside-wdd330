import { renderListWithTemplate } from "./utils.mjs";
//product list

function productCardTemplate(product, category) {
  return ` <li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
          </li>`;
}

//List of Product

export default class ProductList {
  constructor(category, query, dataSource, listElement) {
    this.query = query;
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const productlist = await this.dataSource.getData(this.category);
    this.renderList(productlist);
    document.querySelector("title").textContent = this.category;
  }

  async sortListByprice(price) {
    console.log(this.category);
    const productlist = await this.dataSource.getData(this.category);
    if (!price) {
      this.renderList(productlist);
      return;
    }
    let newList;
    newList = productlist.filter((product) => product.FinalPrice <= price);

    this.renderList(newList);
  }

  renderList(list) {
    document.querySelector(".title").textContent = this.category;
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
