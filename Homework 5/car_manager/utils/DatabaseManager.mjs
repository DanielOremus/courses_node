import { writeFile, readFile } from "fs/promises"
import keys from "../keys/key.mjs"

class DatabaseManager {
  constructor(dbUrl) {
    this.path = dbUrl
  }
  async saveData(dataArr) {
    try {
      await writeFile(this.path, JSON.stringify(dataArr))
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async loadData() {
    try {
      const data = await readFile(this.path, "utf8")
      return JSON.parse(data)
    } catch (err) {
      if (err.code === "ENOENT") {
        this.saveData([])
        return []
      }
      throw new Error(err.message)
    }
  }
  async getItemById(id) {
    try {
      const data = await this.loadData()
      const item = data.find((el) => el.id === id)
      if (!item) throw new Error(`Item by ${id} not found!`)
      return item
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async addItem(itemObj) {
    try {
      const data = await this.loadData()
      data.push(itemObj)
      await this.saveData(data)
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async updateItem(id, itemNewProperties) {
    try {
      const data = await this.loadData()
      let itemIndex = data.findIndex((el) => el.id === id)
      if (itemIndex === -1) throw new Error(`Item by ${id} not found!`)
      data[item] = { ...data, itemNewProperties }
      this.saveData(data)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new DatabaseManager(keys.dbUrl)
