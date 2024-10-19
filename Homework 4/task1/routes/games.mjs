import { Router } from "express"
import GameController from "../controllers/GameController.mjs"

const router = Router()

router.get("/", GameController.gamesList)
router.get("/new", GameController.newGameForm)

router.get("/:id", GameController.gameById)

router.post("/add", GameController.addGame)

router.delete("/:id", GameController.deleteGame)

export default router
