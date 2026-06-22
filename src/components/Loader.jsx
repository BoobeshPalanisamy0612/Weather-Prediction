/**
 * Loader.jsx
 * Skeleton loading state for the weather dashboard.
 */

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Loader.module.css'

const SkeletonLine = ({ width = '100%', height = '16px', style = {} }) => (
  <div className={`skeleton ${styles.line}`} style={{ width, height, ...style }} />
)

const Loader = () => (
  <motion.div
    className={styles.wrapper}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Main card skeleton */}
    <div className={`${styles.card} glass-card`}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <SkeletonLine width="60%" height="14px" />
          <SkeletonLine width="40%" height="12px" style={{ marginTop: 8 }} />
          <SkeletonLine width="160px" height="80px" style={{ marginTop: 16, borderRadius: 12 }} />
          <SkeletonLine width="45%" height="12px" style={{ marginTop: 12 }} />
        </div>
        <div className={styles.right}>
          <div className={`skeleton ${styles.circle}`} />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.statsGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.statSkeleton}>
            <div className={`skeleton ${styles.statIcon}`} />
            <div style={{ flex: 1 }}>
              <SkeletonLine width="55%" height="10px" />
              <SkeletonLine width="70%" height="14px" style={{ marginTop: 6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Forecast skeleton */}
    <div className={`${styles.forecastCard} glass-card`}>
      <SkeletonLine width="140px" height="12px" style={{ marginBottom: 20 }} />
      <div className={styles.forecastGrid}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.forecastTile}>
            <SkeletonLine width="70%" height="12px" />
            <div className={`skeleton ${styles.forecastIcon}`} />
            <SkeletonLine width="55%" height="12px" />
            <SkeletonLine width="40%" height="16px" style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)

export default Loader
