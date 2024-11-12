import Film from "./Film.mjs"
import mongoose from "mongoose"

class FilmManager {
  static async loadList(searchParams = {}) {
    try {
      //   const exists = await Film.checkCollectionExists()

      return (await Film.find(searchParams)) ?? []
    } catch (error) {
      return []
    }
  }
  static async getById(id) {
    try {
      return await Film.findById(id)
    } catch (error) {
      throw error
    }
  }
  static async create(filmObj) {
    try {
      return await Film.create(filmObj)
    } catch (error) {
      throw error
    }
  }
  static async update(id, filmObj) {
    console.log(filmObj)

    try {
      return await Film.findByIdAndUpdate(id, filmObj, {
        new: true,
        runValidators: true,
      })
    } catch (error) {
      throw error
    }
  }
  static async delete(id) {
    try {
      return await Film.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  }
  static async doesExists(filterObj) {
    try {
      return await Film.exists(filterObj)
    } catch (error) {
      throw error
    }
  }
}

export default FilmManager
