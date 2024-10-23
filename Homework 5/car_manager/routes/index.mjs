import { Router } from "express"

const router = Router()
router.get("/", (req, res) => {
  res.redirect("html/home.html")
})
router.get("/about", (req, res) => {
  res.redirect("html/about.html")
})

export default router
