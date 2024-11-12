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
  static async delete(req, res) {
    try {
      const id = req.body.id
      const product = await ProductManager.deleteById(id)
      if (!product)
        return res
          .status(404)
          .json({ success: false, msg: "Product not found" })
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}
export default ProductController
