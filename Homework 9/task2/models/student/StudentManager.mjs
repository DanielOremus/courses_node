import MongooseCRUDManager from "../mongooseCRUDManager.mjs"
import Student from "./Student.mjs"

class StudentManager extends MongooseCRUDManager {
  async getList(filters = {}, projection = null) {
    try {
      return await super.getList(filters, projection, {
        sort: { fullName: 1 },
      })
    } catch (error) {
      return []
    }
  }
}

export default new StudentManager(Student)
