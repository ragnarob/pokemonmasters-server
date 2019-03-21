let GameInstance = require('../models/GameInstance')

module.exports = class Router {
	constructor (app, databaseConnection) {
		this.pokemon = require('../static/pokemon')
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

	async createGame (req, res) {
		let playerName = req.body.playerName
		let newGameInstance = new GameInstance({
			playerNames: [playerName]
		})
		newGameInstance.generateGameCode()
		newGameInstance.generateGameToken()

		try {
			await newGameInstance.save()
			res.json({gameCode: newGameInstance.gameCode, gameToken: newGameInstance.gameToken})
		}
		catch (err) {
			res.json({error: 'Error creating game instance'})
		}
	}

	addPlayerToGame (req, res) {
		let [playerName, gameCode] = [req.body.playerName, req.body.gameCode]
		res.json('todo')
	}

	async getGameStatus (req, res) {
		// let gameToken = 'TeRfZu2ANmzr4wQueVmJetI0H'    // For testing
		let gameToken = req.body.gameToken
		let gameInstance = await GameInstance.findOne({gameToken: gameToken})
		if (gameInstance) { res.json({gameStage: gameInstance ? gameInstance.gameStage : -1}) }
	}
}
