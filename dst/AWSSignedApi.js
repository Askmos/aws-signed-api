"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var aws4_1 = require("aws4");
var url_1 = require("url");
var getDefaultRequest = function (service, region) {
    var defaultRequest = { service: 'execute-api' };
    if (service)
        defaultRequest.service = service;
    if (region)
        defaultRequest.region = region;
    return defaultRequest;
};
// By default, requests are signed by the AWS SDK by using env variables.
// accessKeyId: env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY
// secretAccessKey: env.AWS_SECRET_ACCESS_KEY || env.AWS_SECRET_KEY
// sessionToken: env.AWS_SESSION_TOKEN
var getDefaultCredentials = function (credentials) {
    if (credentials && credentials.accessKeyId && credentials.secretAccessKey)
        return credentials;
    return null;
};
var AWSSignedApi = /** @class */ (function () {
    function AWSSignedApi(baseURL, credentials, region, service) {
        this.baseURL = baseURL;
        var defaultCredentials = getDefaultCredentials(credentials);
        var api = axios_1.default.create({ baseURL: baseURL });
        // before a request is sent, we edit the header to sign the request
        api.interceptors.request.use(function (config) {
            var url = url_1.parse("" + config.baseURL + config.url);
            var method = config.method ? config.method : '';
            var request = Object.assign(getDefaultRequest(service, region), {
                method: method.toUpperCase(),
                host: url.host,
                path: url.path,
            });
            var headers = {};
            if (config.data) {
                headers['Content-Type'] = 'application/json; charset=utf-8';
                request.body = JSON.stringify(config.data);
                Object.assign(config, { data: request.body });
            }
            request.headers = headers;
            aws4_1.sign(request, defaultCredentials);
            Object.assign(config.headers[method], request.headers);
            return config;
        });
        this.api = api;
    }
    AWSSignedApi.prototype.get = function (url) {
        if (url === void 0) { url = ''; }
        return this.api.request({
            url: url,
            method: 'GET',
        });
    };
    AWSSignedApi.prototype.post = function (url, data) {
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = {}; }
        return this.api.request({
            url: url,
            method: 'POST',
            data: data,
        });
    };
    AWSSignedApi.prototype.put = function (url, data) {
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = {}; }
        return this.api.request({
            url: url,
            method: 'PUT',
            data: data,
        });
    };
    AWSSignedApi.prototype.patch = function (url, data) {
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = {}; }
        return this.api.request({
            url: url,
            method: 'PATCH',
            data: data,
        });
    };
    AWSSignedApi.prototype.delete = function (url, data) {
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = {}; }
        return this.api.request({
            url: url,
            method: 'DELETE',
            data: data,
        });
    };
    return AWSSignedApi;
}());
exports.AWSSignedApi = AWSSignedApi;
;
