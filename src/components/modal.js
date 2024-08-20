export {openModal as openM , closeModal as closeM};

const edditButton = document.querySelector('.profile__edit-button');
const popupEdd = document.querySelector('.popup');
const closePop = document.querySelector('.popup__close');

const openModal =  edditButton.addEventListener('click', function(evt) {
    popupEdd.setAttribute('style',`
        display: flex; `)
});




const closeModal = closePop.addEventListener('click', function(evt) {
    popupEdd.setAttribute('style',`
        display: none; `)
});





