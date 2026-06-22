/**
 * Home.jsx
 * Main page with dynamic background image that changes with weather condition.
 */

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SearchBar    from '../components/SearchBar'
import WeatherCard  from '../components/WeatherCard'
import ForecastCard from '../components/ForecastCard'
import Loader       from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { useWeather } from '../hooks/useWeather'
import styles from './Home.module.css'

// Default bg when no weather loaded yet
const DEFAULT_BG = {
  image:   'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600&q=80',
  overlay: 'linear-gradient(135deg,rgba(15,23,42,0.75) 0%,rgba(30,41,59,0.8) 100%)',
  accent:  '#38BDF8',
  glow:    'rgba(56,189,248,0.2)',
}

const Home = () => {
  const { weather, forecast, bgConfig, loading, error, searchCity, detectLocation } = useWeather()
  const [bgLoaded, setBgLoaded] = useState(false)
  const activeBg = bgConfig || DEFAULT_BG

  // Auto-detect location on mount
  useEffect(() => { detectLocation() }, []) // eslint-disable-line

  // Preload background image before showing it
  useEffect(() => {
    setBgLoaded(false)
    const img = new Image()
    img.src = activeBg.image
    img.onload = () => setBgLoaded(true)
  }, [activeBg.image])

  return (
    <div className={styles.root}>
      {/* ── Dynamic background image ── */}
      <div className={styles.bgLayer}>
        <AnimatePresence>
          {bgLoaded && (
            <motion.div
              key={activeBg.image}
              className={styles.bgImage}
              style={{ backgroundImage: `url(${activeBg.image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          )}
        </AnimatePresence>
        {/* Gradient overlay — updates with weather */}
        <div className={styles.bgOverlay} style={{ background: activeBg.overlay }} />
        {/* Bottom vignette for card readability */}
        <div className={styles.bgVignette} />
      </div>

      {/* ── Page content ── */}
      <main className={styles.main}>
        <div className={styles.container}>
          <SearchBar
            onSearch={searchCity}
            onDetectLocation={detectLocation}
            loading={loading}
          />

          <div className={styles.content}>
            <AnimatePresence mode="wait">
              {loading && <Loader key="loader" />}

              {!loading && error && (
                <ErrorMessage key="error" message={error} />
              )}

              {!loading && !error && weather && (
                <div key="weather" className={styles.weatherContent}>
                  <WeatherCard
                    data={weather}
                    accent={activeBg.accent}
                    glow={activeBg.glow}
                  />
                  <ForecastCard
                    forecast={forecast}
                    accent={activeBg.accent}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
