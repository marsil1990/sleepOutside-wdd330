// Product Data
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: "servicesError",
      message: jsonResponse,
    };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async getData(query) {
    const response = await fetch(`${baseURL}products/search/${query}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    return data.Result;
  }

  async searchProducts(searchTerm) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

    const resultsByCategory = await Promise.all(
      categories.map((category) => this.getData(category)),
    );

    const allProducts = resultsByCategory.flat();
    const term = searchTerm.toLowerCase();

    return allProducts.filter((product) => {
      const brand = product.Brand.Name.toLowerCase();
      const name = product.NameWithoutBrand.toLowerCase();
      const category = product.Category.toLowerCase();

      return (
        brand.includes(term) || name.includes(term) || category.includes(term)
      );
    });
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
