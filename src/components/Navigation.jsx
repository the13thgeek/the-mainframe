import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
    
  return (
    <nav className='global'>
      <ul className="nav-menu">
        <li>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : "" }>
          Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({isActive}) => isActive ? "active" : "" }>
          Profile
          </NavLink>
        </li>
        <li>
          <Link to='https://the13thgeek.com' target='_blank'>
          the13thgeek.com
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation