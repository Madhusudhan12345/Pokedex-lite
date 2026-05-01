import React from 'react'
import styles from './ErrorScreen.module.css'

export default function ErrorScreen({ message, onRetry }) {
  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.box}>
        <div className={styles.icon}>✕</div>
        <h2 className={styles.title}>CONNECTION ERROR</h2>
        <p className={styles.msg}>{message || 'Could not connect to PokéAPI.'}</p>
        <p className={styles.hint}>Check your internet connection and try again.</p>
        <button className={styles.retryBtn} onClick={onRetry}>↺ RETRY</button>
      </div>
    </div>
  )
}
