import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  const { 
    articles, 
    savedArticles, 
    handleMoreCards, 
    articlesCounter, 
    handleSaveCards,
    handleDeleteArticle,
    loggedIn,
    handleLoginPopup,
  } = props;
  let location = useLocation();
  let isSavedNews = location.pathname==='/saved-news' ? true : false;

  return (
    <section className="news-cards">
      {(isSavedNews) ? '' : <h2 className="news-cards__title">Результаты поиска</h2>}
      <ul className="news-cards__list">
        {((isSavedNews) ? savedArticles : articles).map((article, index) => (
          (index <= articlesCounter || isSavedNews) ? 
            <NewsCard 
              key={index} 
              article={article}
              isSavedNews={isSavedNews} 
              handleSaveCards={handleSaveCards}
              handleDeleteArticle={handleDeleteArticle}
              loggedIn={loggedIn}
              handleLoginPopup={handleLoginPopup}
            /> : null
        ))}
      </ul>
      {(isSavedNews || articlesCounter>=articles.length) ? '' : <button onClick={handleMoreCards} className="news-cards__show-more-button" type="button">Показать еще</button>}
    </section>
  );
}

export default NewsCardList;