class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
            headers: this._headers,
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    addNewCard(cardElement) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardElement.name,
                link: cardElement.link,
            }),
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
            headers: this._headers,
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    setUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    changeLikeCardStatus(isLiked, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(res => this._checkResponse(res));
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
    headers: {
        authorization: "2f88b489-99f5-491c-a88e-5aa5d9bc02d4",
        "Content-Type": "application/json",
    },
});

export default api;