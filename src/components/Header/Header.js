import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const { isSavedNews, handleLoginPopup, isPopupOpened, loggedIn } = props;
  const headerElement = React.createRef();
  const [headerWidth, setHeaderWidth] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const title = (isSavedNews) ? 'header__title_theme_dark' : '';

  function handleMenu() {
    if (headerWidth<=670) {
      setIsMenuOpen(!isMenuOpen);
    }
  }

  React.useEffect(() => {
    window.onresize = () => setHeaderWidth(headerElement.current.parentElement.clientWidth);
    setHeaderWidth(headerElement.current.parentElement.clientWidth);
  }, [headerElement]);

  return (
    <header ref={headerElement} className="header">
      <NavLink className={`header__title ${(isSavedNews && !isMenuOpen) ? title : ''}`} to="/">NewsExplorer</NavLink>
      {(isPopupOpened) ? '' : <button onClick={handleMenu} className={`header__menu ${(isMenuOpen) ? "icon-close" : (isSavedNews) ? "icon-menu-dark" : "icon-menu"}`}></button>}
      <Navigation 
        closeMenu={handleMenu}
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