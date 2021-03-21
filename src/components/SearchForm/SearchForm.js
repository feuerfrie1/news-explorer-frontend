import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return (
    <section className="search">
      <div className="search__position">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className="search__form" method="post">
          <input className="search__input" type="text" placeholder="Введите тему новости"></input>
          <button className="search__submit">Искать</button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;