import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';
import { createCard, likeCardCallback, deleteCardCallback } from './card.js';
import '../pages/index.css';

// @todo: Темплейт карточки
export const template = document.getElementById('card-template').content;


// @todo: DOM узлы
const popups = document.querySelectorAll('.popup');
const cardlist = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupContentImage = document.querySelector('.popup__content_content_image')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCardCallback, likeCardCallback, openModalImage);
    cardlist.append(cardElement);
});

// @todo: открытие закрытие  popup   

buttonAddProfile.addEventListener('click', () => { openModal(popupNewCard) });
buttonEditProfile.addEventListener('click', () => { openModal(popupTypeEdit) });

// открытие изображения 
function openModalImage(evt) { 
    openModal (popupContentImage); // функция   openModal должна быть преобразована по образцу в modal.js. 
    const imagePopup = document.querySelector('.popup__image'); 
    const popupCaption = document.querySelector('.popup__caption'); 
    imagePopup.src = evt.target.src; 
    popupCaption.textContent = evt.target.alt; 
  } 

// @todo: закрытия попапа по крестику    
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close")
    closeButton.addEventListener("click", () => {
        closeModal(popup);
    });
});

// @todo: закрытия попапа по оверлею
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closeModal(popup);
        }
    });
}); 

// Находим форму в DOM

const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
nameInput.value = profileNameElement.textContent; 
jobInput.value = profileDescriptionElement.textContent; 

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
    closeModal(popupTypeEdit);
}
const formElementProf = document.querySelector('[name="edit-profile"]');
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProf.addEventListener('submit', handleFormSubmit);

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
    const cardElementNew = createCard(newCard, deleteCardCallback, likeCardCallback, openModalImage);
    cardlist.prepend(cardElementNew);

    clearForm(formElementNew);
  
    closeModal(popupNewCard);
})

