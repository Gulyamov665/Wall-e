import React from 'react'
import SideBar from '../components/SideBar'
import { useLazyGetFilteredTasksQuery } from '../../store/request/taskApi'
import { Header } from '../components/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useGetUsersQuery } from '../../store/request/usersApi'

export default function Main({ children }) {
  const [getTasks, results] = useLazyGetFilteredTasksQuery()
  const [auth] = useLocalStorage('', 'auth')
  const userId = auth && jwtDecode(auth)['user_id']
  const { data: userData } = useGetUsersQuery(userId)

  if (!auth) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header userData={userData} />
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
