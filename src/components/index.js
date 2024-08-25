import { openModal, closeModal } from '../components/modal.js';
import { initialCards } from './cards.js';
import '../pages/index.css';

// @todo: Темплейт карточки
const template = document.getElementById('card-template').content;

// @todo: DOM узлы
const cardlist = document.querySelector('.places__list');
const buttonEdd = document.querySelector('.profile__edit-button');
const popupTypeEdd = document.querySelector('.popup_type_edit')

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
    const itemCard = template.querySelector('.places__item').cloneNode(true);
    const deleteBtn = itemCard.querySelector('.card__delete-button');
    const imageCard = itemCard.querySelector('.card__image');
    imageCard.src = item.link;
    imageCard.alt = item.name;
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
    const cardElement = createCard(item, deleteCardCallback);
    cardlist.append(cardElement);
});

// @todo: like на карточке
const likeCard = cardlist.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
});

// @todo: открытие картинок



buttonEdd.addEventListener('click', () => {openModal(popupTypeEdd)} );
document.addEventListener('click', closeModal);