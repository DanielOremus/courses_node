import { configDotenv } from "dotenv"
configDotenv()

export default Object.freeze({
  databaseName: process.env.DB_NAME,
  mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  port: process.env.PORT,
  sessionKey: process.env.KEY,
})
