
import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const templateCard = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function createCard(cardData, deleteCard) {
  const card = templateCard.querySelector(".places__item").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  card.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(card));

  return card;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(function (cardData) {
  cardsContainer.append(createCard(cardData, deleteCard));
});
