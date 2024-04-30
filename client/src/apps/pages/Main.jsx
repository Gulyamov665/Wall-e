import React from 'react'
import SideBar from '../components/SideBar'
import SettingsBar from '../components/SettingsBar'

export default function Main({ children }) {
  return (
    <>
      <div className="header"> Header </div>
      <div>
        <SideBar />
        <SettingsBar />
        <div className='layoutChildren'>
          {children}
          <br />
          <button>Click</button>
        </div>
      </div>
    </>
  )
}
