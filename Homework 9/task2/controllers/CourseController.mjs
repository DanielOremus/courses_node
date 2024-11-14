import CourseManager from "../models/course/CourseManager.mjs"
import StudentManager from "../models/student/StudentManager.mjs"
import isOptSelected from "../utils/isOptSelected.mjs"
import { validationResult } from "express-validator"

class CourseController {
  static async loadList(req, res) {
    try {
      const list = await CourseManager.getList({}, null, null)
      res.render("course/list", {
        courses: list,
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async renderForm(req, res) {
    const id = req.params.id
    let course = null
    try {
      if (id) {
        course = await CourseManager.getById(id)
      }
      const students = await StudentManager.getList(
        {},
        { firstName: 1, lastName: 1 }
      )

      res.render("course/form", {
        title: course?.id ? "Editing" : "Creating",
        course,
        students,
        isOptSelected,
        errors: [],
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateOrCreate(req, res) {
    const id = req.params.id
    const { name, duration, students } = req.body
    const course = { name, duration, students }
    console.log(req.body.students)

    let studentsList
    const errors = validationResult(req)
    if (id) {
      course.id = id
    }

    try {
      studentsList = await StudentManager.getList(
        {},
        { firstName: 1, lastName: 1 }
      )
      console.log(course)

      if (!errors.isEmpty()) {
        return res.status(400).render("course/form", {
          title: course.id ? "Editing" : "Creating",
          course,
          students: studentsList,
          isOptSelected,
          errors: errors.array(),
        })
      }
      if (id) {
        await CourseManager.updateById(id, course)
      } else {
        await CourseManager.create(course)
      }
      res.redirect("/courses")
    } catch (error) {
      res.status(400).render("course/form", {
        title: course.id ? "Editing" : "Creating",
        course,
        students: studentsList,
        isOptSelected,
        errors: [{ msg: error.message }],
      })
    }
  }

  static async delete(req, res) {
    try {
      const id = req.body.id
      const course = await CourseManager.deleteById(id)
      if (!course)
        return res.status(404).json({ success: false, msg: "Course not found" })
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, mgs: error.message })
    }
  }
}
export default CourseController
