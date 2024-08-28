import { openModal, closeModal } from '../components/modal.js';
import { initialCards } from './cards.js';
import { createCard, likeCardCallback, deleteCardCallback } from './card.js';
import '../pages/index.css';

// @todo: Темплейт карточки
export const template = document.getElementById('card-template').content;
const itemCard = template.querySelector('.places__item').cloneNode(true);

const imageCard = itemCard.querySelector('.card__image');

// @todo: DOM узлы
const cardlist = document.querySelector('.places__list');
const buttonEdd = document.querySelector('.profile__edit-button');
const buttonAdProfile = document.querySelector('.profile__add-button');
const popupTypeEdd = document.querySelector('.popup_type_edit');
const popupContentImage = document.querySelector('.popup__content_content_image')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const titleCard = itemCard.querySelector('.card__title');
const popupNewCard = document.querySelector('.popup_type_new-card');
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCardCallback, likeCardCallback);
    cardlist.append(cardElement);
});

// @todo: открытие закрытие  popup   

buttonAdProfile.addEventListener('click', () => { openModal(popupNewCard) });
buttonEdd.addEventListener('click', () => { openModal(popupTypeEdd) });
document.addEventListener('click', closeModal);
popupContentImage.addEventListener('click', () => { openModal(imageCard) })


// Находим форму в DOM

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
formElementProf.addEventListener('submit', handleFormSubmit);


const formElementProf = document.querySelector('[name="edit-profile"]');
const formElementNew = document.querySelector('[name="new-place"]');
const typeCardName = document.querySelector('.popup__input_type_card-name')
const typeUrl = document.querySelector('.popup__input_type_url')

function clearForm(form) {
    form.reset();
}

formElementNew.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const CardNameValue = typeCardName.value;
    const UrlValue = typeUrl.value;

    const newCard = {
        name: CardNameValue,
        link: UrlValue
    };
    const cardElementNew = createCard(newCard, () => {
        cardElementNew.remove();
    }, () => {
        cardElementNew.querySelector('.card__like-button').classList.toggle('card__like-button_active')
    });
    cardlist.prepend(cardElementNew);

    clearForm(formElementNew);
})


//объсните, пожалуйса, логику открытия попапа :( 