import { validationResult } from "express-validator"
import ProductManager from "../models/product/ProductManager.mjs"

class ProductController {
  static async loadList(req, res) {
    try {
      const products = await ProductManager.getList(
        {},
        { sort: { price: req.session.sortInAscOrder ? 1 : -1 } }
      )

      res.render("product/list", {
        metaTitle: "Products List",
        products,
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async create(req, res) {
    const { title, price, amount } = req.body
    const product = { title, price, amount }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("product/form", {
        metaTitle: "Form",
        product,
        errors: errors.array(),
      })
    }
    try {
      await ProductManager.create({ title, price, amount })
      req.session.sortInAscOrder = false
      res.redirect("/products")
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async renderForm(req, res) {
    try {
      res.render("product/form", {
        metaTitle: "Form",
        errors: [],
        product: null,
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
