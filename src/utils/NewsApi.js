export const getNews = (keyword) => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    let sevenDaysAgo = date.toISOString().split('T')[0];
    let today = new Date().toISOString().split('T')[0];
  
    // top-headlines?country=ru&
    return fetch(`http://newsapi.org/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&pageSize=100`, {
      headers: {
        'Authorization': '34ceeab43962458b8c6f003e2810e018',
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };