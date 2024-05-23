import { deleteCardFromServer, addRemoveLike } from "./api.js";

const templateCard = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  currentUserId,
  deleteCard,
  likeCard,
  openImage
) {
  const card = templateCard.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  card.querySelector(".card__title").textContent = cardData.name;
  card.querySelector(".card__likes").textContent = cardData.likes.length;
  card.querySelector(".card__id").textContent = cardData._id;

  if (cardData.owner._id === currentUserId) {
    deleteButton.addEventListener("click", () => deleteCard(card));
  } else {
    deleteButton.classList.add("card__delete-button-hidden");
  }

  const likeButton = card.querySelector(".card__like-button");
  if (checkLike(currentUserId, cardData.likes)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) => likeCard(evt.target));

  cardImage.addEventListener("click", (evt) => openImage(evt));

  return card;
}

export function deleteCard(card) {
  deleteCardFromServer(card.querySelector(".card__id").textContent)
  .then(card.remove())
  .catch((err) => {
    console.error(err);
  });  
}

export function likeCard(currentButton) {
  const addLike = !currentButton.classList.contains(
    "card__like-button_is-active"
  );
  const card = currentButton.closest(".card");
  addRemoveLike(card.querySelector(".card__id").textContent, addLike)
    .then((cardData) => {
      card.querySelector(".card__likes").textContent = cardData.likes.length;
      currentButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error(err);
    });  
}

function checkLike(userId, likeArray) {
  let hasUserLike = false;
  likeArray.forEach(element => {
    if(element._id == userId) {
      hasUserLike = true;
      return hasUserLike;
    }
  });
  return hasUserLike;
}