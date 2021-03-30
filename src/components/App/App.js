import React from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import * as NewsApi from '../../utils/NewsApi';
import * as MainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isPopupWithFormOpened, setIsPopupWithFormOpened] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isPreload, setIsPreload] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [articlesCounter, setArticlesCounter] = React.useState(2);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const history = useHistory();
  
  function handleLoginPopup() {
    setIsPopupWithFormOpened(true);
  }
  function closeAllPopups() {
    setIsPopupWithFormOpened(false);
  }
  function signOut() {
    setCurrentUser({});
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }
  function processingArticles(news, savedArticles) {
    const processedArticles = news.map((art) => {
      savedArticles.find((item) => {
        if(art.link === item.link && art.title === item.title && art.text === item.text) {
          return art._id = item._id;
        }
        else if (art._id !== item._id) {
          delete art._id;
        }
        return null;
      })
      return art;
    });
    setArticles(processedArticles);
  }
  function getProfileInfo(token) {
    const localArticles = JSON.parse(localStorage.getItem('articles'));

    Promise.all([MainApi.getUser(token), MainApi.getSavedArticles(token)])
    .then(([user, savedArticles]) => {
      if (localArticles) {
        processingArticles(localArticles, savedArticles);
      }
      setCurrentUser(user);
      setSavedArticles(savedArticles);
      setLoggedIn(true);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }
  function processingSaveArticle(savedArt) {
    const processedArticles = articles.map((art) => {
      if (art.link === savedArt.link && art.title === savedArt.title && art.text === savedArt.text) {
        art._id = savedArt._id;
      }
      return art;
    })
    setArticles(processedArticles);
  }
  function processingDeleteArticle(deletedArtId) {
    const processedArticles = articles.map((art) => {
      if (art._id === deletedArtId) {
        delete art._id;
      }
      return art;
    })
    setArticles(processedArticles);
  }
  function successRequest(news, keyword) {
    setErrorMessage(false);
    const result = news.articles.map((art) => {
      const article = {
        keyword: keyword,
        title: art.title,
        text: art.description,
        date: art.publishedAt,
        source: art.source?.name || art.author || '',
        link: art.url,
        image: art.urlToImage,
      };
      return article;
    });
    localStorage.setItem('articles', JSON.stringify(result));
    processingArticles(result, savedArticles);
    setIsPreload(false);
  }
  function getNews(keyword) {
    setIsSuccess(true);
    setIsPreload(true);
    setArticlesCounter(2);
    localStorage.setItem('keyword', keyword);
    NewsApi.getNews(keyword)
    .then((news) => (news.status === 'ok' && news.totalResults) ? successRequest(news, keyword) : notFoundRequest())
    .catch((err) => {
      setErrorMessage(true);
      setIsSuccess(false);
      console.log(err);
    });
  }
  function notFoundRequest() {
    setErrorMessage(false);
    setIsSuccess(false);
  }
  function handleMoreCards() {
    if (articlesCounter < articles.length) {
      setArticlesCounter(articlesCounter + 3);
    }
  }
  function handleSaveCards(keyword, title, text, date, source, link, image) {
    const token = localStorage.getItem('token');
    if (token) {
      MainApi.saveCard(token, keyword, title, text, date, source, link, image)
      .then((res) => {
        setSavedArticles([...savedArticles, res]);
        processingSaveArticle(res);
      })
      .catch((err) => console.log(err));
    }
  }
  function handleDeleteArticle(articleId) {
    const token = localStorage.getItem('token');
    if (token) {
      MainApi.deleteArticle(token, articleId)
      .then(() => {
        const newSavedArticles = savedArticles.filter((art) => art._id !== articleId);
        setSavedArticles(newSavedArticles);
        processingDeleteArticle(articleId);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log(articles));
    }
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');

      if (token) {
        getProfileInfo(token);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          signOut={signOut}
          handleLoginPopup={handleLoginPopup}
          loggedIn={loggedIn}
          isPopupOpened={isPopupWithFormOpened} 
        />
        <Switch>
          <ProtectedRoute 
            path="/saved-news" 
            loggedIn={loggedIn}
            savedArticles={savedArticles} 
            handleDeleteArticle={handleDeleteArticle} 
            component={SavedNews}
            handleLoginPopup={handleLoginPopup}
          />
          <Route path="/">
            <Main
              isPreload={isPreload}
              getNews={getNews}
              isSuccess={isSuccess}
              errorMessage={errorMessage}
              articles={articles}
              handleMoreCards={handleMoreCards}
              articlesCounter={articlesCounter}
              handleSaveCards={handleSaveCards}
              handleDeleteArticle={handleDeleteArticle}
              loggedIn={loggedIn}
              handleLoginPopup={handleLoginPopup}
            />
            <PopupWithForm 
              isOpen={isPopupWithFormOpened}
              onClose={closeAllPopups}
              getProfileInfo={getProfileInfo}
            />
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;