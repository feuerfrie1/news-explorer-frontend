import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  const { isSavedNews } = props;
  const cards = (isSavedNews) ? [1, 2, 3, 4, 5] : [1, 2, 3];

  return (
    <section className="news-cards">
      {(isSavedNews) ? '' : <h2 className="news-cards__title">Результаты поиска</h2>}
      <ul className="news-cards__list">
        {cards.map((number) => (
          <NewsCard key={number} isSavedNews={isSavedNews} />
        ))}
      </ul>
      {(isSavedNews) ? '' : <button className="news-cards__show-more-button" type="button">Показать еще</button>}
    </section>
  );
}

export default NewsCardList;