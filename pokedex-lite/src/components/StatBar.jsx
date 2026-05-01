import React, { useEffect, useState } from 'react'
import { STAT_COLORS, STAT_MAX } from '../constants'
import styles from './StatBar.module.css'

export default function StatBar({ name, value }) {
  const [width, setWidth] = useState(0)
  const max = STAT_MAX[name] || 180
  const pct = Math.min(100, (value / max) * 100)
  const color = STAT_COLORS[name] || '#888'

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div className={styles.row}>
      <div className={styles.name}>{name.replace(/-/g, ' ')}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{ width: width + '%', background: color }}
        />
      </div>
    </div>
  )
}
