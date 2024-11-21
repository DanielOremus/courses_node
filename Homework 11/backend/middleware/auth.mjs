import { parseBearer } from "../utils/jwtHelpers.mjs"

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
  // Middleware для налаштування заголовків CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    )
    next() // Передача обробки наступному middleware
  })

  // Middleware для перевірки аутентифікації та авторизації
  app.use((req, res, next) => {
    // Відкриті шляхи, які не потребують авторизації
    const openPathes = [
      { route: "/api/v1/auth/login", method: "POST" },
      { route: "/api/v1/auth/signup", method: "POST" },
      { route: "/api/v1/products", method: "GET" },
    ]
    const path = openPathes.find(
      (obj) => obj.route === req.path && obj.method === req.method
    )
    // Перевірка, чи шлях відкритий
    if (!path) {
      try {
        // Парсинг токена та додавання користувача до запиту
        req.user = parseBearer(req.headers.authorization, req.headers)
        console.log(req.user)
      } catch (err) {
        console.log(err)

        // Якщо авторизація не вдалася, повертається статус 401
        return res.status(401).json({ msg: "Access Denied" })
      }
    }
    next() // Передача обробки наступному middleware
  })
}

// Експорт функції auth як модуля за замовчуванням
export default auth
