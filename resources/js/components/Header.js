import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

    const Header = () => (
      <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>Caffeine App</Link>
          <Link className='navbar-brand' to='/logout'>Logout</Link>
   
        </div>
      </nav>
    )

export default Header