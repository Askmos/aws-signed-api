import axios, { AxiosInstance } from 'axios';
import { sign } from 'aws4';
import { parse } from 'url';
import { Credentials, Request } from './AWSTypes';

const getDefaultRequest = (service?: string, region?: string): Request => {
  const defaultRequest: Request = { service: 'execute-api' };
  if (service) defaultRequest.service = service;
  if (region) defaultRequest.region = region;
  return defaultRequest;
};

// By default, requests are signed by the AWS SDK by using env variables.
// accessKeyId: env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY
// secretAccessKey: env.AWS_SECRET_ACCESS_KEY || env.AWS_SECRET_KEY
// sessionToken: env.AWS_SESSION_TOKEN
const getDefaultCredentials = (credentials?: Credentials): Credentials | null => {
  if (credentials && credentials.accessKeyId && credentials.secretAccessKey) return credentials;
  return null;
};

export class AWSSignedApi {

  public baseURL: string;
  public api: AxiosInstance;

  constructor(
    baseURL: string,
    credentials?: Credentials,
    region?: string,
    service?: string
  ) {
    this.baseURL = baseURL;
    const defaultCredentials = getDefaultCredentials(credentials);
    const api = axios.create({ baseURL });
    // before a request is sent, we edit the header to sign the request
    api.interceptors.request.use((config) => {
      const url = parse(`${config.baseURL}${config.url}`);
      const method = config.method ? config.method : '';
    
      const request = Object.assign(getDefaultRequest(service, region), {
        method: method.toUpperCase(),
        host: url.host,
        path: url.path,
      });
      const headers: Record<string, string> = {};
      if (config.data) {
        headers['Content-Type'] = 'application/json; charset=utf-8';
        request.body = JSON.stringify(config.data);
        Object.assign(config, { data: request.body });
      }

      request.headers = headers;
      sign(request, defaultCredentials);
      Object.assign(config.headers[method], request.headers);
      return config;
    });
    this.api = api;
  }

  get<T>(url = '') {
    return this.api.request<T>({
      url,
      method: 'GET',
    });
  }

  post<T>(url = '', data = {}) {
    return this.api.request<T>({
      url,
      method: 'POST',
      data,
    });
  }

  put<T>(url = '', data = {}) {
    return this.api.request<T>({
      url,
      method: 'PUT',
      data,
    });
  }

  patch<T>(url = '', data = {}) {
    return this.api.request<T>({
      url,
      method: 'PATCH',
      data,
    });
  }

  delete<T>(url = '', data = {}) {
    return this.api.request<T>({
      url,
      method: 'DELETE',
      data,
    });
  }
};
