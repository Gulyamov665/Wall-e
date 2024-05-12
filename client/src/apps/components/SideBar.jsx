import React from 'react'
import styles from '../assets/static/Sidebar.module.css'
import { Link } from 'react-router-dom'

export default function SideBar() {
  const items = [
    { name: 'Создать Очередь', link: '/create-task' },
    { name: 'Создать задачу' },
    { name: 'Просмотреть активные задачи' },
  ]
  return (
    <div>
      <aside className={styles.sidebar}>
        {items.map((elem) => (
          <Link key={elem.name} to={elem.link}>
            <ul>{elem.name}</ul>
          </Link>
        ))}
      </aside>
    </div>
  )
}
