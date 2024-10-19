import DatabaseManager from "../utils/DatabaseManager.mjs"
import { v4 as uuidv4 } from "uuid"

class GameModel {
  static getGamesList() {
    try {
      return DatabaseManager.loadData()
    } catch (err) {
      throw new Error("Cannot load list")
    }
  }
  static getGameById(id) {
    console.log(id)

    try {
      return DatabaseManager.getItemById(id)
    } catch (err) {
      throw new Error("Failed to get specific game")
    }
  }
  static addGame(gameObj) {
    try {
      DatabaseManager.addItem({ id: uuidv4(), ...gameObj })
      return true
    } catch (err) {
      throw new Error("Failed to add new game")
    }
  }
  static deleteGame(id) {
    try {
      DatabaseManager.deleteItem(id)
      return true
    } catch (err) {
      throw new Error("Failed to delete game")
    }
  }
  static updateGame(id, gameProperties) {
    try {
      DatabaseManager.updateItem(id, gameProperties)
      return true
    } catch (err) {
      throw new Error("Failed to update game")
    }
  }
}

export default GameModel
