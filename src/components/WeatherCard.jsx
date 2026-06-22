/**
 * WeatherCard.jsx
 * Main card showing current weather — temperature, condition, and detail stats.
 * Removed: pressure, visibility (now shows humidity, wind, feels like, min/max only)
 */

import React from 'react'
import { motion } from 'framer-motion'
import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi'
import { FiMapPin } from 'react-icons/fi'
import WeatherAnimation from './WeatherAnimation'
import { getIconUrl } from '../services/weatherApi'
import styles from './WeatherCard.module.css'

const fmt = (n) => `${Math.round(n)}`
const fmtWind = (ms) => `${Math.round(ms * 3.6)} km/h`

const StatItem = ({ icon, label, value, accent }) => (
  <div className={styles.statItem}>
    <span className={styles.statIcon} style={{ color: accent }}>{icon}</span>
    <div>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  </div>
)

const WeatherCard = ({ data, accent = '#38BDF8', glow = 'rgba(56,189,248,0.2)' }) => {
  const { name, sys, main, weather, wind } = data
  const condition = weather[0]

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Accent glow top-right */}
      <div className={styles.glowOrb} style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} />

      {/* Top row */}
      <div className={styles.topRow}>
        <div className={styles.locationBlock}>
          <div className={styles.locationLine}>
            <FiMapPin className={styles.pinIcon} style={{ color: accent }} />
            <h2 className={styles.cityName}>{name}</h2>
            <span className={styles.countryBadge}>{sys.country}</span>
          </div>
          <p className={styles.conditionText}>{condition.description}</p>

          <div className={styles.tempRow}>
            <img src={getIconUrl(condition.icon)} alt={condition.description} className={styles.weatherIcon} />
            <span className={styles.temperature} style={{ textShadow: `0 0 40px ${accent}` }}>
              {fmt(main.temp)}°
            </span>
            <span className={styles.tempUnit}>C</span>
          </div>

          <p className={styles.feelsLike}>
            Feels like <strong>{fmt(main.feels_like)}°C</strong>
            &nbsp;·&nbsp;
            <span style={{ color: accent }}>↑{fmt(main.temp_max)}° ↓{fmt(main.temp_min)}°</span>
          </p>
        </div>

        <WeatherAnimation conditionId={condition.id} />
      </div>

      <div className={styles.divider} />

      {/* 2×2 stats grid — humidity, wind, feels like, min/max */}
      <div className={styles.statsGrid}>
        <StatItem icon={<WiHumidity size={26} />}   label="Humidity"   value={`${main.humidity}%`}        accent={accent} />
        <StatItem icon={<WiStrongWind size={26} />}  label="Wind Speed" value={fmtWind(wind.speed)}         accent={accent} />
        <StatItem icon={<WiThermometer size={26} />} label="Feels Like" value={`${fmt(main.feels_like)}°C`} accent={accent} />
        <StatItem icon={<WiThermometer size={22} />} label="Min / Max"  value={`${fmt(main.temp_min)}° / ${fmt(main.temp_max)}°`} accent={accent} />
      </div>
    </motion.div>
  )
}

export default WeatherCard
