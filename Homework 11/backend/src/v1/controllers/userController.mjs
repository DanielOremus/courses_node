import UsersDBService from "../models/user/UsersDBService.mjs"
import TypesDBService from "../models/type/TypesDBService.mjs"
import { validationResult } from "express-validator"

class UserController {
  static async usersList(req, res) {
    if (!req.user) {
      return res.status(403).json({ success: false, errors: "Access denied" })
    }
    try {
      const filters = {}
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key]
      }

      const dataList = await UsersDBService.getList(filters)
      res.status(200).json({
        users: dataList,
        user: req.user,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getUserById(req, res) {
    if (!req.user) {
      return res.status(403).json({ success: false, errors: "Access denied" })
    }
    const id = req.params.id
    try {
      const user = await UsersDBService.getById(id, { password: 0 })
      res.json({ success: true, data: user, user: req.user })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async registerUser(req, res) {
    if (!req.user) {
      return res.status(403).json({ success: false, errors: "Access denied" })
    }
    const errors = validationResult(req)
    const data = req.body
    console.log(data)

    const types = await TypesDBService.getList()

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id
      return res.status(400).json({
        errors: errors.array(),
        data,
        types,
        user: req.user,
      })
    }

    try {
      const { username, password, confirmPassword, email } = req.body
      const dataObj = { username, email }

      if (req.params.id) {
        const user = await UsersDBService.getById(req.params.id)
        const isMatch = await user.validPassword(confirmPassword)
        if (!isMatch) {
          return res.status(400).json({
            errors: [{ msg: "Підтвердження пароля невдале" }],
            data: dataObj,
            types,
            user: req.user,
          })
        }
        await UsersDBService.update(req.params.id, dataObj)
        return res.status(200).json({ message: "User updated successfully" })
      }
      await UsersDBService.create({ ...dataObj, password })
      res.status(200).json({ message: "User registered successfully" })
    } catch (err) {
      res.status(500).json({
        errors: [{ msg: err.message }],
        data,
        types,
        user: req.user,
      })
    }
  }

  static async deleteUser(req, res) {
    try {
      if (!req.user) {
        return res.status(403).json({ success: false, errors: "Access denied" })
      }
      const user = await UsersDBService.deleteById(req.body.id)
      const doLogout = user._id.equals(req.user.id)

      res.status(200).json({ success: true, doLogout })
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete user" })
    }
  }
}

export default UserController
