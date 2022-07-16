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
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getUserInfo() {
    return this._getData('/me')
  }

  getInitialCards() {
    return this._getData('/cards')
  }

}