
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