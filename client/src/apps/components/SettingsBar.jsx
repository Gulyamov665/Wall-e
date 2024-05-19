import React, { useEffect } from 'react'
import styles from '../assets/static/SettingBar.module.css'

export default function SettingsBar({ children }) {
  return <div className={styles.sidebar}>{children}</div>
}
