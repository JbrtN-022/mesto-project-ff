const config = {
    baseUrl:'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: 'a566fd8f-36df-4fe6-b8fd-4a4e5de77834',
      "Content-Type": "application/json",
    },
  };
  
  function checkResponse (res) {
    if (res.ok){
        return res.json();
    } else {
    return Promise.reject(`ошибка ${res.status}`);
    }
  };


  export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      })
      .then(checkResponse)
      .catch((error) => {
        console.log(error); 
      });
  }

  
  export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      })
      .then(checkResponse)
      .catch((error) => {
        console.log(error); 
      });
  }

  export const updateUser = ({name, about}) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method : 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about,
      }),
      })
      .then(checkResponse)
      .catch((error) => {
        console.log(error); 
      });
  };

  export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(name, link),
    })
    .then(checkResponse)
    .catch((error) => {
      console.log(error);
    });
  };
  
  export const removeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then(checkResponse)
    .catch((error) => {
      console.log(error); 
    });
  };
  

  export const updateAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(data),
    })
    .then(checkResponse)
    .catch((error) => {
      console.log(error);
    });
  };

  
  export function addLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    }).then((res) => {
      return checkResponse(res);
    });
  }
  
  export function deleteLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then((res) => {
      return checkResponse(res);
    });
  }

