const mongoose = require('mongoose')
const Schema = mongoose.Schema

let pokemonSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	name: String,
	types: [String],
	availableMoves: [String], //todo
	baseStats: {
		type: Map,
		of: Number
	}
})

module.exports = mongoose.model('PokemonSchema', pokemonSchema)