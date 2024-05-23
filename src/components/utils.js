export function renderLoading(isLoading, form) {
    const saveButton = form.querySelector(".popup__button");
    if (isLoading) {
      saveButton.textContent = "Сохранение...";
    } else {
      saveButton.textContent = "Сохранить";
    }
  }