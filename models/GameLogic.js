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

let gameInstance = require('./InGamePokemon')
