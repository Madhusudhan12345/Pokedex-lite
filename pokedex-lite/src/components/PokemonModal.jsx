import React, { useEffect } from 'react'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import { getPokemonSprite } from '../api'
import styles from './PokemonModal.module.css'

export default function PokemonModal({ pokemon, onClose, isFav, onToggleFav }) {
  const sprite = getPokemonSprite(pokemon)
  const num = String(pokemon.id).padStart(3, '0')

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{pokemon.name}</div>
            <div className={styles.num}>#{num}</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* Sprite + types */}
          <div className={styles.imgSection}>
            {sprite
              ? <img className={styles.img} src={sprite} alt={pokemon.name} />
              : <div className={styles.noImg}>?</div>
            }
            <div className={styles.types}>
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
              ))}
            </div>
          </div>

          {/* Meta grid */}
          <div className={styles.metaGrid}>
            <MetaItem label="Height" value={`${(pokemon.height / 10).toFixed(1)} m`} />
            <MetaItem label="Weight" value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
            <MetaItem label="Base XP" value={pokemon.base_experience ?? '—'} />
            <MetaItem label="Abilities" value={pokemon.abilities.length} />
          </div>

          {/* Stats */}
          <SectionTitle>Base Stats</SectionTitle>
          {pokemon.stats.map((s) => (
            <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
          ))}

          {/* Abilities */}
          <SectionTitle style={{ marginTop: 14 }}>Abilities</SectionTitle>
          <div className={styles.abilityList}>
            {pokemon.abilities.map((a) => (
              <span key={a.ability.name} className={styles.abilityTag}>
                {a.ability.name.replace(/-/g, ' ')}
                {a.is_hidden && <span className={styles.hidden}> (hidden)</span>}
              </span>
            ))}
          </div>

          {/* Favorite button */}
          <button
            className={`${styles.favBtn} ${isFav ? styles.favBtnActive : ''}`}
            onClick={() => onToggleFav(pokemon.id)}
          >
            {isFav ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children, style }) {
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 8,
        color: 'var(--dark)',
        marginBottom: 10,
        paddingBottom: 4,
        borderBottom: '2px solid var(--dark)',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function MetaItem({ label, value }) {
  return (
    <div
      style={{
        background: 'var(--cream-dark)',
        border: '2px solid #ddd',
        padding: '8px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: "'VT323', monospace", fontSize: 14, color: '#888', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: 'var(--dark)', marginTop: 3 }}>
        {value}
      </div>
    </div>
  )
}
