/*
Basically logikken for hva som skjer når begge spillerne har valgt sitt angrep (eller bytte).
Begge spillere kaller /api/game/action med hver sin payload som inneholder info om angrep/bytte.
Så serveren mottar disse og oppdaterer GameInstance.
Når begge har sendt en slik, kalkuleres outcome basert på en del regler som gjelder i pokemon,
lett å finne på internett.
Når outcome har blitt kalkulert økes 'round' i GameInstance med 1,
i tillegg til at data om pokemonene  (hp, position i party osv)
blir oppdatert i GameInstance sin state.gameState
 */

let moves = require('../static/moves')

module.exports = class GameLogic {
  static calculateOutcome (gameInstance) {
    gameState = gameInstance.state
    gameState.message = ''

    // Swap always first
    let swapActions = gameState.actions.filter(action => action.actionType==='swap')
    for (let playerAction of swapActions) {
      let playerGameState = gameState.gameState.find(gs => gs.playerName===playerName)
      gameState.message += `${playerAction.playerName} swapped ${playerGameState.pokemon[0]} for ${playerGameState.pokemon[playerAction.swapPosition-1]}!\n`
      playerGameState.pokemon = this.swapPokemon(playerGameState.pokemon, playerAction.swapPosition)
    }

    if (swapActions.length == 0) {
      gameState = this.handleTwoMoves(gameState)
    }
    else if (swapActions.length == 1) {
      gameState = this.handleOneMove(gameState)
    }

    gameState.round += 1
    gameState.actions = []
    gameInstance.gameState = gameState
    gameInstance.save()
  }

  static handleTwoMoves (gameState) {
    let playerToMoveFirst
    let playerToMoveLast
    if (gameState.gameState[0].pokemon[0].stats['spd'] > gameState.gameState[1].pokemon[0].stats['spd']) {
      playerToMoveFirst = gameState.gameState[0].playerName
      playerToMoveLast = gameState.gameState[1].playerName
    }
    else {
      playerToMoveFirst = gameState.gameState[1].playerName
      playerToMoveLast = gameState.gameState[0].playerName
    }
    gameState = this.handleOneMove(gameState, playerToMoveFirst)

    // check if the last player's pokemon fainted
    if (gameState.message.indexOf('fainted!') > 0) {
      return gameState
    }
    else {
      return this.handleOneMove(gameState, playerToMoveLast)
    }
  }

  static handleOneMove (gameState, attackingPlayerName) {
    let moveAction = gameState.actions.where(action => action.playerName===attackingPlayerName)
    let moveData = Object.values(moves).find(m => m.name == moveAction.moveName)

    let attackingPlayerGameState = gameState.gameState.find(gs => gs.playerName===attackingPlayerName)
    let defendingPlayerGameState = gameState.gameState.find(gs => gs.playerName!=attackingPlayerName)
    
    let attackingPokemon = attackingPlayerGameState.pokemon[0]
    let defendingPokemon = defendingPlayerGameState.pokemon[0]

    let moveHit = Math.random()*100 > moveData.accuracy

    if (!moveHit) {
      gameState.message += `${attackingPokemon.name} used ${moveData.name}, but it missed!\n`
      return gameState
    }

    // https://bulbapedia.bulbagarden.net/wiki/Damage
    let offensiveStatMultiplier
    let defensiveStatMultiplier
    if (moveData.category === 'Special') {
      offensiveStatMultiplier = attackingPokemon.stats['atk']
      defensiveStatMultiplier = defendingPokemon.stats['def']
    }
    else {
      offensiveStatMultiplier = attackingPokemon.stats['spa']
      defensiveStatMultiplier = defendingPokemon.stats['spd']
    }

    let damage = ((22 * moveData.basePower * (offensiveStatMultiplier/defensiveStatMultiplier))/50)+2

    // calculate STAB
    if (attackingPokemon.types.indexOf(moveData.type)) {
      damage *= 1.5
    }

    // Kan kalkulere critical hit. Noen andre kan slå opp dette.
    // Hvis det blir crit, husk å legge det til i message

    // calculate type multiplier TODO NOEN ANDRE PLS
    // så blir baseDamage oppdatert.

    defendingPokemon['hp'] -= damage

    message += `${attackingPokemon.name} used ${moveData.name} for ${damage} damage.\n`

    if (defendingPokemon['hp'] <= 0) {
      defendingPokemon['alive'] = false
      let nextLivingPokemonIndex = defendingPlayerGameState.pokemon.findIndex(p => p.alive == true)
      // if game over
      if (nextLivingPokemonIndex == -1) {
        gameState.winner = attackingPlayerName
        gameState.message += `${defendingPokemon} fainted! ${defendingPlayerGameState.playerName} WINS!\n`
      }
      // ellers bare dead pokemon
      else {
        // FOR NOW: Vi bare setter inn neste levende pokemon i party. Bør forbedres tho.
        gameState.message += `${defendingPokemon} fainted! ${defendingPlayerGameState.playerName} sent out ${defendingPlayerGameState.pokemon[nextLivingPokemonIndex]}!\n`
        this.swapPokemon(defendingPlayerGameState.pokemon, nextLivingPokemonIndex+1)
      }
    }

    return gameState
  }

  static swapPokemon (playerPokemonParty, swapPosition) {
    let currentPokemon = playerPokemonParty[0]
    playerPokemonParty[0] = playerPokemonParty[swapPosition-1]
    playerPokemonParty[swapPosition-1] = currentPokemon
    return playerPokemonParty
  }

  static getPlayerGameState (gameState, playerName) {
    return gameState.state.gameState.find(gs => gs.playerName===playerName)
  }
}