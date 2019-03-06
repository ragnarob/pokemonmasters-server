class Router {
	constructor (app) {
		this.app = app
		this.setupRoutes()
		this.app.listen(8080)
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
		// todo stuff
	}

	addPlayerToGame (req, res) {
		let [playerName, gameCode] = [req.body.playerName, req.body.gameCode]
		// todo stuff
	}

	getGameStatus (req, res) {
		let gameToken = req.body.gameToken
		// todo stuff
	}
}

module.exports = Router