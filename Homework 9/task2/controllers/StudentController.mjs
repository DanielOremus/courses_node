import StudentManager from "../models/student/StudentManager.mjs"
import { validationResult } from "express-validator"

class StudentController {
  static async loadList(req, res) {
    try {
      const list = await StudentManager.getList()
      res.render("student/list", {
        students: list,
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async renderForm(req, res) {
    const id = req.params.id
    let student = null
    try {
      if (id) {
        student = await StudentManager.getById(id)
      }
      res.render("student/form", {
        title: student?.id ? "Editing" : "Creating",
        student,
        errors: [],
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateOrCreate(req, res) {
    const id = req.params.id
    const { firstName, lastName, age, averageScore } = req.body
    const student = { firstName, lastName, age, averageScore }
    const errors = validationResult(req)
    if (id) {
      student.id = id
    }
    if (!errors.isEmpty()) {
      return res.status(400).render("student/form", {
        title: student.id ? "Editing" : "Creating",
        student,
        errors: errors.array(),
      })
    }
    try {
      if (id) {
        await StudentManager.updateById(id, student)
      } else {
        await StudentManager.create(student)
      }
      res.redirect("/students")
    } catch (error) {
      res.status(400).render("student/form", {
        title: student.id ? "Editing" : "Creating",
        student,
        errors: [{ msg: error.message }],
      })
    }
  }
  static async delete(req, res) {
    try {
      const id = req.body.id
      const student = StudentManager.deleteById(id)
      if (!student)
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" })
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, mgs: error.message })
    }
  }
}
export default StudentController
