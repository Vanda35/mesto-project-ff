const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "c1b55e5c-5d7a-4ffb-92fb-3abc4e40dd04",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {return getFetchResult(res)});
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {return getFetchResult(res)});
};

export function getInitialData() {
  return Promise.all([getUserData(), getInitialCards()]);
}

export const updateUserData = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {return getFetchResult(res)});
};

export const createNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => {return getFetchResult(res)});
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

export const addRemoveLike = (cardId, addLike) => {
  const method = addLike == true ? "PUT" : "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: `${method}`,
    headers: config.headers,
  }).then((res) => {return getFetchResult(res)});
};

export const updateAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then((res) => {return getFetchResult(res)});
};

function getFetchResult(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);  
}
