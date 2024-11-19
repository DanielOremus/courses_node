class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData("/products")
  }
  static async addProduct(data) {
    return RequestManager.postFormRequest("/products", data, "./list.html")
  }
  static async editProduct(id, data) {
    return RequestManager.postRequest(`/products/${id}`, data)
  }
  static async deleteProduct(id) {
    return RequestManager.deleteRequest("/products", id)
  }
}
