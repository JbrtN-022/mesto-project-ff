const config = {
    baseUrl:'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: 'a566fd8f-36df-4fe6-b8fd-4a4e5de77834',
      "Content-Type": "application/json",
    },
  };
  function checkResponse (res) {
    if (res.ok){
        console.log(res.json())
        return res.json();
    } else {
    return Promise.reject(`ошибка ${res.status}`);
    }
  };


  export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      })
      .then(checkResponse);
  }

  
  export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      })
      .then(checkResponse);
  }

  export const updateUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method : 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
      })
      .then(checkResponse);
  };

  export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(name, link),
    }).then(checkResponse);
  };
  
  export const removeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  };
  

  export const updateAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };

  export const addLikeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: config.headers,
    }).then(checkResponse);
  };
  

