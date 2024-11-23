import express from "express"
import UserController from "../controllers/userController.mjs"
import UserValidator from "../../../validators/userValidator.mjs"
import UploadManager from "../../../middleware/UploadManager.mjs"

import { checkSchema } from "express-validator"
// import UploadManager from '../utils/UploadManager.mjs'

const router = express.Router()

router.get("/", UserController.usersList)

router.get("/:id", UserController.getUserById)

router.post(
  "/register",
  UploadManager.none(),
  // UploadManager.single('userImg'),
  checkSchema(UserValidator.userSchema),
  // UserValidator.checkFile,
  UserController.registerUser
)
router.put(
  "/register/:id",
  UploadManager.none(),

  checkSchema((req) => UserValidator.userSchema(req)),
  UserController.registerUser
)

router.delete("/", UserController.deleteUser)

export default router
