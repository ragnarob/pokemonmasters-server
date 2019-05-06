const mongoose = require('mongoose')
const Schema = mongoose.Schema
let InGamePokemon = require('./InGamePokemon')

let gameInstanceSchema = new mongoose.Schema({
	gameCode: String,
	gameToken: String,
	playerNames: [String],
	gameStage: {type: Number, default: 0},
	state: {
		round: {type: int, default: 1},

		//<< GAMELOGIC ---------------
		action1: {
			playerName: string,
			actionName: string,
			default: null
		},
		action2: {
			playerName: string,
			actionName: string,
			default: null
		},
		// ------------------- >>

		winner: {type: String, default: null},
		message: String,
		gameState: [
			{
				playerName: String,
				pokemon: [{type: Schema.Types.ObjectId, ref: 'InGamePokemon'}]
			}
		]
	}
})

//<< GAMELOGIC --------------------------
gameInstanceSchema.methods.addAction = function (playerName, actionName) {
	if (this.state.action1 === null) {
		[this.state.action1.playerName, this.state.action1.actionName] = [actionName, playerName];
	}
	else {
		[this.state.action2.playerName, this.state.action2.actionName] = [actionName, playerName];
	}
};
// ---------------------------- >>


gameInstanceSchema.methods.addPlayer = function (playerName) {
	this.playerNames.push(playerName)
	this.gameStage = 1
}

gameInstanceSchema.methods.generateGameCode = function () {
  let code = ""
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i=0; i<5; i++) {
		code += possible.charAt(Math.floor(Math.random() * possible.length))
	}
  this.gameCode = code.toUpperCase()
}

gameInstanceSchema.methods.generateGameToken = function () {
  let token = ""
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i=0; i<25; i++) {
		token += possible.charAt(Math.floor(Math.random() * possible.length))
	}
  this.gameToken = token
}

gameInstanceSchema.methods.addPokemonToTeamWithPlayerName = function (playerName, pokemon) {
	for (let stateObj of this.state.gameState) {
		if (stateObj.playerName === playerName) {
			stateObj.pokemon.push(pokemon._id)
		}
	}
}

gameInstanceSchema.methods.bumpGameStage = function () {
	this.gameStage += 1
}

module.exports = mongoose.model('GameInstance', gameInstanceSchema)
