class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData("/products")
  }
  static async getProductById(id) {
    return RequestManager.fetchData(`/products/${id}`, true)
  }
  static async addProduct(formEl) {
    return RequestManager.putOrPostFormRequest(
      "POST",
      "/products/register",
      formEl,
      "./list.html"
    )
  }
  static async editProduct(id, formEl) {
    return RequestManager.putOrPostFormRequest(
      "PUT",
      `/products/${id}`,
      formEl,
      "./list.html"
    )
  }
  static async deleteProduct(id) {
    return RequestManager.deleteRequest("/products", id)
  }
}
