import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  const { isSavedNews } = props;
  const bookmarkIcon = "bookmark-icon";
  const trashcanIcon = "trashcan-icon";

  return (
    <>
      <li className="card">
        <img className="card__image" src="https://images.unsplash.com/photo-1610491537096-55f44f16834f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80" alt="картинка" />
        <div className="card__button-content">
          <button className={`card__button ${(isSavedNews) ? trashcanIcon : bookmarkIcon }`} type="button"></button>
          <span className="card__button-message">{(isSavedNews) ? 'Убрать из сохранённых' : 'Войдите, чтобы сохранять статьи'}</span>
        </div>
        <div className="card__text">
          <span className="card__date">2 августа, 2019</span>
          <h3 className="card__title">Национальное достояние – парки</h3>
          <p className="card__paragraph">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
          <a className="card__source" href="*">Лента.ру</a>
        </div>
        {(isSavedNews) ? <span className="card__keyword">Природа</span> : ''}
      </li>
    </>
  );
}

export default NewsCard;