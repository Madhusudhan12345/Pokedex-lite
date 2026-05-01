import React from 'react'
import styles from './LoadingScreen.module.css'

function PokeballSVG() {
  return (
    <svg className={styles.pokeball} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#e3350d" stroke="#1a1a2e" strokeWidth="3" />
      <rect x="2" y="29" width="60" height="6" fill="#1a1a2e" />
      <circle cx="32" cy="32" r="10" fill="#f5f0e8" stroke="#1a1a2e" strokeWidth="3" />
      <circle cx="32" cy="32" r="5" fill="#1a1a2e" />
    </svg>
  )
}

export default function LoadingScreen({ progress }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <PokeballSVG />
      <div className={styles.text}>LOADING POKÉDEX...</div>
      {progress > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} style={{ width: progress + '%' }} />
        </div>
      )}
      {progress > 0 && (
        <div className={styles.pct}>{progress}%</div>
      )}
    </div>
  )
}
