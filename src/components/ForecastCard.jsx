/**
 * ForecastCard.jsx
 * 5-day forecast with accent color theming per weather condition.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { getIconUrl } from '../services/weatherApi'
import styles from './ForecastCard.module.css'

const fmt = (n) => `${Math.round(n)}°`

const formatDay = (dt) =>
  new Date(dt * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

const ForecastCard = ({ forecast, accent = '#38BDF8' }) => {
  if (!forecast || forecast.length === 0) return null

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className={styles.heading}>5-Day Forecast</h3>

      <div className={styles.grid}>
        {forecast.map((item, i) => (
          <motion.div
            key={item.dt}
            className={styles.tile}
            initial={{ opacity: 0, rotateX: -40, y: 16 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <p className={styles.day}>{i === 0 ? 'Today' : formatDay(item.dt)}</p>
            <img
              src={getIconUrl(item.weather[0].icon)}
              alt={item.weather[0].description}
              className={styles.icon}
            />
            <p className={styles.desc}>{item.weather[0].main}</p>
            <div className={styles.temps}>
              <span className={styles.tempHigh}>{fmt(item.main.temp_max)}</span>
              <span className={styles.tempLow}>{fmt(item.main.temp_min)}</span>
            </div>
            <div className={styles.humidity} style={{ color: accent }}>
              <span className={styles.humidityDot} style={{ background: accent }} />
              {item.main.humidity}%
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ForecastCard
