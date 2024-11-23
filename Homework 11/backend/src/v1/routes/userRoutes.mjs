import express from "express"
import UserController from "../controllers/userController.mjs"
import UserValidator from "../../../validators/userValidator.mjs"

import { checkSchema } from "express-validator"
// import UploadManager from '../utils/UploadManager.mjs'

const router = express.Router()

router.get("/", UserController.usersList)

router.get("/:id", UserController.getUserById)

router.post(
  "/register",
  // UploadManager.single('userImg'),
  checkSchema(UserValidator.userSchema),
  // UserValidator.checkFile,
  UserController.registerUser
)
router.put(
  "/register/:id",
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)

router.delete("/", UserController.deleteUser)

export default router
