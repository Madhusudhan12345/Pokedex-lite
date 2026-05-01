import React, { useState, useCallback, useMemo } from 'react'
import Header from './components/Header'
import PokeCard from './components/PokeCard'
import PokemonModal from './components/PokemonModal'
import Pagination from './components/Pagination'
import LoadingScreen from './components/LoadingScreen'
import ErrorScreen from './components/ErrorScreen'
import { usePokemon } from './hooks/usePokemon'
import { useFavorites } from './hooks/useFavorites'
import { PAGE_SIZE } from './constants'
import styles from './App.module.css'

export default function App() {
  const { pokemon, loading, error, progress, retry } = usePokemon()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const [search, setSearch]           = useState('')
  const [typeFilter, setTypeFilter]   = useState('all')
  const [showFavsOnly, setShowFavsOnly] = useState(false)
  const [page, setPage]               = useState(1)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // Reset to page 1 on filter changes
  function handleSearch(v)     { setSearch(v);      setPage(1) }
  function handleType(v)       { setTypeFilter(v);  setPage(1) }
  function handleToggleFavs()  { setShowFavsOnly(p => !p); setPage(1) }

  const filtered = useMemo(() => {
    return pokemon.filter((p) => {
      if (showFavsOnly && !isFavorite(p.id)) return false
      if (search && !p.name.includes(search.toLowerCase().trim())) return false
      if (typeFilter !== 'all' && !p.types.some((t) => t.type.name === typeFilter)) return false
      return true
    })
  }, [pokemon, search, typeFilter, showFavsOnly, favorites])

  const totalPages  = Math.ceil(filtered.length / PAGE_SIZE)
  const pagePokemon = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSelect   = useCallback((p) => setSelectedPokemon(p), [])
  const handleClose    = useCallback(() => setSelectedPokemon(null), [])
  const handlePageChange = useCallback((n) => {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <Header
        search={search}        onSearch={handleSearch}
        typeFilter={typeFilter} onTypeFilter={handleType}
        showFavs={showFavsOnly} onToggleFavs={handleToggleFavs}
        favCount={favorites.length}
      />

      <main className={styles.main}>
        {loading && <LoadingScreen progress={progress} />}
        {error   && <ErrorScreen message={error} onRetry={retry} />}

        {!loading && !error && (
          <>
            {/* Stats bar */}
            <div className={styles.statsBar}>
              <span>
                SHOWING <span className={styles.highlight}>{filtered.length}</span> POKÉMON
              </span>
              {typeFilter !== 'all' && (
                <span>TYPE: <span className={styles.highlight}>{typeFilter.toUpperCase()}</span></span>
              )}
              {showFavsOnly && <span className={styles.highlight}>★ FAVORITES ONLY</span>}
              {search && (
                <span>SEARCH: <span className={styles.highlight}>"{search}"</span></span>
              )}
            </div>

            {/* Grid */}
            {pagePokemon.length > 0 ? (
              <div className={styles.grid}>
                {pagePokemon.map((p) => (
                  <PokeCard
                    key={p.id}
                    pokemon={p}
                    onClick={handleSelect}
                    isFav={isFavorite(p.id)}
                    onToggleFav={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>?</div>
                <h2 className={styles.emptyTitle}>NO POKÉMON FOUND</h2>
                <p className={styles.emptyMsg}>Try a different search or filter.</p>
              </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPage={handlePageChange} />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={handleClose}
          isFav={isFavorite(selectedPokemon.id)}
          onToggleFav={toggleFavorite}
        />
      )}
    </>
  )
}
