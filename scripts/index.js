import {initialCards} from './cards.js';
import '../pages/index.css';
// @todo: Темплейт карточки
const template = document.getElementById('card-template').content;

// @todo: DOM узлы
const cardlist =  document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, deleteCard)  {
    const itemCard = template.querySelector('.places__item').cloneNode(true);
    const deleteBtn = itemCard.querySelector('.card__delete-button');
    const imageCard = itemCard.querySelector('.card__image');
    imageCard.src =item.link;
    imageCard.alt =item.name;
    itemCard.querySelector('.card__title').textContent = item.name;

    deleteBtn.addEventListener('click', deleteCard);

    return itemCard;
}

// @todo: Функция удаления карточки
function deleteCardCallback(evt) {
    evt.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement  = createCard(item, deleteCardCallback);
    cardlist.append(cardElement);
});

 