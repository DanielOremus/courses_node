import ProductManager from "../models/product/ProductManager.mjs"

class ProductController {
  static async loadList(req, res) {
    try {
      const products = await ProductManager.getList({}, { sort: { price: -1 } })
      console.log(products)

      res.render("product/list", {
        metaTitle: "Products List",
        products,
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}
export default ProductController
