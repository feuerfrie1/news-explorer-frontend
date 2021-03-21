import React from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const { isOpen, onSubmit, onClose, success, linkToLogin } = props;
  const [isLogin, setIsLogin] = React.useState(true);

  const title = (isLogin) ? 'Вход' : 'Регистрация';
  const buttonSubmit = (isLogin) ? 'Войти' : 'Зарегистрироваться';
  const link = (isLogin) ? 'Зарегистрироваться' : 'Войти';

  function handleLink() {
    setIsLogin(!isLogin);
  }

  function handleLinkToLogin() {
    setIsLogin(true);
    linkToLogin();
  }

  function handleCloseByBackground(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    });
  }, [isOpen, onClose]);

  return (
    <div onClick={handleCloseByBackground} className={`popup ${(isOpen) ? "popup_opened" : ''}`}>
      <form id="popupWithForm" onSubmit={onSubmit} className="popup__container" noValidate method="post" action="#">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <h2 className="popup__title">{(success) ? 'Пользователь успешно зарегистрирован!' : title}</h2>
        {(success) ? <p onClick={handleLinkToLogin} className="popup__login-link">Войти</p> :
          <>
            <label className="popup__input-title" htmlFor="email">Email</label>
            <input 
              id="email" 
              className="popup__input" 
              type="email" name="email" 
              minLength="4" 
              maxLength="50" 
              required 
              placeholder="Введите почту"
            />
            <span className="popup__input-error" id="email-error">Неправильный формат email</span>
            <label className="popup__input-title" htmlFor="password">Пароль</label>
            <input 
              id="password" 
              className="popup__input" 
              type="password" 
              name="password" 
              minLength="2" 
              maxLength="100" 
              required 
              placeholder="Введите пароль"
              pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,20}"
            />
            <span className="popup__input-error" id="password-error">Неправильный формат пароля</span>
          </>
        }
        {(isLogin) ? '' :
          <>
            <label className="popup__input-title" htmlFor="name">Имя</label>
            <input 
              id="name" 
              className="popup__input" 
              type="text" 
              name="name" 
              minLength="2" 
              maxLength="30" 
              required 
              placeholder="Введите имя"
              pattern="[A-Za-zА-Яа-яЁё -]{2,40}"
            />
            <span className="popup__input-error" id="name-error">Неправильный формат имени</span>
          </>
        }
        {(success) ? '' :
          <>
            <span className="popup__submit-error" id="button-error">Такой пользователь уже есть</span>
            <button id="button" className="popup__submit" type="submit">{buttonSubmit}</button>
            <p className="popup__footer">или<span onClick={handleLink} className="popup__link">{link}</span></p>
          </>  
        }
      </form>
    </div>
  );
}

export default PopupWithForm;