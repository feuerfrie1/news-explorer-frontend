import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {
  const { isSavedNews } = props;

  return (
    <main className="saved-news">
      <SavedNewsHeader />
      <NewsCardList isSavedNews={isSavedNews} />
    </main>
  );
}

export default SavedNews;