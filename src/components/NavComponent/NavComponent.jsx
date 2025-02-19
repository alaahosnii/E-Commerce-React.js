import React, { useContext } from 'react';
import './NavComponent.css';
import styles from './NavComponent.module.css';
import searchIcon from '../../assets/search_icon.png';
import loveIcon from '../../assets/love_icon.png';
import cartIcon from '../../assets/cart_icon.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeModeContext';
import { useSelector } from 'react-redux';

function NavComponent() {
  const { theme } = useContext(ThemeContext);
  const cartState = useSelector((state) => state.cart);
  const favoriteState = useSelector((state) => state.favorite);

  const navigate = useNavigate();
  return (
    <div className={`d-flex justify-content-between align-items-center ${theme == "dark" ? styles.navBarDark : styles.navBar}`}>
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
        <div className='btn position-relative' onClick={() => navigate("/wishlist")}>
          <img src={loveIcon} height={"16px"} width={"16px"} />
          <div class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {favoriteState.products.length}
          </div>
        </div>
        <div className='btn position-relative' onClick={() => navigate("/cart")}>
          <img src={cartIcon} height={"25px"} width={"25px"} />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartState.totalQuantity}
          </span>
        </div>
      </div>

    </div>
  )
}

export default NavComponent