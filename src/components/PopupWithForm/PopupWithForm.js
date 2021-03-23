import React from 'react';
import './PopupWithForm.css';
import { useFormWithValidation } from '../../utils/formValidator';
import * as MainApi from '../../utils/MainApi';

function PopupWithForm(props) {
  const { isOpen, onClose, getProfileInfo } = props;
  const [isLogin, setIsLogin] = React.useState(true);
  const [successRegistr, setSuccessRegistr] = React.useState(false);
  const [isSubmitError, setIsSubmitError] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState('');
  const [disabledState, setDisabledInput] = React.useState(false);

  const validate = useFormWithValidation();
  const title = (isLogin) ? 'Вход' : 'Регистрация';
  const buttonSubmit = (isLogin) ? 'Войти' : 'Зарегистрироваться';
  const link = (isLogin) ? 'Зарегистрироваться' : 'Войти';

  function clearErrors() {
    validate.resetForm();
    setIsSubmitError(false);
    setSuccessRegistr(false);
  }
  function handleLinkFooter() {
    setIsLogin(!isLogin);
    clearErrors();
  }
  function handleLinkToLogin() {
    setIsLogin(true);
    setSuccessRegistr(false);
  }
  function handleCloseByIcon() {
    onClose();
    setTimeout(() => {
      setIsLogin(true);
      clearErrors();
    }, 300);
  }
  function handleCloseByBackground(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
      setTimeout(() => {
        setIsLogin(true);
        clearErrors();
      }, 300);
    }
  }
  function handleSubmit(e) {
    setDisabledInput(true);
    e.preventDefault();
    const email = validate.values.email;
    const password = validate.values.password;
    const name = validate.values.name;

    (isLogin ?
    MainApi.authorize(email, password)
      .then(({ token }) => {
        if(token) {
          localStorage.setItem('token', token);
          getProfileInfo(token);
        }
      })
    :
    MainApi.register(email, password, name)
      .then((res) => {
        if(res) {
          setIsLogin(true);
          setSuccessRegistr(true);
        }
      })
    )
      .catch((err) => {
        setSubmitErrorMessage(err);
        setIsSubmitError(true);
      })
      .finally(() => setDisabledInput(false));
    setTimeout(() => validate.resetForm(), 500);
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setTimeout(() => {
          setIsLogin(true);
          validate.resetForm();
          setIsSubmitError(false);
          setSuccessRegistr(false);
        }, 300);
      }
    });
  }, [isOpen, onClose, validate]);

  return (
    <div onClick={handleCloseByBackground} className={`popup ${(isOpen) ? "popup_opened" : ''}`}>
      <form onSubmit={handleSubmit} id="popupWithForm" className="popup__container" noValidate>
        <button onClick={handleCloseByIcon} className="popup__close" type="button"></button>
        <h2 className="popup__title">{(successRegistr) ? 'Пользователь успешно зарегистрирован!' : title}</h2>
        {(successRegistr) ? <p onClick={handleLinkToLogin} className="popup__login-link">Войти</p> :
          <>
            <label className="popup__input-title" htmlFor="email">Email</label>
            <input 
              onChange={validate.handleChange}
              id="email" 
              className={`popup__input ${(validate.errors.email) ? 'popup__input_type_error' : ''}`} 
              type="email" 
              name="email" 
              minLength="4" 
              maxLength="50" 
              required 
              placeholder="Введите почту"
              value={validate.values.email || ''}
              disabled={disabledState}
            />
            <span className={`popup__input-error ${(validate.errors.email) ? 'popup__input-error_visible' : ''}`} id="email-error">Неправильный формат email</span>
            <label className="popup__input-title" htmlFor="password">Пароль</label>
            <input
              onChange={validate.handleChange} 
              id="password" 
              className="popup__input" 
              type="password" 
              name="password" 
              minLength="2" 
              maxLength="100" 
              required 
              placeholder="Введите пароль"
              pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,20}"
              value={validate.values.password || ''}
              disabled={disabledState}
            />
            <span className={`popup__input-error ${(validate.errors.password) ? 'popup__input-error_visible' : ''}`} id="password-error">Неправильный формат пароля</span>
          </>
        }
        {(isLogin) ? '' :
          <>
            <label className="popup__input-title" htmlFor="name">Имя</label>
            <input 
              onChange={validate.handleChange}
              id="name" 
              className="popup__input" 
              type="text" 
              name="name" 
              minLength="2" 
              maxLength="30" 
              required 
              placeholder="Введите имя"
              pattern="[A-Za-zА-Яа-яЁё -]{2,40}"
              value={validate.values.name || ''}
              disabled={disabledState}
            />
            <span className={`popup__input-error ${(validate.errors.name) ? 'popup__input-error_visible' : ''}`} id="name-error">Неправильный формат имени</span>
          </>
        }
        {(successRegistr) ? '' :
          <>
            <span className={`popup__submit-error ${(isSubmitError) ? 'popup__submit-error_visible' : ''}`} id="button-error">{submitErrorMessage}</span>
            <button className={`popup__submit ${(validate.isValid) ? '' : 'popup__submit_disabled'}`} disabled={(validate.isValid) ? false : true} type="submit">{buttonSubmit}</button>
            <p className="popup__footer">или<span onClick={handleLinkFooter} className="popup__link">{link}</span></p>
          </>  
        }
      </form>
    </div>
  );
}

export default PopupWithForm;