import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-fixed'>
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' style={{
            paddingLeft: '20px'
          }} className='brand-logo'>Agenda</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
