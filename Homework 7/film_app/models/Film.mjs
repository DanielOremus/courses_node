import mongoose, { Schema } from "mongoose"
import config from "../config/default.mjs"

const filmSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [3, "Title must be at least 3 characters long"],
    maxLength: [200, "Title must be at most 200 characters long"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [10, "Description must be at least 10 characters long"],
    trim: true,
  },
  genre: {
    type: [String],
    required: [true, "Genre is required"],
    validate: [
      function (arr) {
        console.log(arr)

        return arr.length > 0
      },
      "Film must have at least 1 genre",
    ],
  },
  releaseDate: {
    type: Date,
    required: [true, "Release Date is required"],
    trim: true,
  },
})
filmSchema.statics.checkDBExists = async () => {
  const list = await mongoose.connection.listDatabases()
  return list.databases.some((db) => db.name === config.databaseName)
}
filmSchema.statics.checkCollectionExists = async () => {
  const doesDbExists = await filmSchema.checkDBExists()
  if (doesDbExists) {
    const collections = await mongoose.connection.db
      .listCollections({ name: "films" })
      .toArray()
    return collections.length > 0
  }
  return false
}
export default mongoose.model("Film", filmSchema)
