export function openModal(formContainer) {
  formContainer.classList.add("popup_is-opened");
  formContainer.addEventListener("click", closeOverlayOrButtonClick);
  document.addEventListener("keydown", processKey);
}

export function closeModal(formContainer) {
  formContainer.classList.remove("popup_is-opened");
  formContainer.removeEventListener("click", closeOverlayOrButtonClick);
  document.removeEventListener("keydown", processKey);
}

function processKey(evt) {
  if (evt.key === "Escape") {
    const currentPopUp = document.querySelector(".popup_is-opened");
    closeModal(currentPopUp);
  }
}

function closeOverlayOrButtonClick({ currentTarget, target }) {
  const popupCloseButton = currentTarget.querySelector(".popup__close");
  if (target === currentTarget || target === popupCloseButton) {
    closeModal(currentTarget);
  }
}
