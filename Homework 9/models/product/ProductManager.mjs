import MongooseCRUDManager from "../MongooseCRUDManager.mjs"
import Product from "./Product.mjs"

class ProductManager extends MongooseCRUDManager {
  async getList(filters, options) {
    try {
      return await super.getList(filters, null, options)
    } catch (error) {
      return []
    }
  }
}

export default new ProductManager(Product)
