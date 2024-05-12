import React from 'react'
import styles from '../assets/static/SettingBar.module.css'
import MultiSelectCustom from './MultiSelect'

export default function SettingsBar({ data }) {
  return (
    <div className={styles.sidebar}>
      SettingsBar
      <MultiSelectCustom data={data} />
    </div>
  )
}
