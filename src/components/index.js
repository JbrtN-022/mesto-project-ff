import "../pages/index.css";
import { createCard, deleteCard, likeCard} from "./card.js"
import { openPopup, closePopup } from "./modal.js"
import { clearValidation, enableValidation } from "./validation.js"
import { getCards, getUser, updateUser, postNewCard, removeCard, updateAvatar, addLikeCard, deleteLikeCard } from './api.js'

// @todo: Темплейт карточки

// @todo: DOM узлы 
const newCardForm = document.forms.newplace
const placeList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profileForm = document.forms.editprofile;
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const cardName = newCardForm.placename;
const cardLink = newCardForm.link;
const profileConfig = {};
const avatarTypePopup = document.querySelector('.popup_type_avatar');
const avatarEditButton = avatarTypePopup.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

Promise.all([getUser(), getCards()])
    .then(([resProfile, resCards]) => {
        renderYourProfile(resProfile);
        renderInitialCards(resCards);
    })   
    .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
     });
    

function renderYourProfile(profInfo) {
    profileConfig.id = profInfo._id;
    profileConfig.title = profInfo.name;
    profileConfig.about = profInfo.about;
    profileConfig.avatar = profInfo.avatar;
    profileTitle.textContent = profileConfig.title;
    profileDescription.textContent = profileConfig.about;
    profileImage.setAttribute('style', `background-image: url(${profileConfig.avatar})`);
}

function renderInitialCards(cardData) {
    Array.from(cardData).forEach((el) => {
        const card = createCard(el, deleteCardMain, likeCardMain, openPopupWithImage, profileConfig.id);
        placeList.append(card);
    });
}

// Изменение профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const jobInputValue = jobInput.value;
    const nameInputValue = nameInput.value;
    const button = document.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    // console.log({ name: nameInputValue, about: jobInputValue });

    updateUser({ name: nameInputValue, about: jobInputValue })
        .then((res) => {
            //console.log("Ответ", res);
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
            closePopup(popupTypeEdit);
        })
        .catch((err) => console.log(err))
        .finally(() => button.textContent = 'Сохранить');
}

// открытие попапа с изображением
function openPopupWithImage(imageSrc, captionText) {
    popupImage.src = imageSrc;
    popupImage.alt = captionText;
    popupCaption.textContent = captionText;
    openPopup(popupTypeImage);
}

// Обработчики закрытия попапов
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

// Функция добавления новой карточки из формы попапа
function handleNewCard(evt) {
    evt.preventDefault();
    const cardNameValue = cardName.value;
    const cardLinkValue = cardLink.value;
    const button = newCardForm.button;
    const newCard = { name: cardNameValue, link: cardLinkValue };
    button.textContent = 'Сохранение...';

    postNewCard(newCard)
        .then((res) => {

            //console.log("Ответ", res);
            const card = createCard(res, deleteCardMain, likeCardMain, openPopupWithImage, profileConfig.id);
            placeList.prepend(card);
            closePopup(newCardPopup);
            newCardForm.reset();
            clearValidation(document.forms.avatar, validationConfig);
        })
        .catch((err) => console.log(err))
        .finally(() => button.textContent = 'Сохранить');
}

// Функция удаления карточки на сервере
function deleteCardMain(evt, cardData) {
    removeCard(cardData._id)
        .then(() => {
            deleteCard(evt);
        })
        .catch((err) => console.log(err));
}

function likeCardMain(evt, cardData, userId, likeCounter) {
    const likePromise = cardData.likes.some(like => like._id === userId) ? deleteLikeCard(cardData._id) : addLikeCard(cardData._id);
    likePromise
        .then((res) => {
            //console.log("Ответ", res);
            cardData.likes = res.likes;
            likeCounter.textContent = res.likes.length;
            likeCard(evt);
        })
        .catch((err) => console.log(err));
}

function updateAvatarForm(evt) {
    evt.preventDefault();
    const link = document.forms.avatar.name.value;
    const button = document.forms.avatar.button;
    button.textContent = 'Сохранение...';

    updateAvatar({ avatar: link })
        .then((res) => {
            profileImage.setAttribute('style', `background-image: url(${res.avatar})`);
            closePopup(avatarPopup);
            document.forms.avatar.reset();
            clearValidation(document.forms.avatar, validationConfig);
        })
        .catch((err) => console.log(err))
        .finally(() => button.textContent = 'Сохранить');
}

profileEditButton.addEventListener('click', () => {
    profileForm.name.value = profileTitle.textContent;
    profileForm.description.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openPopup(popupTypeEdit);
});
newCardButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
    newCardForm.reset();
    openPopup(newCardPopup);
});
profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCard);
profileImage.addEventListener('click', () => openPopup(avatarTypePopup));
avatarEditButton.addEventListener('click', (evt) => updateAvatarForm(evt));


enableValidation(validationConfig);
