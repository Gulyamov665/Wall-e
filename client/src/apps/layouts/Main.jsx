import React from 'react'
import SideBar from '../components/SideBar'
import { useLazyGetFilteredTasksQuery } from '../../store/request/taskApi'
import { Header } from '../pages/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Navigate } from 'react-router-dom'

export default function Main({ children }) {
  const [getTasks, results] = useLazyGetFilteredTasksQuery()

  const [auth] = useLocalStorage('', 'auth')

  if (!auth) {
    return <Navigate to="/" />
  }

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
