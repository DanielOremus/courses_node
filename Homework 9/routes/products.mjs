import { Router } from "express"
import isAuthorized from "../middlewares/isAuthorized.mjs"
import ProductController from "../controllers/ProductController.mjs"
import { checkSchema } from "express-validator"
import ProductValidator from "../validators/ProductValidator.mjs"

const router = Router()

router.get("/", isAuthorized, ProductController.loadList)

router.get("/addProduct", isAuthorized, ProductController.renderForm)

router.post(
  "/addProduct",
  isAuthorized,
  checkSchema(ProductValidator.schema),
  ProductController.create
)

export default router
