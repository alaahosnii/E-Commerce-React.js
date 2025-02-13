import React, { useContext } from 'react';
import './NavComponent.css';
import styles from './NavComponent.module.css';
import searchIcon from '../../assets/search_icon.png';
import loveIcon from '../../assets/love_icon.png';
import cartIcon from '../../assets/cart_icon.png';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeModeContext';
function NavComponent() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`p-4 d-flex justify-content-between align-items-center ${theme == "dark" ? styles.navBarDark : styles.navBar}`}>
      <h1>Exclusive</h1>
      <ul className={`d-flex fs-6`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.navActive : styles.navDefault}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/Contact" className={({ isActive }) => isActive ? styles.navActive : styles.navDefault}>Contact</NavLink>

        </li>
        <li>
          <NavLink to="/About" className={({ isActive }) => isActive ? styles.navActive : styles.navDefault}>About</NavLink>
        </li>
        <li>Sign Up</li>
      </ul>
      <div className='d-flex align-items-center gap-3'>
        <div className='position-relative'>
          <input type="text" placeholder='What are you looking for?' />
          <img src={searchIcon} className='searchImg' />
        </div>
        <img src={loveIcon} height={"16px"} width={"16px"} />
        <img src={cartIcon} height={"25px"} width={"25px"} />
      </div>

    </div>
  )
}

export default NavComponent