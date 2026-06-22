/**
 * ErrorMessage.jsx
 * User-friendly error display with retry prompt.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { FiAlertCircle } from 'react-icons/fi'
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ message }) => (
  <motion.div
    className={`${styles.errorBox} glass-card`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    <div className={styles.iconWrap}>
      <FiAlertCircle className={styles.icon} />
    </div>
    <div className={styles.content}>
      <h4 className={styles.title}>Oops!</h4>
      <p className={styles.message}>{message}</p>
      <p className={styles.hint}>
        Try a city like <strong>Chennai</strong>, <strong>Bangalore</strong>, or <strong>Mumbai</strong>.
      </p>
    </div>
  </motion.div>
)

export default ErrorMessage
