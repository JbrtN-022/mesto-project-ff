return fetch('https://nomoreparties.co/v1/cohort-23/cards', {
    headers: {
      authorization: 'a566fd8f-36df-4fe6-b8fd-4a4e5de77834'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });