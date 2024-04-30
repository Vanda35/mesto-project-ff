import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditContainer = document.querySelector(".popup_type_edit");

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCardContainer = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit.elements.name;
const jobInput = formElementEdit.elements.description;

const formElementNewCard = document.forms["new-place"];
const placeNameInput = formElementNewCard.elements["place-name"];
const linkInput = formElementNewCard.elements.link;

const popupImageContainer = document.querySelector(".popup_type_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupImageCaption = popupImageContainer.querySelector(".popup__caption");

initialCards.forEach(function (cardData) {
  cardsContainer.append(createCard(cardData, deleteCard, likeCard, openImage));
});

profileEditButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEditContainer);
});

profileAddButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  openModal(popupNewCardContainer);
});

formElementEdit.addEventListener("submit", processFormEditSubmit);
formElementNewCard.addEventListener("submit", processFormNewCardSubmit);

function processFormEditSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEditContainer);
}

function processFormNewCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  cardsContainer.prepend(createCard(newCard, deleteCard, likeCard, openImage));

  formElementNewCard.reset();

  closeModal(popupNewCardContainer);
}

function openImage(evt) {
  evt.preventDefault();

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openModal(popupImageContainer);
}
