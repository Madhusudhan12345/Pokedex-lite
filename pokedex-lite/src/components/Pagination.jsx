import React from 'react'
import styles from './Pagination.module.css'

export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null

  function getPageNums() {
    const pages = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, start + 4)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.btn}
        disabled={page === 1}
        onClick={() => onPage(1)}
        title="First page"
      >«</button>
      <button
        className={styles.btn}
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >‹ PREV</button>

      {getPageNums().map((n) => (
        <button
          key={n}
          className={`${styles.btn} ${n === page ? styles.active : ''}`}
          onClick={() => onPage(n)}
          aria-current={n === page ? 'page' : undefined}
        >{n}</button>
      ))}

      <button
        className={styles.btn}
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
      >NEXT ›</button>
      <button
        className={styles.btn}
        disabled={page === totalPages}
        onClick={() => onPage(totalPages)}
        title="Last page"
      >»</button>
    </nav>
  )
}
