import { Router } from "express"
import isAuthorized from "../middlewares/isAuthorized.mjs"
import ProductController from "../controllers/ProductController.mjs"
import { checkSchema } from "express-validator"
import ProductValidator from "../validators/ProductValidator.mjs"

const router = Router()

router.get("/", isAuthorized, ProductController.loadList)

<<<<<<< HEAD
router.delete("/", isAuthorized, ProductController.delete)
=======
router.get("/addProduct", isAuthorized, ProductController.renderForm)

router.post(
  "/addProduct",
  isAuthorized,
  checkSchema(ProductValidator.schema),
  ProductController.create
)
>>>>>>> 4b02d4bcfbae6203b41634d702e8ed7892d75c8e

router.delete("/", isAuthorized, ProductController.delete)

export default router
