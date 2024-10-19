import GameModel from "../models/GameModel.mjs"

class GameController {
  static gamesList(req, res) {
    const gamesList = GameModel.getGamesList()

    res.render("games", { gamesList })
  }
  static gameById(req, res) {
    const game = GameModel.getGameById(req.params.id)

    res.render("games/spec_game", { game })
  }
  static addGame(req, res) {
    const { imgSrc, title, description, price } = req.body

    GameModel.addGame({ imgSrc, title, description, price })

    res.redirect("/games")
  }
  static deleteGame(req, res) {
    GameModel.deleteGame(req.params.id)

    res.redirect("/games")
  }

  static newGameForm(req, res) {
    res.render("games/new_game")
  }
}

export default GameController
