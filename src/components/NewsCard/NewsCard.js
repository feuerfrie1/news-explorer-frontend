import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  const { isSavedNews, article, handleSaveCards, handleDeleteArticle, loggedIn, handleLoginPopup } = props;
  const { image, date, title, link, text, source, keyword } = article;
  const bookmarkIcon = (article._id && loggedIn) ? "bookmark-marked-icon" : "bookmark-icon";
  const trashcanIcon = "trashcan-icon";
  const buttonMessage = (loggedIn && !article._id) ? 'Сохранить статью' : 'Войдите, чтобы сохранять статьи';
 
  function formatDate(dataStr) {
    const defaultData = new Date(dataStr);
    const data = `${defaultData.toLocaleString("ru", { month: 'long', day: 'numeric' })}, ${defaultData.getFullYear()}`;
    return data;
  }
  function handleIconClick() {
    if (!loggedIn) {
      handleLoginPopup();
    } else if (!article._id && !isSavedNews) {
      handleSaveCards(keyword, title, text, date, source, link, image);
    } else {
      handleDeleteArticle(article._id);
    }
  }
  return (
    <>
      <li className="card">
        <img className="card__image" src={image} alt="картинка" />
        <div className="card__button-content">
          <button onClick={handleIconClick} className={`card__button ${(isSavedNews) ? trashcanIcon : bookmarkIcon }`} type="button" ></button>
          <span className="card__button-message">{(isSavedNews || (article._id && loggedIn)) ?  'Убрать из сохранённых' : buttonMessage }</span>
        </div>
        <div className="card__text">
          <span className="card__date">{formatDate(date)}</span>
          <h3 className="card__title">{title}</h3>
          <p className="card__paragraph">{text}</p>
          <a className="card__source" href={link}>{source}</a>
        </div>
        {(isSavedNews) ? <span className="card__keyword">{keyword}</span> : ''}
      </li>
    </>
  );
}

export default NewsCard;