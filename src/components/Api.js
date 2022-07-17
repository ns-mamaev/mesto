import {profile} from '../pages/index.js'

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getData(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._handleResponse(res));
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return this._getData('/me');
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._handleResponse(res));
  }    
  
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(Object.assign(data, 
        {
          id: Date.now(),
          likes: [],
          owner: profile._user  //удалить
        }
      ))
    })
    .then(res => this._handleResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
  }  
}