const mongoose = require('mongoose')

let inGamePokemonSchema = new mongoose.Schema({
    name: String,
    num: Number,
    types: [String],
    baseStats: {type: Map, of: String},
    stats: {type: Map, of: String},
    positionInParty: Number,
    statusEffect: {type: [String], default: []},
    moves: [String],
    alive: {type: Boolean, default: true},
    
    // Other things, will probably be expanded. Depends on moves.
    immunityTurns: {type: Number, default: 0}
})

module.exports = mongoose.model('InGamePokemon', inGamePokemonSchema)
