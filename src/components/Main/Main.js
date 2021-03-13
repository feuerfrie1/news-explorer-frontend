import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';

function Main() {
  const [isPreload, setIsPreload] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);

  return (
    <main className="main">
      <SearchForm />
      {(isPreload) ? <Preloader isSuccess={isSuccess} /> : <NewsCardList />}
      <About />
    </main>
  );
}

export default Main;