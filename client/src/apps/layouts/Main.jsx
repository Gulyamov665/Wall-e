import React from 'react'
import SideBar from '../components/SideBar'
import { Header } from '../components/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useGetUsersQuery } from '../../store/request/usersApi'
import styles from '../assets/static/Main.module.css'

export default function Main({ children }) {
  const [auth] = useLocalStorage('', 'auth')
  const userId = auth && jwtDecode(auth)['user_id']
  const { data: userData } = useGetUsersQuery(userId)

  if (!auth) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header userData={userData} />
      <SideBar />
      <div className={styles['Children']}>
        {children}
        <br />
      </div>
    </>
  )
}
