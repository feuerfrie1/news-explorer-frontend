import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const { onSubmit } = props;
  const keyword = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(keyword.current.value);
  }

  React.useEffect(() => {
    const localKeyword = localStorage.getItem('keyword');

    if (localKeyword) {
      keyword.current.value = localKeyword;
    }
  })

  return (
    <section className="search">
      <div className="search__position">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form onSubmit={handleSubmit} className="search__form" method="post">
          <input
            ref={keyword}
            className="search__input" 
            type="text" 
            required 
            placeholder="Введите тему новости"
          ></input>
          <button className="search__submit" type="submit">Искать</button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;