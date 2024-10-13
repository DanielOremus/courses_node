import { argv, stdin, stdout } from "process"
import readline from "readline"

const argString = argv.slice(2).join("&")
const args = new URLSearchParams(argString)
const pensionerAge = parseInt(args.get("--pensioner"))

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
})

rl.question("Your age: ", (age) => {
  console.log(
    parseInt(age) >= pensionerAge
      ? "You are pensioner"
      : "You are not pensioner"
  )
  rl.close()
})
