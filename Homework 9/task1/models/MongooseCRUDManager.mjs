class MongooseCRUDManager {
  constructor(model) {
    this.model = model
  }
  async getList(
    filters = {},
    projection = null,
    options = null,
    populateFields = []
  ) {
    try {
      const query = this.model.find(filters, projection, options)

      for (const field of populateFields) {
        if (typeof field === "string") {
          query.populate(field)
        } else {
          if (
            typeof field === "object" &&
            field.fieldForPopulation &&
            field.requiredFieldsFromTargetObj
          ) {
            query.populate(
              field.fieldForPopulation,
              field.requiredFieldsFromTargetObj
            )
          }
        }
      }
      return await query.exec()
    } catch (error) {
      throw new Error("Error retrieving data: " + error.message)
    }
  }
  async getById(id, projection = null, populateFields = []) {
    try {
      const query = this.model.findById(id, projection)
      for (const field of populateFields) {
        if (typeof field === "string") {
          query.populate(field)
        } else {
          if (
            typeof field === "object" &&
            field.fieldForPopulation &&
            field.requiredFieldsFromTargetObj
          ) {
            query.populate(
              field.fieldForPopulation,
              field.requiredFieldsFromTargetObj
            )
          }
        }
      }
      return await query.exec()
    } catch (error) {
      throw new Error("Error getting item by id: " + error.message)
    }
  }
  async create(itemObj) {
    try {
      return await this.model.create(itemObj)
    } catch (error) {
      throw new Error("Error creating item: " + error.message)
    }
  }
  async updateById(id, itemObj) {
    try {
      return await this.model.findByIdAndUpdate(id, itemObj, {
        new: true,
        runValidators: true,
      })
    } catch (error) {
      throw new Error("Error updating item: " + error.message)
    }
  }
  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id)
    } catch (error) {
      throw new Error("Error deleting item: " + error.message)
    }
  }
}

export default MongooseCRUDManager
