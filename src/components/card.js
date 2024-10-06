import { template, modalOpenImage} from "./index.js";
import {addLikeCard,removeCard} from "./api.js"
// @todo: Функция удаления карточки

export function deleteCardCallback(event) {
  const deletedCard = event.target.closest(".card");
  removeCard(deletedCard.id)
    .then(deletedCard.remove())
    .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
}

// @todo: like на карточке 
/*export function likeCardCallback(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
};*/

export function likeCardCallback(likeButton, cardNode) {
  const isMyLikeOnCard = likeButton.classList.contains(
    "card__like-button_is-active"
  );

  const cardId = cardNode.id;
  const likeCountNode = cardNode.querySelector(".like-button__count");

  if (!isMyLikeOnCard) {
    addLikeCard(cardId, false)
      .then((result) => {
        likeButton.classList.add("card__like-button_is-active");
        const likeCount = result.likes.length || 0;
        likeCountNode.textContent = likeCount;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else if (isMyLikeOnCard) {
    addLikeCard(cardId, true)
      .then((result) => {
        likeButton.classList.remove("card__like-button_is-active");
        const likeCount = result.likes.length || 0;
        likeCountNode.textContent = likeCount;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
}

// @todo: Функция создания карточки



export function createCard(
  item,
  { deleteCard, likeCard, openImageCard, userId }
) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardDeleteButton.addEventListener("click", deleteCard);
  cardElement.id = item._id;

  if (item.owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  const openModal = () => openImageCard(item);
  setPopupOpenEventListener(cardImage, modalOpenImage, openModal);

  const likeCount = item.likes.length || 0;
  const likeCountNode = cardElement.querySelector(".like-button__count");
  likeCountNode.textContent = likeCount;

  const likeButtonNode = cardElement.querySelector(".card__like-button");
  likeButtonNode.addEventListener("click", () =>
    likeCard(likeButtonNode, cardElement)
  );

  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButtonNode.classList.add("card__like-button_is-active");
  }

  return cardElement;
}
