import React, { useContext } from 'react';
import styles from './Header.module.css';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../../contexts/ThemeModeContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { languageContext } from '../../contexts/LanguageContext';
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(languageContext);
  const toggleThemeMode = () => {
    setTheme((currentTheme) => currentTheme == "light" ? "dark" : "light");
  }

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => currentLanguage == "English" ? "Arabic" : "English");
  }
  return (
    <div className={`${theme == "dark" ? styles.headerDark : styles.header} p-4 d-flex justify-content-between  align-items-center`}>
      <div className='w-100 d-flex justify-content-center'>
        <h6 className='fs-6 mb-0'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          ShopNow</h6>
      </div>

      <div className='me-5 d-flex'>
        <Dropdown>

          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {theme}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: "50px" }}>
            <Dropdown.Item onClick={toggleThemeMode}>Light</Dropdown.Item>
            <Dropdown.Item onClick={toggleThemeMode}>dark</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className='ms-3'>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {language}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: "100px" }}>
            <Dropdown.Item onClick={toggleLanguage}>English</Dropdown.Item>
            <Dropdown.Item onClick={toggleLanguage}>Arabic</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </div>
  )
}

export default Header