import { Router } from "express"
import isAuthorized from "../middlewares/isAuthorized.mjs"
import ProductController from "../controllers/ProductController.mjs"

const router = Router()

router.get("/", isAuthorized, ProductController.loadList)

export default router
