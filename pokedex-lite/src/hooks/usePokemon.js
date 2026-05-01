import { useState, useEffect } from 'react'
import { fetchAllPokemon } from '../api'
import { TOTAL_POKEMON } from '../constants'

export function usePokemon() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  async function load() {
    setLoading(true)
    setError(null)
    setProgress(0)
    try {
      const data = await fetchAllPokemon(TOTAL_POKEMON, 20, (loaded, total) => {
        setProgress(Math.round((loaded / total) * 100))
      })
      setPokemon(data)
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return { pokemon, loading, error, progress, retry: load }
}
