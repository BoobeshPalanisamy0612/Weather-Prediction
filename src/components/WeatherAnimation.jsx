/**
 * WeatherAnimation.jsx
 * Renders condition-specific CSS/SVG animations inside the weather card.
 */

import React from 'react'
import styles from './WeatherAnimation.module.css'

/**
 * Map OpenWeather condition IDs to animation type:
 *   2xx = thunderstorm, 3xx/5xx = rain, 6xx = snow,
 *   7xx = mist/fog, 800 = clear, 80x = clouds
 */
const getAnimationType = (id) => {
  if (id >= 200 && id < 300) return 'thunder'
  if (id >= 300 && id < 600) return 'rain'
  if (id >= 600 && id < 700) return 'snow'
  if (id >= 700 && id < 800) return 'fog'
  if (id === 800)             return 'sunny'
  return 'cloudy'
}

/* ── Sub-animations ─────────────────────────────────────────────────────── */

const SunnyAnimation = () => (
  <div className={styles.sunWrap}>
    <div className={styles.sunCore} />
    <div className={styles.sunRays}>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={styles.sunRay} style={{ '--i': i }} />
      ))}
    </div>
  </div>
)

const RainAnimation = () => (
  <div className={styles.rainWrap}>
    <div className={styles.cloud} />
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={styles.raindrop}
        style={{
          '--x': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 1.5}s`,
          '--dur': `${0.6 + Math.random() * 0.6}s`,
        }}
      />
    ))}
  </div>
)

const CloudyAnimation = () => (
  <div className={styles.cloudyWrap}>
    <div className={`${styles.cloudShape} ${styles.cloudBack}`} />
    <div className={`${styles.cloudShape} ${styles.cloudFront}`} />
  </div>
)

const ThunderAnimation = () => (
  <div className={styles.thunderWrap}>
    <div className={styles.stormCloud} />
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className={styles.raindrop}
        style={{
          '--x': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 1.5}s`,
          '--dur': `${0.5 + Math.random() * 0.5}s`,
        }}
      />
    ))}
    <div className={styles.bolt}>⚡</div>
  </div>
)

const SnowAnimation = () => (
  <div className={styles.snowWrap}>
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={styles.snowflake}
        style={{
          '--x': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 2}s`,
          '--dur': `${1.5 + Math.random() * 1}s`,
          '--size': `${4 + Math.random() * 6}px`,
        }}
      />
    ))}
  </div>
)

const FogAnimation = () => (
  <div className={styles.fogWrap}>
    {[1, 2, 3].map((i) => (
      <div key={i} className={styles.fogBar} style={{ '--i': i }} />
    ))}
  </div>
)

/* ── Main export ─────────────────────────────────────────────────────────── */
const WeatherAnimation = ({ conditionId }) => {
  const type = getAnimationType(conditionId)
  const map = {
    sunny:  <SunnyAnimation />,
    rain:   <RainAnimation />,
    cloudy: <CloudyAnimation />,
    thunder:<ThunderAnimation />,
    snow:   <SnowAnimation />,
    fog:    <FogAnimation />,
  }
  return <div className={styles.container}>{map[type]}</div>
}

export default WeatherAnimation
