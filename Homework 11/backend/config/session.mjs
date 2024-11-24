import session from "express-session"
import config from "./default.mjs"

const sessionConfig = session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
})

export default sessionConfig
