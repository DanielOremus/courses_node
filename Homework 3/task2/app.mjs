import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/html/main.html"))
})
app.get("/coffee", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/html/coffee.html"))
})
app.get("/music", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/html/music.html"))
})

app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log("Server started successfully")
})
