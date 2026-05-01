export const PAGE_SIZE = 20
export const TOTAL_POKEMON = 151

export const POKEMON_TYPES = [
  'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock',
  'ghost', 'dragon', 'dark', 'steel', 'fairy',
]

export const TYPE_COLORS = {
  normal:   { bg: '#a8a878', text: '#fff' },
  fire:     { bg: '#f08030', text: '#fff' },
  water:    { bg: '#6890f0', text: '#fff' },
  grass:    { bg: '#78c850', text: '#fff' },
  electric: { bg: '#f8d030', text: '#444' },
  ice:      { bg: '#98d8d8', text: '#444' },
  fighting: { bg: '#c03028', text: '#fff' },
  poison:   { bg: '#a040a0', text: '#fff' },
  ground:   { bg: '#e0c068', text: '#444' },
  flying:   { bg: '#a890f0', text: '#fff' },
  psychic:  { bg: '#f85888', text: '#fff' },
  bug:      { bg: '#a8b820', text: '#fff' },
  rock:     { bg: '#b8a038', text: '#fff' },
  ghost:    { bg: '#705898', text: '#fff' },
  dragon:   { bg: '#7038f8', text: '#fff' },
  dark:     { bg: '#705848', text: '#fff' },
  steel:    { bg: '#b8b8d0', text: '#444' },
  fairy:    { bg: '#ee99ac', text: '#444' },
}

export const STAT_COLORS = {
  hp:               '#ff5959',
  attack:           '#f5ac78',
  defense:          '#fae078',
  'special-attack': '#9db7f5',
  'special-defense':'#a7db8d',
  speed:            '#fa92b2',
}

export const STAT_MAX = {
  hp: 255,
  attack: 180,
  defense: 180,
  'special-attack': 180,
  'special-defense': 180,
  speed: 180,
}
