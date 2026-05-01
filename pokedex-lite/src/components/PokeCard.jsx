import React from 'react'
import TypeBadge from './TypeBadge'
import { getPokemonSprite } from '../api'
import styles from './PokeCard.module.css'

export default function PokeCard({ pokemon, onClick, isFav, onToggleFav }) {
  const sprite = getPokemonSprite(pokemon)
  const num = String(pokemon.id).padStart(3, '0')

  function handleFav(e) {
    e.stopPropagation()
    onToggleFav(pokemon.id)
  }

  return (
    <div className={styles.card} onClick={() => onClick(pokemon)}>
      <button
        className={`${styles.favStar} ${isFav ? styles.favActive : ''}`}
        onClick={handleFav}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? '★' : '☆'}
      </button>

      <div className={styles.inner}>
        <div className={styles.num}>#{num}</div>
        <div className={styles.imgWrap}>
          {sprite ? (
            <img
              className={styles.img}
              src={sprite}
              alt={pokemon.name}
              loading="lazy"
            />
          ) : (
            <div className={styles.noImg}>?</div>
          )}
        </div>
        <div className={styles.name}>{pokemon.name}</div>
        <div className={styles.types}>
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
