import { writeFile, readFile } from "fs/promises"
import keys from "../keys/key.mjs"
import { log } from "console"

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
        await this.saveData([])
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
      console.log(itemNewProperties)

      const data = await this.loadData()
      let itemIndex = data.findIndex((el) => el.id === id)
      if (itemIndex === -1) throw new Error(`Item by ${id} not found!`)
      data[itemIndex] = { ...data[itemIndex], ...itemNewProperties }
      await this.saveData(data)
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async deleteItem(id) {
    try {
      const data = await this.loadData()
      const updatedData = data.filter((el) => el.id !== id)
      if (data.length === updatedData.length)
        throw new Error(`Item by ${id} not found!`)
      await this.saveData(updatedData)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new DatabaseManager(keys.dbUrl)
