import { Router } from "express"

const router = Router()
router.get("/", (req, res) => {
  res.render("main", {
    routes: [
      {
        title: "Add Product",
        url: "product/add-product",
      },
      {
        title: "Products List",
        url: "product",
      },
      {
        title: "About Us",
        url: "about.html",
      },
    ],
  })
})

export default router
