import { createServer } from "node:http"
import fs from "fs"

const server = createServer((req, res) => {
  fs.readFile("settings.json", (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(500, { "Content-Type": "text/plain" })
      res.statusCode = 500
      return res.end("Error while reading settings.json")
    }
    const { historyFilePath, historyRoute } = JSON.parse(data)
    fs.access(historyFilePath, (err) => {
      if (err) {
        fs.writeFileSync(historyFilePath, "{}")
        return res.end("New history file is created")
      }
      if (req.url !== "/favicon") {
        fs.readFile(historyFilePath, (err, data) => {
          if (err) {
            console.log(err)
            res.writeHead(500, { "Content-Type": "text/plain" })
            res.statusCode = 500
            return res.end("Error has occurred!")
          }
          if (req.url === historyRoute) {
            res.writeHead(200, { "Content-Type": "text/plain" })
            return res.end(data)
          }
          const currentVisitedRoutes = JSON.parse(data)
          const visitedRouteCount = currentVisitedRoutes[req.url] || 0
          fs.writeFile(
            historyFilePath,
            JSON.stringify({
              ...currentVisitedRoutes,
              [req.url]: visitedRouteCount + 1,
            }),
            (err) => {
              if (err) {
                console.log(err)
                res.writeHead(500, { "Content-Type": "text/plain" })
                res.statusCode = 500
                return res.end("Error while saving file!")
              }
              res.writeHead(200, { "Content-Type": "text/plain" })
              return res.end("History saved")
            }
          )
        })
      }
    })
  })
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000")
})
