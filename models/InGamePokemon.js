const mongoose = require('mongoose')

let inGamePokemonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    types: [String],
    baseStats: {type: Map, of: String},
    stats: {type: Map, of: String},
    positionInParty: Number,
    statusEffect: [String],
    
    // Other things, will probably be expanded. Depends on moves.
    immunityTurns: {type: Number, default: 0}
})

module.exports = mongoose.model('InGamePokemon', inGamePokemonSchema)
