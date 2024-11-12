import { Router } from "express"
import FilmController from "../controllers/FilmController.mjs"
import FilmValidator from "../validators/FilmValidator.mjs"
import { checkSchema } from "express-validator"

const router = Router()

router.get("/", FilmController.getList)
router.get("/update/:id?", FilmController.filmForm)
router.get("/:id", FilmController.specificFilm)

router.post(
  "/update/:id?",
  checkSchema(FilmValidator.schema),
  FilmController.addOrUpdate
)

router.delete("/", FilmController.delete)

export default router
