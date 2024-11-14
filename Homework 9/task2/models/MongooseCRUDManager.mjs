class MongooseCRUDManager {
  constructor(model) {
    this.model = model
  }
  async getList(
    filter = {},
    projection = null,
    options = null,
    populateFields = []
  ) {
    try {
      const query = this.model.find(filter, projection, options)

      for (const field of populateFields) {
        if (typeof field === "string") {
          query.populate(field)
          continue
        }
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
      return await query.exec()
    } catch (error) {
      throw new Error("Error getting data: " + error.message)
    }
  }
  async getById(id, projection = null, populateFields = []) {
    try {
      const query = this.model.findById(id, projection)

      for (const field of populateFields) {
        if (typeof field === " string") {
          query.populate(field)
          continue
        }
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
  async updateById(id, itemProps) {
    try {
      return await this.model.findByIdAndUpdate(id, itemProps, {
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
