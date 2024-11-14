import { Router } from "express"
import StudentController from "../controllers/StudentController.mjs"
import StudentValidator from "../validators/StudentValidator.mjs"
import { checkSchema } from "express-validator"

const router = Router()

router.get("/", StudentController.loadList)
router.get("/update/:id?", StudentController.renderForm)
router.post(
  "/update/:id?",
  checkSchema(StudentValidator.schema),
  StudentController.updateOrCreate
)

router.delete("/", StudentController.delete)

export default router
