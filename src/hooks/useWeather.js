/**
 * useWeather.js
 * Custom hook managing all weather state, API interactions, and bg config.
 */

import { useState, useCallback } from 'react'
import {
  getCurrentWeather, getForecast,
  getCurrentLocationWeather, getBgConfig,
} from '../services/weatherApi'

const processForecast = (forecastData) => {
  const daily = {}
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const day  = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    const hour = date.getHours()
    if (!daily[day] || Math.abs(hour - 12) < Math.abs(new Date(daily[day].dt * 1000).getHours() - 12)) {
      daily[day] = item
    }
  })
  return Object.values(daily).slice(0, 5)
}

export const useWeather = () => {
  const [weather,   setWeather]   = useState(null)
  const [forecast,  setForecast]  = useState([])
  const [bgConfig,  setBgConfig]  = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)

  const reset = () => { setError(null); setWeather(null); setForecast([]); setBgConfig(null) }

  const searchCity = useCallback(async (cityName) => {
    if (!cityName.trim()) return
    setLoading(true); reset()
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(cityName),
        getForecast(cityName),
      ])
      setWeather(weatherData)
      setForecast(processForecast(forecastData))
      setBgConfig(getBgConfig(weatherData.weather[0].id))
    } catch (err) {
      if (err.response?.status === 404)
        setError(`City "${cityName}" not found. Please check the spelling and try again.`)
      else if (err.response?.status === 401)
        setError('Invalid API key. Please add your OpenWeather API key to the .env file.')
      else
        setError('Something went wrong. Please check your connection and try again.')
    } finally { setLoading(false) }
  }, [])

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return }
    setLoading(true); reset()
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { weather: w, forecast: f } =
            await getCurrentLocationWeather(coords.latitude, coords.longitude)
          setWeather(w)
          setForecast(processForecast(f))
          setBgConfig(getBgConfig(w.weather[0].id))
        } catch { setError('Could not fetch weather for your location.') }
        finally { setLoading(false) }
      },
      () => { setError('Location access denied. Please search manually.'); setLoading(false) }
    )
  }, [])

  return { weather, forecast, bgConfig, loading, error, searchCity, detectLocation }
}
