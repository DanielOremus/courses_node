import { Router } from "express"
import { checkSchema, validationResult } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"

const router = Router()

router.get("/login", (req, res) => {
  if (req.session.user) return res.redirect("../products")
  res.render("authorization/login", {
    metaTitle: "Login",
    errors: [],
    user: null,
  })
})
router.post("/login", checkSchema(UserValidator.schema), (req, res) => {
  const { userName, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).render("authorization/login", {
      metaTitle: "Login",
      errors: errors.array(),
      user: {
        userName,
        password,
      },
    })
  }
  req.session.user = { userName, password }
  req.session.sortInAscOrder = true
  res.redirect("../products")
})

export default router
