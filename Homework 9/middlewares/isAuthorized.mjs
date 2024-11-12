export default function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("auth/login")
  }
  next()
}
