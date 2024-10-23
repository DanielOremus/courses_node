import { Router } from "express"
import CarController from "../controllers/CarController.mjs"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    const fileName = `${uuidv4()}-${file.originalname}`
    cb(null, fileName)
  },
})

const upload = multer({ storage })

const router = Router()

router.get("/", CarController.loadList)

router.get("/new", CarController.getCreateForm)
router.get("/:id", CarController.showDetails)

router.get("/edit/:id", CarController.getEditForm)

router.post("/new", upload.single("image"), CarController.addCar)
router.post("/edit/:id", upload.single("image"), CarController.updateCar)

router.delete("/", CarController.deleteCar)

export default router
