let GameInstance = require('../models/GameInstance')
let InGamePokemon = require('../models/InGamePokemon')

module.exports = class Router {
	constructor (app) {
		this.pokemon = require('../static/pokemon')
		this.moves = require('../static/moves')

		this.app = app
		this.setupRoutes()

		this.addPlayerToGame()

		this.app.listen(3000)
	}

	setupRoutes () {
		this.app.get ('/', this.hello)
		this.app.get ('/api/creategame', this.createGame)
		this.app.post('/api/joingame', this.addPlayerToGame)
		this.app.post('/api/gamestatus', this.getGameStatus)
		this.app.post('/api/createteam', this.createTeam)
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

	async addPlayerToGame (req, res) {
		// let [playerName, gameCode] = [req.body.playerName, req.body.gameCode]
		let [playerName, gameCode] = ['rag', '5PVNJ']

		try {
			let gameInstance = await GameInstance.findOne({gameCode: gameCode})
			if (!gameInstance) { return res.json({error: 'Incorrect code'}) }

			gameInstance.addPlayer(playerName)
			gameInstance.state = {
				ready: false,
				message: '',
				hasWinner: false,
				gameState: gameInstance.playerNames.map(p => ({p: []}))
			}
			
			console.log(gameInstance)
		}
		catch (err) {
			res.json({error: 'Some error'})
		}
	}

	async getGameStatus (req, res) {
		// let gameToken = 'TeRfZu2ANmzr4wQueVmJetI0H'    // For testing
		let gameToken = req.body.gameToken
		let gameInstance = await GameInstance.findOne({gameToken: gameToken})
		if (gameInstance) { res.json({gameStage: gameInstance ? gameInstance.gameStage : -1}) }
	}

	// todo refactor, break up code, test
	async createTeam (req, res) {
		// assume from client:
		// list of pokemon with move set
		// [{name: charizard, moves: [fire blast, bla, bla2, bla3]}]

		let [gameToken, playerName, pokemonList] = [req.body.gameToken, req.body.playerName, req.body.pokemonList]
		try {
			let gameInstance = GameInstance.findOne({gameToken: gameToken})
			if (!gameInstance) { res.json({error: 'Invalid game token'}) }
			
			for (var i=0; i<pokemonList.length; i++) {
				let pokemonData = this.pokemon[pokemonList[i].name]
				let pokemonMoves = pokemonList[i].moves

				let inGamePokemon = new InGamePokemon({
					name: pokemonData.name,
					types: pokemonData.types,
					baseStats: new Map(Object.entries(pokemonData.baseStats)),
					stats: new Map(Object.entries(pokemonData.baseStats)),
					positionInParty: i,
					moves: pokemonMoves
				})

				gameInstance.addPokemonToTeamWithPlayerName(playerName, inGamePokemon)
				inGamePokemon.save()
			}

			if (gameInstance.state.gameState.every(gs => gs.pokemon.length > 0)) {
				gameInstance.gameStage = 2
			}
		}
		catch (err) {
			console.log(err)
			res.json({error: 'Some error'})
		}
	}
}
