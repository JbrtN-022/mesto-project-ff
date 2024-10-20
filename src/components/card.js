export function createCard(template, cardData, cardHandlers, profileInfo) {
    const itemCard = template.querySelector('.card').cloneNode(true);
    const imageCard = itemCard.querySelector('.card__image');
    const deleteBtn = itemCard.querySelector('.card__delete-button');
    const likeBtn = itemCard.querySelector('.card__like-button');
    const titleCard = itemCard.querySelector('.card__title');
    const likeCounter =  itemCard.querySelector('.card__like-counter');
    imageCard.src = cardData.link;
    imageCard.alt = cardData.name;
    likeCounter.textContent = cardData.likes.length;
  
    
    if (cardData.likes.some((profile) => {
      return profile['_id'] === profileInfo['_id']
    })) {
        likeBtn.classList.add('card__like-button_is-active')
    }
  
    if (cardData.owner['_id'] === profileInfo['_id']) {
        deleteBtn.classList.add('card__delete-button_active');
        deleteBtn.addEventListener('click', () => {
        const confirmDeleteModal = cardHandlers.onOpenConfirmDeleteModal()
        const confirmButton = confirmDeleteModal.querySelector('.popup__button')
        confirmButton.addEventListener('click', (evt) => {
          cardHandlers.onDelete(cardData['_id'])
          .then(()=> {
            cardItem.remove();;
            cardHandlers.onCloseModal(confirmDeleteModal);
          })
          .catch((err) => {
            console.log(`Ошибка удаления карточки: ${err}`)
          })
        })
        
      });
    }
  
    likeBtn.addEventListener('click', () => {
      if (likeBtn.classList.contains('card__like-button_is-active')) {
        cardHandlers.onDeleteLike(cardData['_id'])
          .then((res) => {
            const likeCount = res.likes.length;
            handleLikeCard(likeBtn, likeCounter, likeCount)
          })
          .catch((err) => {
            console.log(`Ошибка удаления лайка: ${err}`)
          })
      } else {
        cardHandlers.onPutLike(cardData['_id'])
          .then((res) => {
            const likeCount = res.likes.length;
            handleLikeCard(likeBtn, likeCounter, likeCount)
          })
          .catch((err) => {
            console.log(`Ошибка постановки лайка: ${err}`)
          })
      }
    });
  
    itemCard.querySelector('.card__title').textContent = cardData.name;
  
    likeBtn.addEventListener('click', cardHandlers.onLike);
  
    imageCard.addEventListener('click', () => {
      cardHandlers.onOpenModal(cardData.link, cardData.name);
    });
  
    return itemCard;
  }
  
  function handleLikeCard(likeButton, likeCounter, count) {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = count;
  };