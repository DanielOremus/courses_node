import { Router } from "express"
import CourseController from "../controllers/CourseController.mjs"
import CourseValidator from "../validators/CourseValidator.mjs"
import SeminarValidator from "../validators/SeminarValidator.mjs"
import { checkSchema } from "express-validator"
import SeminarController from "../controllers/SeminarController.mjs"

const router = Router()

router.get("/", CourseController.loadList)
router.get("/update/:id?", CourseController.renderForm)
router.get("/:id/seminars/add", SeminarController.renderForm)

router.post(
  "/update/:id?",
  checkSchema(CourseValidator.schema),
  CourseController.updateOrCreate
)
router.post(
  "/:id/seminars/add",
  checkSchema(SeminarValidator.schema),
  SeminarController.add
)

router.delete("/", CourseController.delete)
router.delete("/:courseId/seminars", SeminarController.delete)

export default router
