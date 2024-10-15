import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.send("Hello, user!")
})

app.get("/goals", (req, res) => {
  res.send("Become qualified Fullstack Developer")
})

app.get("/info/:myLinks", (req, res) => {
  switch (req.params.myLinks) {
    case "sites":
      return res.sendFile(path.join(__dirname, "public/sites.html"))

    case "films":
      return res.sendFile(path.join(__dirname, "public/films.html"))

    case "me":
      return res.sendFile(path.join(__dirname, "public/about_me.html"))

    default:
      res.status(404).send("Not Found")
  }
})

app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log("Server is listening on port 3000")
})
