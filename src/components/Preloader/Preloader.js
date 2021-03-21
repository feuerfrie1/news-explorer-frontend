import React from 'react';
import './Preloader.css';

function Preloader(props) {
  const { isSuccess, errorMessage } = props;
  const message = isSuccess ? 'Идет поиск новостей...' : 'К сожалению по вашему запросу ничего не найдено.';
  const errorText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
  
  return (
    <div className="preloader">
      <i className={(isSuccess) ? "preloader__icon" : "not-found-icon"}></i>
      {(isSuccess) ? '' : <h4 className="preloader__title">Ничего не найдено</h4>}
      <p className="preloader__message">{(errorMessage) ? errorText : message}</p>
    </div>
  );
}

export default Preloader;