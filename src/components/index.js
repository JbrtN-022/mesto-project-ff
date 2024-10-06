import { openModal, closeModal, fillProfileInputs, setPopupOpenEvent } from './modal.js';
import { initialCards } from './cards.js';
import {validationConfig, enableValidation} from './validation.js';
import { createCard,  likeCardCallback, deleteCardCallback } from './card.js';
import '../pages/index.css';
import {getCards, getUser, updateUser, postNewCard, updateAvatar } from "./api";
// @todo: Темплейт карточки
export const template = document.getElementById('card-template').content;


// @todo: DOM узлы
const popups = document.querySelectorAll('.popup');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonPlus = document.querySelector('.profile__add-button');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');
export const modalOpenImage = document.querySelector('.popup_type_image');
 const placesList = document.querySelector('.places__list');
 const buttonAvatar = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type-avatar')


export let userId = "";
let userAvatar = "";

Promise.all([getCards(), getUser()])
  .then(([initialCards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profTitle.textContent = userData.name;
    profDesc.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((item) => {
      const cardItem = createCard(item, {
        deleteCardCallback,
        likeCard: likeCardCallback,
        openImageCard: openImageModal,
        userId,
      });
      placesList.append(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// @todo: открытие закрытие  popup   

buttonAddProfile.addEventListener('click', () => { openModal(popupNewCard) });
buttonEditProfile.addEventListener('click', () => {
    
    nameInput.value = profileNameElement.textContent; 
    jobInput.value = profileDescriptionElement.textContent; 

    openModal(popupTypeEdit) });

// открытие изображения 
function openModalImage(evt) { 
    openModal (popupTypeImage); 
    const imagePopup = document.querySelector('.popup__image'); 
    const popupCaption = document.querySelector('.popup__caption'); 
    imagePopup.src = evt.target.src; 
    popupCaption.textContent = evt.target.alt; 
  } 


function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}

// @todo: закрытия попапа по крестику    


// Находим форму в DOM

const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileNameElement.textContent = nameValue;
    profileDescriptionElement.textContent = jobValue;
    closeModal(popupTypeEdit);
}

const formElementProf = document.querySelector('[name="edit-profile"]');
formElementProf.addEventListener('submit', handleProfileFormSubmit);
const formElementNew = document.querySelector('[name="new-place"]');
const typeCardName = document.querySelector('.popup__input_type_card-name')
const typeUrl = document.querySelector('.popup__input_type_url')


/*formElementNew.addEventListener('submit', (evt) => {
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
})*/


const profileFormElement = popupTypeEdit.querySelector(".popup__form");

function handleEditProfile() {
  function handleProfileFormSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault(); 
    // отправляем данные профиля на сервер
    updateUser({ name: nameInput.value, about: jobInput.value })
      .then(() => {
        const nameValue = nameInput.value;
        const jobValue = jobInput.value;
        profileNameElement.textContent = nameValue;
        profileDescriptionElement.textContent = jobValue;
        closeModal(popupTypeEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
}

// изменение аватара
 const profileAvatar = document.querySelector(".profile__image");
 function handleEditAvatar() {
  const avatarFormElement = avatarPopup.querySelector(".popup__form");
  const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");
  let userAvatar = "";

  function handleFormSubmitAvatar(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    updateAvatar({ avatar: avatarInput.value })
      .then((data) => {
        profileAvatar.style = `background-image: url(${data.avatar})`;
        userAvatar = data.avatar;
        handleCloseModal(avatarPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  avatarFormElement.addEventListener("submit", handleFormSubmitAvatar);
}

function handleAddCard(createCard, deleteCard, placesList) {
  const newCardFormElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = newCardFormElement.querySelector(
    ".popup__input_type_url"
  );

  function handleFormNewCardSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };
    // отправляем карточку на свервер
    postNewCard(card)
      .then((card) => {
        const cardItem = createCard(card, {
          deleteCard,
          likeCard: handleLikeButon,
          openImageCard: openModalImage,
          userId,
        });
        placesList.prepend(cardItem);
        handleCloseModal(popupNewCard);
        cardNameInput.value = "";
        cardUrlInput.value = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}

// Функция слушатель закрытия модальных окон нажатием на крестик, нажатием на оверлей. Принимает ноду для закрытия
 const setPopupClose = () => {
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
  
};









setPopupClose(modalNewCard);
setPopupClose(modalEditProfile);
setPopupClose(modalOpenImage);
setPopupClose(avatarPopup);
setPopupOpenEvent(buttonPlus, modalNewCard);
setPopupOpenEvent(buttonEditProfile, modalEditProfile, fillProfileInputs);
setPopupOpenEvent(buttonAvatar, avatarPopup);
handleEditProfile();
handleEditAvatar();
handleAddCard(createCard, deleteCardCallback, placesList);
enableValidation(validationSettings);