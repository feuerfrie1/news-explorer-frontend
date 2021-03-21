import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function App() {
  const [isPopupWithFormOpened, setIsPopupWithFormOpened] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [successRegistr, setSuccessRegistr] = React.useState(false);

function handleLinkToLogin() {
    setSuccessRegistr(false);
  }

function handleLoginPopup() {
    setIsPopupWithFormOpened(true);
}

function closeAllPopups() {
    setIsPopupWithFormOpened(false);
  }
  
  return (
    <>
      <Switch>
        <Route path="/saved-news">
          <Header 
            isSavedNews={true}
            handleLoginPopup={handleLoginPopup}
            loggedIn={loggedIn}
            isPopupOpened={isPopupWithFormOpened} 
          />
          <SavedNews isSavedNews={true} />
        </Route>
        <Route path="/">
          <Header 
            handleLoginPopup={handleLoginPopup} 
            loggedIn={loggedIn} 
            isPopupOpened={isPopupWithFormOpened} 
          />
          <Main />
          <PopupWithForm 
            isOpen={isPopupWithFormOpened}
            onClose={closeAllPopups}
            success={successRegistr}
            linkToLogin={handleLinkToLogin}
          />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
