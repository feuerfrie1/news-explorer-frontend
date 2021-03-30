const BASE_URL = 'https://api.feuerfrie.students.nomoredomains.work';

export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(data.message || 'Ошибка'));
    });
  };
  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(data.message || 'пользователь с email не найден'));
    });
  };
  export const getUser = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(`${res.status} - ${data.message || 'токен не передан или передан не в том формате'}`));
    });
  };
  export const saveCard = (token, keyword, title, text, date, source, link, image) => {
    return fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ keyword, title, text, date, source, link, image })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(`${res.status} - ${data.message || 'Ошибка'}`));
    });
  };
  export const getSavedArticles = (token) => {
    return fetch(`${BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(`${res.status} - ${data.message || 'Ошибка'}`));
    });
  };
  export const deleteArticle = (token, articleId) => {
    return fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(`${res.status} - ${data.message || 'Ошибка'}`));
    });
  };