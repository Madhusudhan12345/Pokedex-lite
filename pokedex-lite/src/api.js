const cache = {}

export async function fetchPokemon(id) {
  if (cache[id]) return cache[id]
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch Pokémon #${id}`)
  const data = await res.json()
  cache[id] = data
  return data
}

export async function fetchAllPokemon(total = 151, batchSize = 20, onProgress) {
  const ids = Array.from({ length: total }, (_, i) => i + 1)
  const results = []

  for (let i = 0; i < ids.length; i += batchSize) {
    const slice = ids.slice(i, i + batchSize)
    const batch = await Promise.all(slice.map(fetchPokemon))
    results.push(...batch)
    if (onProgress) onProgress(results.length, total)
  }

  return results
}

export function getPokemonSprite(pokemon) {
  return (
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default ||
    null
  )
}
