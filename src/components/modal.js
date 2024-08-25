export function openModal(evt) {
    evt.classList.add('.popup_is-opened');
    document.addEventListener('keydown', closeModalViaEsc);
}

export function closeModal(evt) {
    if (evt.target.classList.contains('.popup__close')) {
        delletClassOpen();
    }
    else if (evt.target.classList.contains('.popup_is-opened')) {
        delletClassOpen();
    }
}

function closeModalViaEsc(evt) {
    if (evt.key === 'Escape') {
        delletClassOpen();
    }
    document.removeEventListener('keydown', closeModalViaEsc);
}

function delletClassOpen() {
    document.querySelector('.popup_is-opened').classList.remove('.popup_is-opened');
}


