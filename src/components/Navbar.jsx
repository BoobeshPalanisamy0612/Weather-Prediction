/**
 * Navbar.jsx
 * Top navigation bar — glassmorphism over dynamic background image.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { WiDaySunny } from 'react-icons/wi'
import styles from './Navbar.module.css'

const Navbar = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.brand}>
        <motion.div
          className={styles.logoIcon}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <WiDaySunny size={36} />
        </motion.div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>WeatherScope</span>
          <span className={styles.brandTagline}>Live Weather Dashboard</span>
        </div>
      </div>

      <div className={styles.dateBox}>
        <span className={styles.date}>{today}</span>
      </div>
    </motion.nav>
  )
}

export default Navbar
