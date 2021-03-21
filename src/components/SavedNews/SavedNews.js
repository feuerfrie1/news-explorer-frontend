import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {
  const { savedArticles, handleDeleteArticle, loggedIn } = props;

  return (
    <main className="saved-news">
      <SavedNewsHeader savedArticles={savedArticles} />
      {(savedArticles.length > 0) ? <NewsCardList savedArticles={savedArticles} handleDeleteArticle={handleDeleteArticle} loggedIn={loggedIn} /> : null}
    </main>
  );
}

export default SavedNews;