
// @todo: Темплейт карточки
const template = document.getElementById('card-template').content;

// @todo: DOM узлы
const cardlist =  document.querySelector('.places__list');

// @todo: Функция создания карточки
function CreateCard(Item, deleteCard)  {
    const ItemCard = template.querySelector('.places__item').cloneNode(true);
    const deleteBtn = ItemCard.querySelector('.card__delete-button');
    ItemCard.querySelector('.card__image').src =Item.link;
    ItemCard.querySelector('.card__image').alt =Item.name;
    ItemCard.querySelector('.card__title').textContent = Item.name;

    deleteBtn.addEventListener('click', deleteCard);

    cardlist.append(ItemCard);
    return ItemCard;
}

// @todo: Функция удаления карточки
function deleteCardcallback(evt) {
    evt.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(Item) {
    const ItemCard  = CreateCard(Item, deleteCardcallback);
    
});

 