import { createServer } from "node:http"

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })

  const operationRoutes = ["add", "sub", "mult"]
  const routeArr = req.url.split("/")
  const operation = routeArr[1]

  let numbers
  if (operationRoutes.includes(operation)) {
    numbers = routeArr[2].split("-").map((el) => parseFloat(el))
    console.log(numbers)
    switch (operation) {
      case "add":
        const sum = numbers.reduce((accumulator, el) => accumulator + el)
        return res.end(`Sum is ${sum}`)
      case "sub":
        const difference = numbers.reduce((accumulator, el) => accumulator - el)
        return res.end(`Difference is ${difference}`)

      case "mult":
        const product = numbers.reduce((accumulator, el) => accumulator * el, 1)
        return res.end(`Product is ${product}`)
    }
  }

  res.end("Use correct routes!\n")
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000")
})
