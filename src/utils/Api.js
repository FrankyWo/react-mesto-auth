class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    addNewCard(card) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        });
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        });
    }

    setUserInfo(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        });
    }

    deleteCard(id) {
        return this._request(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    changeLikeCardStatus(id, isLiked) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
        });
    }

    setUserAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        });
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
    headers: {
        authorization: "2f88b489-99f5-491c-a88e-5aa5d9bc02d4",
        "Content-Type": "application/json",
    }
});

export default api;