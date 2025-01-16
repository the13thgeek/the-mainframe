import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getUserFromStorage } from "../utils/auth";
import './Navigation.scss';

const Navigation = () => {
  const user = getUserFromStorage();
    
  return (
    <nav className='global'>
      <ul className="nav-menu">
        <li>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : "" }>
          Dashboard
          </NavLink>
        </li>
        { user !== null && (
          <>
          <li>
            <NavLink to="/profile" className={({isActive}) => isActive ? "active" : "" }>
            Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={({isActive}) => isActive ? "active" : "" }>
            Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" className={({isActive}) => isActive ? "active" : "" }>
            Games
            </NavLink>
          </li>
          </>
        )}
        
        <li>
          <Link className='domain-link' to='https://the13thgeek.com' target='_blank'>
          the13thgeek.com <i className="fa-solid fa-up-right-from-square"></i>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation