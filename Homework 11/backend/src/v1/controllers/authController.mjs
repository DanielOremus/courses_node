import User from "../models/user/User.mjs"
import UsersDBService from "../models/user/UsersDBService.mjs"
import { prepareToken } from "../../../utils/jwtHelpers.mjs"

class AuthController {
  static async signup(req, res) {
    const { username, email, password } = req.body
    if (!username) {
      return res.status(401).json({ error: "Username is required" })
    }
    if (!email) {
      return res.status(401).json({ error: "Email is required" })
    }
    if (!password) {
      return res.status(401).json({ error: "Password is required" })
    }

    try {
      const user = await UsersDBService.create({ username, email, password })

      const token = prepareToken(
        { _id: user._id, username: user.username },
        req.headers
      )

      res.json({ success: true, msg: "Signed Up successfully", token })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: "Email is required" })
    }
    if (!req.body.password) {
      return res.status(401).json({ error: "Password is required" })
    }

    try {
      const user = await UsersDBService.findOne({
        email: req.body.email,
      })
      if (!user) {
        return res.status(401).json({ error: "User not found" })
      }

      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({ error: "Login error" })
      }
      const token = prepareToken(
        {
          id: user._id,
          username: user.username,
        },
        req.headers
      )
      res.json({
        msg: "Authorized",
        token,
      })
    } catch (err) {
      res.status(401).json({ error: "Login error" })
    }
  }
}

export default AuthController
