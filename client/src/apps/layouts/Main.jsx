import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import SettingsBar from '../components/SettingsBar'
import {
  useLazyGetFilteredTasksQuery,
  useGetTasksQuery,
} from '../../store/request/taskApi'
import Header from '../pages/Header'

export default function Main({ children }) {
  const [getTasks, results] = useLazyGetFilteredTasksQuery()
  const { data } = useGetTasksQuery()

  return (
    <>
      <Header />
      <div>
        <SideBar />
        <SettingsBar data={data} />
        <div className="layoutChildren">
          {children}
          <br />
        </div>
      </div>
    </>
  )
}
