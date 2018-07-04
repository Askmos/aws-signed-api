const axios = require('axios');
const aws4 = require('aws4');
const URL = require('url');

module.exports = class AWSSignedApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
    const api = axios.create({ baseURL });
    api.interceptors.request.use((config) => {
      const url = URL.parse(`${config.baseURL}${config.url}`);
      const opts = {
        method: config.method.toUpperCase(),
        host: url.hostname,
        path: url.pathname,
      };
      const headers = {};
      if (config.data) {
        headers['Content-Type'] = 'application/json; charset=utf-8';
        opts.body = JSON.stringify(config.data);
        Object.assign(config, { data: opts.body });
      }

      opts.headers = headers;
      aws4.sign(opts);
      Object.assign(config.headers[config.method], opts.headers);
      return config;
    });
    this.api = api;
  }

  get(url = '') {
    return this.api({
      url,
      method: 'GET',
    });
  }

  post(url = '', data = {}) {
    return this.api({
      url,
      method: 'POST',
      data,
    });
  }

  put(url = '', data = {}) {
    return this.api({
      url,
      method: 'PUT',
      data,
    });
  }

  delete(url = '') {
    return this.api({
      url,
      method: 'DELETE',
    });
  }
};
