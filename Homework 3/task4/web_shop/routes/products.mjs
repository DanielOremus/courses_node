import { Router } from "express"
import fs from "fs"
const router = Router()

router.get("/add-product", (req, res) => {
  res.render("add_product")
})
router.get("/", (req, res) => {
  fs.readFile("./db/data.json", (err, data) => {
    if (err) return res.status(500).send("Error")
    const products = JSON.parse(data)
    res.render("products", { products })
  })
})

export default router
