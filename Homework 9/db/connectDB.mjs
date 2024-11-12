import config from "../config/default.mjs"
import mongoose from "mongoose"

export default async function () {
  try {
    await mongoose.connect(config.mongoURI)
    console.log("Successfully connected to DB")
  } catch (error) {
    console.log(error.message)
  }
}
