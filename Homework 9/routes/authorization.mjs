import { Router } from "express"

const router = Router()

router.get("/login", (req, res) => {
  if (req.session.user) return res.redirect("../products")
  res.render("authorization/login", {
    metaTitle: "Login",
  })
})
router.post("/login", (req, res) => {
  const { userName, password } = req.body
  req.session.user = { userName, password }
  console.log(111)

  res.redirect("../products")
})

export default router
