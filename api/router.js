module.exports = class Router {
	constructor (app) {
		this.pokemon = require('../static/pokemon.json')
		this.moves = require('../static/moves')

		this.app = app
		this.setupRoutes()
		this.app.listen(3000)
	}

	setupRoutes () {
		this.app.get ('/', this.hello)
		this.app.get ('/api/creategame', this.createGame)
		this.app.post('/api/joingame', this.addPlayerToGame)
		this.app.post('/api/gamestatus', this.getGameStatus)
		// osv? Kanskje splitte i to modules, en for game-relaterte ting og en for /moves, /pokemon, osv, altså static content
	}

	hello (req, res) {
		res.json('Hello world')
	}

	createGame (req, res) {
		res.json('todo')
	}

	addPlayerToGame (req, res) {
		let [playerName, gameCode] = [req.body.playerName, req.body.gameCode]
		res.json('todo')
	}

	getGameStatus (req, res) {
		let gameToken = req.body.gameToken
		res.json('todo')
	}
}
