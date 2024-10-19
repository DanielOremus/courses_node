import fs from "fs"
import key from "../keys/key.mjs"

class DatabaseManager {
  constructor(filePath) {
    this.filePath = filePath
  }
  saveData(dataArr) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(dataArr))
    } catch (err) {
      throw new Error(err.message)
    }
  }
  loadData() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8")
      return JSON.parse(data)
    } catch (err) {
      if (err.code === "ENOENT") {
        this.saveData([])
        return []
      }
      throw new Error(err.message)
    }
  }
  getItemById(id) {
    try {
      const data = this.loadData()
      const item = data.find((el) => el.id === id)

      if (!item) throw new Error(`Item with ${id} id not found`)

      return item
    } catch (err) {
      throw new Error(err.message)
    }
  }
  addItem(itemObj) {
    try {
      const data = this.loadData()
      data.push(itemObj)
      this.saveData(data)
    } catch (err) {
      throw new Error(err.message)
    }
  }
  deleteItem(id) {
    try {
      const data = this.loadData()
      const newData = data.filter((el) => el.id !== id)
      if (newData.length === data.length)
        throw new Error(`Item with ${id} id not found`)
      this.saveData(newData)
    } catch (err) {
      throw new Error(err.message)
    }
  }
  updateItem(id, itemObj) {
    try {
      const data = this.loadData()
      const itemIndex = data.findIndex((el) => el.id === id)

      if (itemIndex === -1) throw new Error(`Item with ${id} id not found`)

      data[itemIndex] = { ...data[itemIndex], itemObj }

      this.saveData(data)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new DatabaseManager(key.dbUrl)
