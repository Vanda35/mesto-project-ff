import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  getInitialData,
  updateUserData,
  createNewCard,
  updateAvatar,
  renderLoading,
} from "./components/api.js";
import { enableValidation } from "./components/validation.js";

const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditContainer = document.querySelector(".popup_type_edit");

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCardContainer = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileImage = document.querySelector(".profile__image");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const formElementNewAvatar = document.forms["new-avatar"];
const avatarInput = formElementNewAvatar.elements.avatar;

const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit.elements.name;
const jobInput = formElementEdit.elements.description;

const formElementNewCard = document.forms["new-place"];
const placeNameInput = formElementNewCard.elements["place-name"];
const linkInput = formElementNewCard.elements.link;

const popupImageContainer = document.querySelector(".popup_type_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupImageCaption = popupImageContainer.querySelector(".popup__caption");

let userId;

profileImage.addEventListener("click", function (evt) {
  evt.preventDefault();
  openModal(popupNewAvatar);
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
formElementNewAvatar.addEventListener("submit", processFormNewAvatarSubmit);

function processFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditContainer);

  updateUserData(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => renderLoading(false, popupEditContainer));

  closeModal(popupEditContainer);
}

function processFormNewCardSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, popupNewCardContainer);

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  createNewCard(newCard)
    .then((cardData) => {
      cardsContainer.prepend(
        createCard(cardData, userId, deleteCard, likeCard, openImage)
      );
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => renderLoading(false, popupNewCardContainer));

  formElementNewCard.reset();

  closeModal(popupNewCardContainer);
}

function processFormNewAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, popupNewAvatar);

  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => renderLoading(false, popupNewAvatar));
  avatarInput.value = "";
  closeModal(popupNewAvatar);
}

function openImage(evt) {
  evt.preventDefault();

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openModal(popupImageContainer);
}

getInitialData()
  .then(([userData, initialCards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;
    initialCards.forEach(function (cardData) {
      cardsContainer.append(
        createCard(cardData, userId, deleteCard, likeCard, openImage)
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
