import express from "express"
import Task from "./Task.mjs"

const app = express()
const port = 3000

app.get("/season", (req, res) => {
  const monthNumber = new Date().getMonth()
  const season = Task.getSeason(monthNumber)
  res.status(200).send(season)
})
app.get("/time", (req, res) => {
  const currentHour = new Date().getHours()
  const dayTime = Task.getDayTime(currentHour)
  res.status(200).send(dayTime)
})
app.get("/day", (req, res) => {
  const dayNumber = new Date().getDay()
  const dayName = Task.getWeekDayName(dayNumber)
  res.status(200).send(dayName)
})

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else console.log("Server is listening on port 3000")
})
