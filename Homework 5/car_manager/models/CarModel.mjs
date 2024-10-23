import DatabaseManager from "../utils/DatabaseManager.mjs"
import { v4 as uuidv4 } from "uuid"

class CarModel {
  static async getList() {
    try {
      const list = await DatabaseManager.loadData()
      return list
    } catch (err) {
      throw new Error(err.message)
    }
  }
  static async getCarById(id) {
    try {
      const car = await DatabaseManager.getItemById(id)
      return car
    } catch (err) {
      throw new Error(err.message)
    }
  }
  static async addNewCar(carObj) {
    try {
      await DatabaseManager.addItem({ id: uuidv4(), ...carObj })
      return true
    } catch (err) {
      throw new Error(err.message)
    }
  }
  static async updateCar(id, newProps) {
    try {
      await DatabaseManager.updateItem(id, newProps)
      return true
    } catch (err) {
      throw new Error(err.message)
    }
  }
  static async deleteCar(id) {
    try {
      await DatabaseManager.deleteItem(id)
      return true
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default CarModel
