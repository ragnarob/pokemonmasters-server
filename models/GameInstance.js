const mongoose = require('mongoose')
const Schema = mongoose.Schema
let InGamePokemon = require('./InGamePokemon')

let gameInstanceSchema = new mongoose.Schema({
	gameCode: String,
	gameToken: String,
	playerNames: [String],
	gameStage: {type: Number, default: 0},
	gameFinished: {type: Boolean, default: false},
	winner: {type: String, default: null},
	state: { // usikker på om dette blir rett. Map istedenfor??
		ready: Boolean,
		message: String,
		hasWinner: Boolean,
		winner: String,
		gameState: { // dict, {playerName: [InGamePokemon]}
			type: Map,
			of: [{type: Schema.Types.ObjectId, ref: 'InGamePokemon'}] // todo lage InGamePokemon-modellen
		}
	}
})

gameInstanceSchema.methods.addPlayer = function (playerName) {
	this.playerNames.push(playerName)
	this.state.gameStage = 1
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


module.exports = mongoose.model('GameInstance', gameInstanceSchema)