import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  return (
    <section className="saved-header">
      <h3 className="saved-header__title">Сохранённые статьи</h3>
      <p className="saved-header__subtitle">Грета, у вас 5 сохранённых статей</p>
      <p className="saved-header__paragraph">По ключевым словам: <span className="saved-header__paragraph_bold">Природа, Тайга и 2-м другим</span></p>
    </section>
  );
}

export default SavedNewsHeader;