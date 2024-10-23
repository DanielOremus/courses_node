import CarModel from "../models/CarModel.mjs"
import { removeImageSync } from "../utils/ImageRemover.mjs"

class CarController {
  static async loadList(req, res) {
    const carList = await CarModel.getList()
    res.render("cars", { carList })
  }
  static async showDetails(req, res) {
    const car = await CarModel.getCarById(req.params.id)
    res.render("cars/carDetail", { car })
  }
  static async getEditForm(req, res) {
    const car = await CarModel.getCarById(req.params.id)
    res.render("cars/carForm", { car })
  }
  static getCreateForm(req, res) {
    res.render("cars/carForm", { car: null })
  }
  static async addCar(req, res) {
    const carObj = { ...req.body }
    if (req.file) {
      carObj.imgSrc = req.file.filename
    }
    await CarModel.addNewCar(carObj)

    res.redirect("/cars")
  }
  static async updateCar(req, res) {
    const carNewProps = req.body
    if (req.file) {
      const car = await CarModel.getCarById(req.params.id)
      removeImageSync(car, "uploads")
      carNewProps.imgSrc = req.file.filename
    }
    await CarModel.updateCar(req.params.id, carNewProps)
    res.redirect("/cars")
  }
  static async deleteCar(req, res) {
    const { id } = req.body

    try {
      const car = await CarModel.getCarById(id)

      removeImageSync(car, "uploads")
      await CarModel.deleteCar(id)

      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ success: false, msg: err.message })
    }
  }
}

export default CarController
