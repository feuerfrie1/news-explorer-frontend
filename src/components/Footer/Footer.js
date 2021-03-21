import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import github from '../../images/icon/github.svg';
import facebook from '../../images/icon/fb.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <ul className="footer__list footer__list_links">
          <li>
            <NavLink className="footer__link" to="/">Главная</NavLink>
          </li>
          <li>
            <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank"  rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className="footer__list footer__list_social">
          <li>
            <a className="footer__link" href="https://github.com/feuerfrie1" target="_blank"  rel="noopener noreferrer">
              <img className="footer__icons" src={github} alt="github" />
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://www.facebook.com/" target="_blank"  rel="noopener noreferrer">
              <img className="footer__icons" src={facebook} alt="facebook" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;