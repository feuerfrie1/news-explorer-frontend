import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const { savedArticles } = props;
  const currentUser = React.useContext(CurrentUserContext);

  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }
  function keywordCount() {
    let result = '';
    const keywords = savedArticles.map((art) => art.keyword)
    .reduce((acc, key) => {
      acc[key] = acc[key] === undefined ? 1 : acc[key] += 1;
      return acc;
    }, {});
    const sortedKey = Object.keys(keywords).map((key) => {
      return [key, keywords[key]];
    }).sort((a, b) => b[1] - a[1]).map((item) => item[0]);
    if (sortedKey.length < 3) {
      result = sortedKey.join(', ');
    } else if (sortedKey.length === 3) {
      sortedKey[2] = `и ${sortedKey[2]}`;
      result = sortedKey.join(', ');
    } else {
      result = `${sortedKey[0]}, ${sortedKey[1]}, и ${sortedKey.length-2}-м другим`;
    }
    return result;
  }
  const savedText = declOfNum(savedArticles.length, ['сохранённая статья', 'сохранённые статьи', 'сохранённых статей']);
  const popularKeywords = keywordCount();

  return (
    <section className="saved-header">
      <h3 className="saved-header__title">Сохранённые статьи</h3>
      <p className="saved-header__subtitle">{`${currentUser.name}, у вас ${savedArticles.length} ${savedText}`}</p>
      {(savedArticles.length>0) ? 
        <p className="saved-header__paragraph">По ключевым словам: <span className="saved-header__paragraph_bold">{popularKeywords}</span></p>
      : null}
    </section>
  );
}

export default SavedNewsHeader;