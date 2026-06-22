/**
 * SearchBar.jsx
 * City search input with geolocation button.
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import styles from './SearchBar.module.css'

// Popular Indian cities for quick access
const QUICK_CITIES = ['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Coimbatore']

const SearchBar = ({ onSearch, onDetectLocation, loading }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) onSearch(input.trim())
  }

  const handleQuickCity = (city) => {
    setInput(city)
    onSearch(city)
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* Main search form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrap}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city… e.g. Chennai, Bangalore"
            className={styles.input}
            disabled={loading}
            autoComplete="off"
          />
          {input && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setInput('')}
              aria-label="Clear"
            >×</button>
          )}
        </div>

        <motion.button
          type="submit"
          className={styles.searchBtn}
          disabled={loading || !input.trim()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Search
        </motion.button>

        <motion.button
          type="button"
          className={styles.locationBtn}
          onClick={onDetectLocation}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          title="Use my location"
        >
          <FiMapPin size={18} />
          <span>My Location</span>
        </motion.button>
      </form>

      {/* Quick city pills */}
      <div className={styles.quickCities}>
        {QUICK_CITIES.map((city) => (
          <motion.button
            key={city}
            className={styles.pill}
            onClick={() => handleQuickCity(city)}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(56,189,248,0.2)' }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {city}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default SearchBar
