const templateCard = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(item) {
  const cardElement = templateCard
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;

  deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function (evt) {
    deleteCard(evt.target);
  });

  return cardElement;
}

function deleteCard(currentButton) {
  console.log(currentButton);
  currentElement = currentButton.closest(".places__item");
  currentElement.remove();
}

initialCards.forEach(function (item) {
  placesList.append(createCard(item));
});
