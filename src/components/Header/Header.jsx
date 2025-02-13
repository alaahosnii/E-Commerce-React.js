import React, { useContext } from 'react';
import styles from './Header.module.css';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../../contexts/ThemeModeContext';
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleThemeMode = () => {
    setTheme((currentTheme) => currentTheme == "light" ? currentTheme = "dark" : "light");
  }
  return (
    <div className={`${theme == "dark" ? styles.headerDark : styles.header}  d-flex justify-content-between  align-items-center`}>
      <div className='w-100 d-flex justify-content-center'>
        <h6 className='fs-6 mb-0'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          ShopNow</h6>
      </div>

      <div className='me-5 d-flex'>
        <Button onClick={toggleThemeMode} className={`${theme == "dark" ? styles.languageBtnDark : styles.languageBtn} d-flex align-items-center ms-5`}>
          {theme}
        </Button>
        <Button className={`${styles.languageBtn} bg-white text-black d-flex align-items-center ms-5`}>
          English
        </Button>
      </div>

    </div>
  )
}

export default Header