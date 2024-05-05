import React from 'react'
import styles from '../assets/static/Sidebar.module.css'

export default function SideBar() {
  const items = [
    { name: 'Создать Очередь' },
    { name: 'Создать задачу' },
    { name: 'Просмотреть активные задачи' },
  ]
  return (
    <div>
      <aside className={styles.sidebar}>
        {items.map((elem) => (
          <ul key={elem.name}>{elem.name}</ul>
        ))}
      </aside>
    </div>
  )
}
