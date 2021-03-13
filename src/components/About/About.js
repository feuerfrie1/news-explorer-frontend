import React from 'react';
import './About.css';
import avatarDefault from '../../images/avatar/avatar-default.png';

function About() {
  return (
    <section className="about">
      <img className="about__avatar" src={avatarDefault} alt="аватар по-умолчанию" />
      <div className="about__about-me">
        <h3 className="about__title">Об авторе</h3>
        <p className="about__text">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
        <p className="about__text">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
      </div>
    </section>
  );
}

export default About;