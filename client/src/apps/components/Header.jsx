import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from '@mui/base/Dropdown'
import { MenuButton } from '@mui/base/MenuButton'
import { Menu } from '@mui/base/Menu'
import { MenuItem } from '@mui/base/MenuItem'
import { styled } from '@mui/system'

function Header({ userData = [] }) {
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  }

  const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 16px;
    list-style: none;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: #1C2025;
    border: 1px solid blueviolet;
    color: #F3F6F9;
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
    z-index: 1;
    `
  )
  const startContent = (
    <React.Fragment>
      <div className="flex align-items-center">
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
        <span className="font-bold text-bluegray-50">Amy Elsner</span>
      </div>
    </React.Fragment>
  )

  const centerContent = (
    <div className="flex flex-wrap align-items-center ">
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
      <div className="flex align-items-center ">
        <Dropdown>
          <MenuButton>
            <Avatar image={userData.avatar} shape="circle" size="large" />
          </MenuButton>
          <Menu slots={{ listbox: Listbox }}>
            <MenuItem style={{ cursor: 'pointer' }}>Profile</MenuItem>
            <MenuItem style={{ cursor: 'pointer' }}>Language settings</MenuItem>
            <MenuItem style={{ cursor: 'pointer' }} onClick={logOut}>
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
        <span className="font-bold text-bluegray-50 ps-2">
          {userData.first_name} {userData.last_name}
        </span>
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
