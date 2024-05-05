import React from 'react'
import SideBar from '../components/SideBar'
import SettingsBar from '../components/SettingsBar'
import { useGetTaskQuery } from '../../store/taskApi'

export default function Main({ children }) {
  const { data } = useGetTaskQuery(2)

  console.log(data)

  return (
    <>
      <div className="header"> Header </div>
      <div>
        <SideBar />
        <SettingsBar />
        <div className="layoutChildren">
          {children}
          <br />
          <button>Click</button>
        </div>
      </div>
    </>
  )
}
