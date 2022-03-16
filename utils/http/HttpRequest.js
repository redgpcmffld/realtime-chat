const axios = require('axios');

class HttpRequest {
  _baseUrl = '';

  constructor() {}

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(url) {
    this._baseUrl = url;
  }

  /**
   * @private
   */
  _getFullUrl(url) {
    return this._baseUrl + url;
  }

  get({ url, params }) {
    return axios.get(this._getFullUrl(url), { params });
  }

  post({ url, data, params }) {
    return axios.post(this._getFullUrl(url), data, { params });
  }

  put({ url, data, params }) {
    return axios.put(this._getFullUrl(url), data, { params });
  }

  delete({ url, data }) {
    return axios.delete(this._getFullUrl(url), data);
  }
}

module.exports = { HttpRequest };
