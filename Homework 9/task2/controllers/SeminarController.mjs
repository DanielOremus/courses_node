import StudentManager from "../models/student/StudentManager.mjs"
import { validationResult } from "express-validator"
import CourseManager from "../models/course/CourseManager.mjs"

class SeminarController {
  static async add(req, res) {
    const courseId = req.params.id
    const { topic, lectionDuration, responsibleStudent } = req.body
    const seminar = { topic, lectionDuration, responsibleStudent }
    console.log(seminar)

    let studentsList = null
    let course = null
    const errors = validationResult(req)
    try {
      course = await CourseManager.getById(courseId)
      if (!course) {
        return res.status(404).json({ success: false, msg: "Course not found" })
      }
      studentsList = await StudentManager.getList(
        {},
        { firstName: 1, lastName: 1 }
      )
      if (!errors.isEmpty()) {
        return res.status(400).render("seminar/form", {
          title: "Creating",
          seminar,
          course,
          students: studentsList,
          errors: errors.array(),
        })
      }
      course.seminars.push(seminar)
      await CourseManager.updateById(courseId, course)
      res.redirect("/courses")
    } catch (error) {
      res.status(400).render("seminar/form", {
        title: "Creating",
        seminar,
        course,
        students: studentsList,
        errors: [{ msg: error.message }],
      })
    }
  }

  static async renderForm(req, res) {
    const courseId = req.params.id
    let course = null
    try {
      course = await CourseManager.getById(courseId, { _id: 1 })

      const students = await StudentManager.getList(
        {},
        { firstName: 1, lastName: 1 }
      )
      console.log(students)

      res.render("seminar/form", {
        title: "Creating",
        course,
        seminar: null,
        students,
        errors: [],
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async delete(req, res) {
    const seminarId = req.body.id
    const courseId = req.params.courseId
    try {
      const course = await CourseManager.getById(courseId)
      if (!course)
        return res.status(404).json({ success: false, msg: "Course not found" })

      course.seminars = course.seminars.filter(
        (seminar) => seminar.id !== seminarId
      )
      await course.save()
      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, mgs: error.message })
    }
  }
}
export default SeminarController
