import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';

function Main(props) {
  const { 
    isPreload, 
    getNews, 
    isSuccess, 
    errorMessage, 
    articles, 
    handleMoreCards, 
    articlesCounter, 
    handleSaveCards,
    handleDeleteArticle,
    loggedIn,
    handleLoginPopup,
  } = props;

  return (
    <main className="main">
      <SearchForm onSubmit={getNews} />
      {(isPreload) ? 
        <Preloader isSuccess={isSuccess} errorMessage={errorMessage} />
      : 
      (articles.length>0) ? 
        <NewsCardList 
          articles={articles} 
          handleMoreCards={handleMoreCards} 
          articlesCounter={articlesCounter}
          handleSaveCards={handleSaveCards}
          handleDeleteArticle={handleDeleteArticle}
          loggedIn={loggedIn}
          handleLoginPopup={handleLoginPopup}
        /> 
      : ''}
      <About />
    </main>
  );
}

export default Main;