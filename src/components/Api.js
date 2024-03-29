export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`код ${res.status}`); //обработка ответа от сервера повторяется, решил выделить в отдельный метод
  }

  _getData(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._handleResponse(res));
  }

  getUserInfo() {
    return this._getData('/users/me'); 
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  _changeData(data, path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._handleResponse(res));
  }

  changeUserInfo(data) {
    return this._changeData(data, '/users/me');
  }
  
  changeAvatar(data) {
    return this._changeData(data, '/users/me/avatar');
  }
  
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleResponse(res));
  }

  _handleLike(method, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._handleResponse(res))
  }

  setLike(id) {
    return this._handleLike('PUT', id)
  }

  removeLike(id) {
    return this._handleLike('DELETE', id)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(res => this._handleResponse(res))
  }  
}