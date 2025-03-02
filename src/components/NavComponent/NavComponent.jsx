import React, { useContext } from 'react';
import '@/components/NavComponent/NavComponent.css';
import styles from '@/components/NavComponent/NavComponent.module.css';
import searchIcon from '@/assets/search_icon.png';
import loveIcon from '@/assets/love_icon.png';
import cartIcon from '@/assets/cart_icon.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '@/contexts/ThemeModeContext';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from '@/assets/user_icon.png';
import { Dropdown } from 'react-bootstrap';
import logOutIcon from '@/assets/logout_icon.png';
import userNavIcon from '@/assets/user.png';
import { logoutUser } from '@/redux/slices/AuthSlice';
import { removeLocalCart } from '@/redux/slices/CartSlice';
import { removeLocalFavorite } from '@/redux/slices/FavoriteSlice';
function NavComponent() {
  const { theme } = useContext(ThemeContext);
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  console.log(cartState);

  // const { userCart, setUserCart } = useContext(ProductsInCartContext);


  const favoriteState = useSelector((state) => state.favorite);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    dispatch(removeLocalCart());
    dispatch(removeLocalFavorite());
  }

  return (
    <div className={`d-flex justify-content-between align-items-center ${authState.getLoggedInUserLoading && styles.blurLoading} ${theme == "dark" ? styles.navBarDark : styles.navBar}`}>
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
        {authState.user ?
          <li>
            <NavLink to="/Account" className={({ isActive }) => isActive ? styles.navActive : styles.navDefault}>Account</NavLink>
          </li> :
          authState.getLoggedInUserLoading ?
            <li>
              <p className='mb-0'>Loading</p>
            </li>
            :
            <li>
              <NavLink to="/signup" className={({ isActive }) => isActive ? styles.navActive : styles.navDefault}>Sign Up</NavLink>
            </li>
        }

      </ul>
      <div className='d-flex align-items-center gap-1'>
        <div className='position-relative'>
          <input type="text" placeholder='What are you looking for?' />
          <img src={searchIcon} className='searchImg' />
        </div>
        <div className='btn position-relative' onClick={() => navigate("/wishlist")}>
          <img src={loveIcon} height={"16px"} width={"16px"} />
          <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {favoriteState.products.length}
          </div>
        </div>
        <div className='btn position-relative' onClick={() => navigate("/cart")}>
          <img src={cartIcon} height={"25px"} width={"25px"} />
          <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartState.localCart.products.length}
          </div>
        </div>
        {authState.user &&

          <Dropdown align={"end"}>

            <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
              <img src={userIcon} height={"30px"} width={"30px"} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: "rgba(0, 0, 0, 0.04)", backdropFilter: "blur(20px)" }}>
              <Dropdown.Item className='custom-dropdown-item' style={{ color: "white" }}>
                <div className='d-flex align-items-center gap-4'>
                  <img src={userNavIcon} height={"30px"} width={"30px"} />
                  <p className='mb-0'>{authState.user.name}</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout} className='custom-dropdown-item' style={{ color: "white" }}>
                <div className='d-flex align-items-center gap-4'>
                  <img src={logOutIcon} height={"30px"} width={"30px"} />
                  <p className='mb-0'>Logout</p>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }

      </div>

    </div>
  )
}

export default NavComponent