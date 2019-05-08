module.exports = {
    'Normal': {
        name: 'Normal',
        battleProperties: {Offensive: {Power: ([] /*= 2*/, ['Rock'] /*= 0.5*/, ['Ghost'] /*= 0*/)}, Defensive: {Power: (['Fighting'] /*= 2*/, [] /*= 0.5*/, ['Ghost'] /*= 0*/)}}
    },

    'Fighting': {
        name: 'Fighting',
        battleProperties: {Offensive: {Power: (['Normal', 'Rock', 'Ice'] /*= 2*/, ['Poison', 'Flying', 'Bug', 'Psychic'] /*= 0.5*/, ['Ghost'] /*= 0*/)}, Defensive: {Power: (['Flying', 'Psychic'] /*= 2*/, ['Bug', 'Rock'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Flying': {
        name: 'Flying',
        battleProperties: {Offensive: {Power: (['Bug', 'Fighting', 'Grass'] /*= 2*/, ['Rock', 'Electric'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Electric', 'Ice', 'Rock'] /*= 2*/, ['Bug', 'Fighting', 'Grass'] /*= 0.5*/, ['Ground'] /*= 0*/)}}
    },

    'Poison': {
        name: 'Poison',
        battleProperties: {Offensive: {Power: (['Bug', 'Grass'] /*= 2*/, ['Poison', 'Ground', 'Rock', 'Ghost'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Ground', 'Bug', 'Psychic'] /*= 2*/, ['Fighting', 'Poison', 'Grass'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Ground': {
        name: 'Ground',
        battleProperties: {Offensive: {Power: (['Electric', 'Fire', 'Poison', 'Rock'] /*= 2*/, ['Bug', 'Grass'] /*= 0.5*/, ['Flying'] /*= 0*/)}, Defensive: {Power: (['Grass', 'Ice', 'Water'] /*= 2*/, ['Poison', 'Rock'] /*= 0.5*/, ['Electric'] /*= 0*/)}}
    },

    'Rock': {
        name: 'Rock',
        battleProperties: {Offensive: {Power: (['Bug', 'Flying', 'Fire', 'Ice'] /*= 2*/, ['Fighting', 'Ground'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Fighting', 'Grass', 'Ground', 'Water'] /*= 2*/, ['Fighting', 'Flying', 'Normal', 'Poison'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Bug': {
        name: 'Bug',
        battleProperties: {Offensive: {Power: (['Grass', 'Poison', 'Psychic'] /*= 2*/ , ['Fighting', 'Fire', 'Flying', 'Ghost'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Fire', 'Flying', 'Poison', 'Rock'] /*= 2*/, ['Fighting', 'Grass', 'Ground'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Ghost': {
        name: 'Ghost',
        battleProperties: {Offensive: {Power: (['Ghost'] /*= 2*/, [] /*= 0.5*/, ['Normal', 'Psychic'] /*= 0*/)}, Defensive: {Power: (['Ghost'] /*= 2*/, ['Bug', 'Poison'] /*= 0.5*/, ['Normal', 'Fighting'] /*= 0*/)}}
    },

    'Fire': {
        name: 'Fire',
        battleProperties: {Offensive: {Power: (['Grass', 'Bug', 'Ice'] /*= 2*/, ['Rock', 'Dragon', 'Fire', 'Water'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Ground', 'Rock', 'Water'] /*= 2*/, ['Bug', 'Fire', 'Grass'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Water': {
        name: 'Water',
        battleProperties: {Offensive: {Power: (['Fire', 'Ground', 'Rock'] /*= 2*/, ['Dragon', 'Grass', 'Water'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Electric', 'Grass'] /*= 2*/, ['Fire', 'Ice', 'Water'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Grass': {
        name: 'Grass',
        battleProperties: {Offensive: {Power: (['Ground', 'Rock', 'Water'] /*= 2*/, ['Bug', 'Dragon', 'Fire', 'Flying', 'Grass', 'Poison'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Bug', 'Fire', 'Flying', 'Ice', 'Poison'] /*= 2*/, ['Electric', 'Grass', 'Ground', 'Water'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Electric': {
        name: 'Electric',
        battleProperties: {Offensive: {Power: (['Flying', 'Water'] /*= 2*/, ['Dragon', 'Electric', 'Grass'] /*= 0.5*/, ['Ground'] /*= 0*/)}, Defensive: {Power: (['Ground'] /*= 2*/, ['Electric', 'Flying'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Psychic': {
        name: 'Psychic',
        battleProperties: {Offensive: {Power: (['Fighting', 'Poison'] /*= 2*/, ['Psychic'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Bug'] /*= 2*/, ['Fighting', 'Psychic'] /*= 0.5*/, ['Ghost'] /*= 0*/)}}
    },

    'Ice': {
        name: 'Ice',
        battleProperties: {Offensive: {Power: (['Dragon', 'Flying', 'Grass', 'Ground'] /*= 2*/, ['Ice', 'Water'] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Fighting', 'Fire', 'Rock'] /*= 2*/, ['Ice'] /*= 0.5*/, [] /*= 0*/)}}
    },

    'Dragon': {
        name: 'Dragon',
        battleProperties: {Offensive: {Power: (['Dragon'] /*= 2*/, [] /*= 0.5*/, [] /*= 0*/)}, Defensive: {Power: (['Dragon', 'Ice'] /*= 2*/, ['Electric', 'Fire', 'Grass', 'Water'] /*= 0.5*/, [] /*= 0*/)}}
    }
}