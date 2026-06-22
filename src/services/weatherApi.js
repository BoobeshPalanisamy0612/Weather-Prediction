/**
 * weatherApi.js
 * All OpenWeatherMap API calls + background config per weather condition.
 */

import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY
console.log("API_KEY =", API_KEY)
console.log("ENV =", import.meta.env)

const DEFAULT_PARAMS = { appid: API_KEY, units: 'metric', lang: 'en' }

export const getCurrentWeather = async (city) => {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: { ...DEFAULT_PARAMS, q: city },
  })
  return data
}

export const getForecast = async (city) => {
  const { data } = await axios.get(`${BASE_URL}/forecast`, {
    params: { ...DEFAULT_PARAMS, q: city },
  })
  return data
}

export const getCurrentLocationWeather = async (lat, lon) => {
  const [weatherRes, forecastRes] = await Promise.all([
    axios.get(`${BASE_URL}/weather`,  { params: { ...DEFAULT_PARAMS, lat, lon } }),
    axios.get(`${BASE_URL}/forecast`, { params: { ...DEFAULT_PARAMS, lat, lon } }),
  ])
  return { weather: weatherRes.data, forecast: forecastRes.data }
}

export const getIconUrl = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`

/**
 * Returns background image URL, gradient overlay, accent colour, and glow
 * based on the OpenWeather condition ID.
 */
export const getBgConfig = (conditionId) => {
  if (conditionId >= 200 && conditionId < 300) return {
    image:   'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1600&q=80',
    overlay: 'linear-gradient(135deg,rgba(15,23,42,0.8) 0%,rgba(30,27,75,0.7) 100%)',
    accent:  '#A78BFA',
    glow:    'rgba(167,139,250,0.22)',
  }
  if (conditionId >= 300 && conditionId < 600) return {
    image:   'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1600&q=80',
    overlay: 'linear-gradient(135deg,rgba(30,58,138,0.65) 0%,rgba(15,23,42,0.75) 100%)',
    accent:  '#7DD3FC',
    glow:    'rgba(125,211,252,0.22)',
  }
  if (conditionId >= 600 && conditionId < 700) return {
    image:   'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1600&q=80',
    overlay: 'linear-gradient(135deg,rgba(186,230,253,0.4) 0%,rgba(15,23,42,0.7) 100%)',
    accent:  '#BAE6FD',
    glow:    'rgba(186,230,253,0.25)',
  }
  if (conditionId >= 700 && conditionId < 800) return {
    image:   'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&q=80',
    overlay: 'linear-gradient(135deg,rgba(100,116,139,0.6) 0%,rgba(15,23,42,0.75) 100%)',
    accent:  '#CBD5E1',
    glow:    'rgba(203,213,225,0.22)',
  }
  if (conditionId === 800) return {
    image:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    overlay: 'linear-gradient(135deg,rgba(251,146,60,0.55) 0%,rgba(234,88,12,0.35) 50%,rgba(15,23,42,0.7) 100%)',
    accent:  '#FCD34D',
    glow:    'rgba(252,211,77,0.25)',
  }
  // 801–804 cloudy
  return {
    image:   'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600&q=80',
    overlay: 'linear-gradient(135deg,rgba(51,65,85,0.65) 0%,rgba(15,23,42,0.75) 100%)',
    accent:  '#94A3B8',
    glow:    'rgba(148,163,184,0.22)',
  }
}
