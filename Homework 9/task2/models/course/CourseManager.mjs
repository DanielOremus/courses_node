import Course from "./Course.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class CourseManager extends MongooseCRUDManager {
  async getList(filters) {
    try {
      const list = await super.getList(filters, null, null, [
        {
          fieldForPopulation: "students",
          requiredFieldsFromTargetObj: "firstName lastName",
        },
        {
          fieldForPopulation: "seminars.responsibleStudent",
          requiredFieldsFromTargetObj: "firstName lastName",
        },
      ])
      return list
    } catch (error) {
      return []
    }
  }
}

export default new CourseManager(Course)
