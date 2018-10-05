const axios = require('axios');
const aws4 = require('aws4');
const URL = require('url');

const getDefaultOpts = (service, region) => {
  const defaultOpts = { service: 'execute-api' };
  if (service) defaultOpts.service = service;
  if (region) defaultOpts.region = region;
  return defaultOpts;
};

const getDefaultCredentials = (credentials) => {
  if (credentials.accessKeyId && credentials.secretAccessKey) return credentials;
  return null;
};

module.exports = class AWSSignedApi {
  constructor(
    baseURL,
    credentials = {},
    region,
    service
  ) {
    this.baseURL = baseURL;
    const defaultCredentials = getDefaultCredentials(credentials);
    const api = axios.create({ baseURL });
    // before a request is sent, we edit the header to sign the request
    api.interceptors.request.use((config) => {
      const url = URL.parse(`${config.baseURL}${config.url}`);
      const opts = Object.assign(getDefaultOpts(service, region), {
        method: config.method.toUpperCase(),
        host: url.host,
        path: url.path,
      });
      const headers = {};
      if (config.data) {
        headers['Content-Type'] = 'application/json; charset=utf-8';
        opts.body = JSON.stringify(config.data);
        Object.assign(config, { data: opts.body });
      }

      opts.headers = headers;
      aws4.sign(opts, defaultCredentials);
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

  patch(url = '', data = {}) {
    return this.api({
      url,
      method: 'PATCH',
      data,
    });
  }

  delete(url = '', data = {}) {
    return this.api({
      url,
      method: 'DELETE',
      data,
    });
  }
};
