import { createServer } from "node:http"
import fs from "fs"
import { readFile } from "fs/promises"

const server = createServer(async (req, res) => {
  const numbersPath = "./public/numbers.txt"
  const routeString = req.url.slice(1)
  if (routeString.includes("save_num")) {
    const userNum = routeString.split("/")[1]
    fs.appendFile(numbersPath, `${userNum}\n`, () => {
      res.write("Number saved!\n")
      res.end()
    })
  } else {
    const operationRoutes = ["sum", "mult"]

    let numbers
    if (operationRoutes.includes(routeString)) {
      try {
        const numbersString = await readFile(numbersPath, "utf-8")

        numbers = numbersString.split("\n").reduce((accumulator, el) => {
          const number = parseFloat(el)
          if (!isNaN(number)) accumulator.push(number)
          return accumulator
        }, [])
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" })

        console.log(err)
        res.statusCode = 500
        return res.end("Error while reading file!")
      }
    }
    switch (routeString) {
      case "sum":
        res.writeHead(200, { "Content-Type": "text/plain" })

        const sum = numbers.reduce((accumulator, el) => el + accumulator, 0)
        return res.end(`Sum is ${sum}`)

      case "mult":
        res.writeHead(200, { "Content-Type": "text/plain" })

        const product = numbers.reduce((accumulator, el) => el * accumulator, 1)
        return res.end(`Product is ${product}`)

      case "remove":
        fs.unlink(numbersPath, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" })

            console.log(err)
            res.statusCode = 500

            return res.end("Error while removing file!")
          }
          res.writeHead(200, { "Content-Type": "text/plain" })

          return res.end("File removed!")
        })
    }
  }
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000")
})
