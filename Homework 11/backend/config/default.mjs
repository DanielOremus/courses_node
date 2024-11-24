import dotenv from "dotenv"
dotenv.config()

export default Object.freeze({
  db: {
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.MONGODB_URL,
    mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})
