import React, { useState } from 'react'
import styles from '../assets/static/Sidebar.module.css'
import { Link } from 'react-router-dom'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'

export default function SideBar() {
  const [menuIcons, setMenuIcons] = useState(false)
  const items = [
    {
      name: 'Создать Очередь',
      link: '/classification',
      icon: <EditCalendarOutlinedIcon fontSize="large" />,
    },
    {
      name: 'Создать задачу',
      link: '/create-task',
      icon: <AssignmentOutlinedIcon fontSize="large" />,
    },
    {
      name: 'Мои задачи',
      link: '/tasks',
      icon: <WorkOutlinedIcon fontSize="large" />,
    },
  ]
  return (
    <div>
      <aside className={styles.sidebar}>
        {items.map((elem) => (
          <Link className={styles.sidebar_link} key={elem.name} to={elem.link}>
            {!menuIcons ? (
              <p className={styles.menuName}>{elem.name}</p>
            ) : (
              <p className={styles.menuIcons}>
                {elem.icon && menuIcons && <span>{elem.icon}</span>}
              </p>
            )}
          </Link>
        ))}
        <button onClick={() => setMenuIcons(!menuIcons)}>menu</button>
      </aside>
    </div>
  )
}
