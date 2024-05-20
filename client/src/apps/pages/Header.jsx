import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Link } from 'react-router-dom'

function Header() {
  const startContent = <React.Fragment></React.Fragment>

  const centerContent = (
    <div className="flex flex-wrap align-items-center gap-3">
      <Link to={'/main'}>
        <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
          <i className="pi pi-home text-2xl"></i>
        </button>
      </Link>
      <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-user text-2xl"></i>
      </button>
      <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-search text-2xl"></i>
      </button>
    </div>
  )

  const endContent = (
    <React.Fragment>
      <div className="flex align-items-center gap-2">
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
        <span className="font-bold text-bluegray-50">Amy Elsner</span>
      </div>
    </React.Fragment>
  )

  return (
    <Toolbar
      start={startContent}
      center={centerContent}
      end={endContent}
      className="custom"
    />
  )
}

export { Header }
