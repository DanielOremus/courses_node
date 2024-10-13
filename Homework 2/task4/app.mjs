import { createServer } from "node:http"
import fs from "fs"

const server = createServer((req, res) => {
  const infoPath = "about.html"
  const musicPath = "music.html"
  const coffeePath = "coffee.html"
  const notFoundPath = "error.html"

  let responseFilePath

  switch (req.url) {
    case "/":
      responseFilePath = infoPath
      break
    case "/coffee":
      responseFilePath = coffeePath
      break
    case "/music":
      responseFilePath = musicPath
      break
    default:
      responseFilePath = notFoundPath
  }

  fs.readFile(responseFilePath, (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(500, { "Content-Type": "text/plain" })

      res.statusCode = 500
      return res.end("Error while reading html file")
    }
    if (responseFilePath === notFoundPath) {
      res.writeHead(404, { "Content-Type": "text/html" })
      res.statusCode = 404
    } else {
      res.writeHead(200, { "Content-Type": "text/html" })
    }

    return res.end(data)
  })
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000")
})
