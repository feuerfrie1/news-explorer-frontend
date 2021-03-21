import React from 'react';
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const { handleLoginPopup, isPopupOpened, loggedIn, signOut } = props;
  let location = useLocation();
  let isSavedNews = location.pathname==='/saved-news' ? true : false;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const title = (isSavedNews) ? 'header__title_theme_dark' : '';

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="header">
      <NavLink className={`header__title ${(isSavedNews && !isMenuOpen) ? title : ''}`} to="/">NewsExplorer</NavLink>
      {(isPopupOpened) ? '' : <button onClick={handleMenu} className={`header__menu ${(isMenuOpen) ? "icon-close" : (isSavedNews) ? "icon-menu-dark" : "icon-menu"}`}></button>}
      <Navigation
        signOut={signOut} 
        closeMenu={handleCloseMenu}
        isMenuOpen={isMenuOpen}
        isSavedNews={isSavedNews}
        loggedIn={loggedIn}
        handleLoginPopup={handleLoginPopup}
      />
      {(isMenuOpen) ? <div onClick={handleMenu} className="header__backsheet"></div> : ''}
    </header>
  );
}

export default Header;