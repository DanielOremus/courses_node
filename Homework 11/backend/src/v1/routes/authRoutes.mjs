import express from "express"

import AuthController from "../controllers/authController.mjs"

const router = express.Router()

// router.post('/signup', UserController.signup)
router.post("/login", AuthController.login)

router.post("/signup", AuthController.signup)

export default router
