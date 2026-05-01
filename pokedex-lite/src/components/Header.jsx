import React from 'react'
import { POKEMON_TYPES } from '../constants'
import styles from './Header.module.css'

export default function Header({
  search, onSearch,
  typeFilter, onTypeFilter,
  showFavs, onToggleFavs,
  favCount,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          POKÉDEX <span className={styles.logoAccent}>LITE</span>
        </div>

        <div className={styles.controls}>
          <input
            className={styles.searchBox}
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search Pokémon by name"
          />

          <select
            className={styles.typeSelect}
            value={typeFilter}
            onChange={(e) => onTypeFilter(e.target.value)}
            aria-label="Filter by type"
          >
            {POKEMON_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'all' ? 'All Types' : t.toUpperCase()}
              </option>
            ))}
          </select>

          <button
            className={`${styles.favBtn} ${showFavs ? styles.favBtnActive : ''}`}
            onClick={onToggleFavs}
            aria-pressed={showFavs}
          >
            ★ FAVS {favCount > 0 && `(${favCount})`}
          </button>
        </div>
      </div>
    </header>
  )
}
