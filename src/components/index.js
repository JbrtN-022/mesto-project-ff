import { openModal, closeModal } from '../components/modal.js';
import { initialCards } from './cards.js';
import { likeCardCallback , deleteCardCallback} from './card.js';
import '../pages/index.css';

// @todo: Темплейт карточки
const template = document.getElementById('card-template').content;

// @todo: DOM узлы
const cardlist = document.querySelector('.places__list');
const buttonEdd = document.querySelector('.profile__edit-button');
const buttonAdProfile = document.querySelector('.profile__add-button');
const popupTypeEdd = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');


// @todo: Функция создания карточки
function createCard(item, deleteCardCallback, likeCardCallback) {
    const itemCard = template.querySelector('.places__item').cloneNode(true);

    const imageCard = itemCard.querySelector('.card__image');
    const deleteBtn = itemCard.querySelector('.card__delete-button');
    const likeBtn = imageCard.querySelector('.card__like-button');

    imageCard.src = item.link;
    imageCard.alt = item.name;

    itemCard.querySelector('.card__title').textContent = item.name;

    deleteBtn.addEventListener('click', () => { deleteCardCallback(deleteBtn) });
    likeBtn.addEventListener('click', () => { likeCardCallback(likeBtn) })

    return itemCard
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCardCallback, likeCardCallback);
    cardlist.append(cardElement);
});

// @todo: открытие закрытие  popup   

buttonAdProfile.addEventListener('click', () => { openModal(popupNewCard) });
buttonEdd.addEventListener('click', () => { openModal(popupTypeEdd) });
document.addEventListener('click', closeModal);

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
export const eventCust = new Event('customEvent');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
document.addEventListener('customEvent', function () {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
});
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value
    profileNameElement.textContent = nameValue;
    profileDescriptionElement.textContent = jobValue;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);