import React from 'react'
import styles from '../assets/static/Sidebar.module.css'
import { Link } from 'react-router-dom'

export default function SideBar() {
  const items = [
    { name: 'Создать Очередь', link: '/classification' },
    { name: 'Создать задачу', link: '/create-task' },
    { name: 'Мои задачи', link: '/tasks' },
  ]
  return (
    <div>
      <aside className={styles.sidebar}>
        {items.map((elem) => (
          <Link className={styles.sidebar_link} key={elem.name} to={elem.link}>
            <p>{elem.name}</p>
          </Link>
        ))}
      </aside>
    </div>
  )
}
