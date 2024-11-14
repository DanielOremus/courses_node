import { configDotenv } from "dotenv"
configDotenv()

export default Object.freeze({
  databaseName: process.env.DB_NAME,
  databaseURL: process.env.DB_URL,
  mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  port: process.env.PORT,
})
