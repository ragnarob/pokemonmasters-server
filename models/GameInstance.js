const mongoose = require('mongoose')
const Schema = mongoose.Schema
let Pokemon = require('./Pokemon')

let gameInstanceSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	gameCode: String,
	gameToken: String,
	playerNames: [String],
	gameStage: {type: Number, default: 0},
	gameFinished: Boolean,
	state: {
		ready: Boolean,
		message: String,
		winner: String,
		gameState: { // dict, {playerName: [Pokemon]}
			type: Map,
			of: [{type: Schema.Types.ObjectId, ref: 'Pokemon'}]
		}
	}
})

gameInstanceSchema.methods.addPlayer = function (playerName) {
	if (this.playerNames.length === 0) {
		this.playerNames = [playerName]
		this.state.gameStage = 0 //todo mongoose default?
	}
	else {
		this.playerNames.push(playerName)
		this.state.gameStage = 1
	}
}

gameInstanceSchema.methods.generateGameCode = function () {
  let code = ""
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i=0; i<5; i++) {
		code += possible.charAt(Math.floor(Math.random() * possible.length))
	}
  this.gameCode = code
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