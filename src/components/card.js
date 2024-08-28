import { template } from "./index.js";
// @todo: Функция удаления карточки
export function deleteCardCallback(evt) {
    evt.target.closest('.places__item').remove();
}

// @todo: like на карточке 
export function likeCardCallback(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
};

// @todo: Функция создания карточки
export function createCard(item, deleteCardCallback, likeCardCallback) {
    const itemCard = template.querySelector('.places__item').cloneNode(true);

    const imageCard = itemCard.querySelector('.card__image');
    const deleteBtn = itemCard.querySelector('.card__delete-button');
    const likeBtn = itemCard.querySelector('.card__like-button');
    const titleCard = itemCard.querySelector('.card__title');
    imageCard.src = item.link;
    imageCard.alt = item.name;

    titleCard.textContent = item.name;

    deleteBtn.addEventListener('click', deleteCardCallback);
    likeBtn.addEventListener('click', likeCardCallback);

    return itemCard
}
