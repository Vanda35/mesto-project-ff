export function openModal(formContainer) {
  
  formContainer.classList.add("popup_is-opened");

  document.addEventListener("keydown", keyHandler);

  const popupCloseButton = formContainer.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", function (evt) {
    evt.stopPropagation();
    closeModal(formContainer);
  });

  formContainer.addEventListener("click", closeOverlayClick);
}

export function closeModal(formContainer) {
  formContainer.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const currentPopUp = document.querySelector(".popup_is-opened");
    closeModal(currentPopUp);
  }
}

function closeOverlayClick({ currentTarget, target }) {
  if (target === currentTarget) {
    closeModal(currentTarget);
  }
}
