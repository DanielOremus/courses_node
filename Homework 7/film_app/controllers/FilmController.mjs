import FilmManager from "../models/FilmManager.mjs"
import { validationResult } from "express-validator"

class FilmController {
  static async getList(req, res) {
    try {
      const list = await FilmManager.loadList()
      res.render("film/list", {
        title: "List of Films",
        body: "",
        films: list,
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async specificFilm(req, res) {
    try {
      const film = await FilmManager.getById(req.params.id)
      if (!film)
        return res.status(404).json({ success: false, msg: "Film not found" })
      res.render("film/spec", {
        title: film.title,
        body: "",
        film,
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async addOrUpdate(req, res) {
    const id = req.params.id
    const errors = validationResult(req)
    console.log(req.body)

    const { title, description, genre, releaseDate } = req.body

    const film = {
      title,
      description,
      genre: genre || null,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
    }

    if (id) {
      const exists = await FilmManager.doesExists({ _id: id })
      if (!exists)
        return res.status(404).json({ success: false, msg: "Film not found" })
      film._id = id
    }
    if (!errors.isEmpty()) {
      return res.status(400).render("film/form", {
        title: "Form",
        body: "",
        film: film,
        errors: errors.array(),
      })
    }

    try {
      console.log(film)

      if (id) {
        await FilmManager.update(id, film)
      } else {
        await FilmManager.create(film)
      }
      res.redirect("/films")
    } catch (error) {
      res.status(400).render("film/form", {
        title: "Form",
        body: "",
        film,
        errors: [{ msg: error.message }],
      })
    }
  }
  static async filmForm(req, res) {
    const id = req.params.id
    let film = null
    try {
      if (id) {
        film = await FilmManager.getById(id)
        if (!film) {
          return res.status(404).json({ success: false, msg: "Film not found" })
        }
      }
      res.render("film/form", {
        title: "Form",
        body: "",
        film,
        errors: [],
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async delete(req, res) {
    const id = req.body.id
    try {
      const exists = await FilmManager.doesExists({ _id: id })
      if (!exists)
        return res.status(404).json({ success: false, msg: "Film not found" })
      await FilmManager.delete(id)
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default FilmController
