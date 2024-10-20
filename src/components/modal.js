
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
};
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
};
export function dataLoading(buttom, load){
  if (load) {
    buttom.textContent ='Сохранение...'; 
  } else {
    buttom.textContent = 'Сохранить';
  }
}

function closePopupEsc(event) {
  if (event.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
  }
}
