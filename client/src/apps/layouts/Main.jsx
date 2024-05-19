import React from 'react'
import SideBar from '../components/SideBar'
import { useLazyGetFilteredTasksQuery } from '../../store/request/taskApi'
import { Header } from '../pages/Header'

export default function Main({ children }) {
  const [getTasks, results] = useLazyGetFilteredTasksQuery()

  return (
    <>
      <Header />
      <div>
        <SideBar />
        <div className="layoutChildren">
          {children}
          <br />
        </div>
      </div>
    </>
  )
}
