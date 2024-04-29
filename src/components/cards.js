export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const templateCard = document.querySelector("#card-template").content;

export function createCard(cardData, deleteCard, likeCard, openImage) {
  const card = templateCard.querySelector(".places__item").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  card.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(card));

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => likeCard(evt.target));

  cardImage.addEventListener("click", (evt) => openImage(evt));

  return card;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(currentButton) {
  currentButton.classList.toggle("card__like-button_is-active");
}
