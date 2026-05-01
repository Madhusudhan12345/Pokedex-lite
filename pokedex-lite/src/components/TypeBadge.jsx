import React from 'react'
import { TYPE_COLORS } from '../constants'
import styles from './TypeBadge.module.css'

export default function TypeBadge({ type, size = 'sm' }) {
  const colors = TYPE_COLORS[type] || { bg: '#888', text: '#fff' }
  return (
    <span
      className={`${styles.badge} ${styles[size]}`}
      style={{ background: colors.bg, color: colors.text }}
    >
      {type}
    </span>
  )
}
