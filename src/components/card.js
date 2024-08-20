export {likeCard } 

// @todo: like на карточке
const likeCard = cardlist.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
    }
});

// @todo: создание карточки

/*const profileButton = document.getElementById('.profile__add-button');
const NewPopCard = document.getElementById('.popup_type_new-card');

const openCreateNewCard = profileButton.querySelector('click', function(evt){
    NewPopCard.setAttribute('style' , `
        display: flex;`);
}); */
