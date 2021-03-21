import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import logoutIcon from '../../images/icon/logout.svg';
import logoutIconDark from '../../images/icon/logout-dark.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const { closeMenu, isMenuOpen, isSavedNews, loggedIn, handleLoginPopup, signOut } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const linkDark = isSavedNews ? "nav__link_theme_dark": '';
  const logoutDark = isSavedNews ? "nav__logout_theme_dark" : '';
  const activeLightLink = isSavedNews ? '' : "nav__link_active_light";
  const activeDarkLink = isSavedNews ? "nav__link_active_dark" : '';
  
  function handleLoginSignOut() {
    loggedIn ? signOut() : handleLoginPopup();
  }

  return (
    <nav className={`nav ${(isMenuOpen ? 'nav_opened' : '')}`}>
      <NavLink onClick={closeMenu} className={`nav__link ${(isSavedNews && !isMenuOpen) ? linkDark : ''}`} activeClassName={activeLightLink} to="/">Главная</NavLink>
      {(loggedIn) ? <NavLink onClick={closeMenu} className={`nav__link ${(isSavedNews && !isMenuOpen) ? linkDark : ''}`} activeClassName={activeDarkLink} to="/saved-news">Сохранённые статьи</NavLink> : ''}
      <button onClick={handleLoginSignOut} type="button" className={`nav__logout ${(isSavedNews && !isMenuOpen) ? logoutDark : ''}`}>
        <span className="nav__logout-user">{(loggedIn) ? currentUser.name : 'Авторизоваться'}</span>
        {(loggedIn) ? <img className="nav__logout-icon" src={(isSavedNews && !isMenuOpen) ? logoutIconDark : logoutIcon} alt="Выход" /> : ''}
      </button>
    </nav>
  );
}

export default Navigation;