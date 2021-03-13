import React from 'react';
import './Preloader.css';

function Preloader(props) {
  const { isSuccess } = props;
  
  return (
    <div className="preloader">
      <i className={(isSuccess) ? "preloader__icon" : "not-found-icon"}></i>
      {(isSuccess) ? '' : <h4 className="preloader__title">Ничего не найдено</h4>}
      <p className="preloader__message">{(isSuccess) ? 'Идет поиск новостей...' : 'К сожалению по вашему запросу ничего не найдено.'}</p>
    </div>
  );
}

export default Preloader;