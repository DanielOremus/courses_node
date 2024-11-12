import dotenv from "dotenv"
dotenv.config()

export default Object.freeze({
  databaseName: process.env.DB_NAME,
  // mongoURI: `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  // port: process.env.PORT,
  mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
})
