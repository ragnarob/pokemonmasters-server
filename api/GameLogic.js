let moves = require('../static/moves')

module.exports = class GameLogic {
  static calculateOutcome (gameInstance) {
    let gameState = gameInstance.state
    gameState.message = ''

    // Swap always first
    let swapActions = gameState.actions.filter(action => action.actionType==='swap')
    for (let playerAction of swapActions) {
      let playerGameState = gameState.gameState.find(gs => gs.playerName===playerAction.playerName)
      gameState.message += `${playerAction.playerName} swapped ${playerGameState.pokemon[0].name} for ${playerGameState.pokemon[playerAction.swapPosition-1].name}!\n`
      playerGameState.pokemon = this.swapPokemon(playerGameState.pokemon, playerAction.swapPosition)
    }

    if (swapActions.length == 0) {
      gameState = this.handleTwoMoves(gameState)
    }
    else if (swapActions.length == 1) {
      gameState = this.handleOneMove(gameState, gameState.actions.find(action => action.actionType!='swap').playerName)
    }

    gameState.round += 1
    gameState.actions = []
    gameInstance.gameState = gameState
    return gameInstance
  }

  static handleTwoMoves (gameState) {
    let playerToMoveFirst
    let playerToMoveLast
    let firstPlayerSpeed = Number(this.getCurrentPokemon(gameState.gameState[0].pokemon).stats.get('spd'))
    let secondPlayerSpeed = Number(this.getCurrentPokemon(gameState.gameState[1].pokemon).stats.get('spd'))
    if (firstPlayerSpeed > secondPlayerSpeed) {
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
    let moveAction = gameState.actions.find(action => action.playerName===attackingPlayerName)
    let moveData = moves[moveAction.moveName]

    let attackingPlayerGameState = gameState.gameState.find(gs => gs.playerName==attackingPlayerName)
    let defendingPlayerGameState = gameState.gameState.find(gs => gs.playerName!=attackingPlayerName)

    let attackingPokemon = this.getCurrentPokemon(attackingPlayerGameState.pokemon)
    let defendingPokemon = this.getCurrentPokemon(defendingPlayerGameState.pokemon)

    let moveHit = Math.random()*100 > 100-moveData.accuracy

    if (!moveHit) {
      gameState.message += `${attackingPokemon.name} used ${moveData.name}, but it missed!\n`
      return gameState
    }

    // https://bulbapedia.bulbagarden.net/wiki/Damage
    let offensiveStatMultiplier
    let defensiveStatMultiplier
    if (moveData.category === 'Special') {
      offensiveStatMultiplier = attackingPokemon.stats.get('atk')
      defensiveStatMultiplier = defendingPokemon.stats.get('def')
    }
    else {
      offensiveStatMultiplier = attackingPokemon.stats.get('spa')
      defensiveStatMultiplier = defendingPokemon.stats.get('spd')
    }


    let damage = ((22 * moveData.basePower * (Number(offensiveStatMultiplier)/Number(defensiveStatMultiplier)))/50)+2
    // calculate STAB
    if (attackingPokemon.types.indexOf(moveData.type)) {
      damage *= 1.5
    }

    // Kan kalkulere critical hit. Noen andre kan slå opp dette.
    // Hvis det blir crit, husk å legge det til i message

    // calculate type multiplier TODO NOEN ANDRE dette er LETT bare 
    // slå opp hva som er super effective mot hva annet (ta høyde for at det kan 
    // bli dobbelt også osv) og hvor mye multiplier det skal være.
    // så blir baseDamage oppdatert.

    defendingPokemon.stats.set('hp', defendingPokemon.stats.get('hp') - damage)
    gameState.message += `${attackingPokemon.name} used ${moveData.name} for ${Math.round(damage)} damage.\n`

    if (defendingPokemon.stats.get('hp') <= 0) {
      defendingPokemon.alive = false
      let nextLivingPokemon = defendingPlayerGameState.pokemon.find(p => p.alive == true)

      // if game over
      if (!nextLivingPokemon) {
        gameState.winner = attackingPlayerName
        gameState.message += `${defendingPokemon.name} fainted! ${defendingPlayerGameState.playerName} WINS!\n`
      }
      // ellers bare dead pokemon
      else {
        // FOR NOW: Vi bare setter inn neste levende pokemon i party. Bør forbedres tho.
        gameState.message += `${defendingPokemon.name} fainted! ${defendingPlayerGameState.playerName} sent out ${nextLivingPokemon.name}!\n`
        defendingPlayerGameState.pokemon = this.swapPokemon(defendingPlayerGameState.pokemon, nextLivingPokemon.positionInParty)
      }
    }

    return gameState
  }

  static swapPokemon (playerPokemonParty, swapPosition) {
    let currentPokemon = this.getCurrentPokemon(playerPokemonParty)
    playerPokemonParty.find(p => p.positionInParty==swapPosition).positionInParty = 1
    currentPokemon.positionInParty = swapPosition
    return playerPokemonParty
  }

  static getCurrentPokemon(playerPokemonParty) {
    return playerPokemonParty.find(pok => pok.positionInParty == 1)
  }

  static getPlayerGameState (gameState, playerName) {
    return gameState.state.gameState.find(gs => gs.playerName===playerName)
  }
}