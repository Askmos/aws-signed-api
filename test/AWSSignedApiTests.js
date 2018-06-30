const nock = require('nock');
const { expect } = require('chai');
const API = require('../lib/AWSSignedApi');

const baseURL = 'https://12345.execute-api.us-west-1.amazonaws.com/staging';

const testApi = new API(baseURL);
const testApiNock = nock(baseURL);
const testPath = '/test';

describe('AWS signed api', () => {
  describe('get', () => {
    before(() => {
      testApiNock.get(testPath).reply(200);
    });
    it('should have signed AWS header', (done) => {
      testApi.get(testPath)
        .then((response) => {
          expect(response.config.headers).to.contain.keys('X-Amz-Date', 'Authorization', 'Host');
          expect(response.status).to.eq(200);
          done();
        })
        .catch(error => done(error));
    });
  });
  describe('put', () => {
    before(() => {
      testApiNock.put(testPath).reply(200);
    });
    it('should have signed AWS header', (done) => {
      testApi.put(testPath)
        .then((response) => {
          expect(response.config.headers).to.contain.keys('X-Amz-Date', 'Authorization', 'Host');
          expect(response.status).to.eq(200);
          done();
        })
        .catch(error => done(error));
    });
  });
  describe('post', () => {
    before(() => {
      testApiNock.post(testPath).reply(200);
    });
    it('should have signed AWS header', (done) => {
      testApi.post(testPath)
        .then((response) => {
          expect(response.config.headers).to.contain.keys('X-Amz-Date', 'Authorization', 'Host');
          expect(response.status).to.eq(200);
          done();
        })
        .catch(error => done(error));
    });
  });
  describe('delete', () => {
    before(() => {
      testApiNock.delete(testPath).reply(200);
    });
    it('should have signed AWS header', (done) => {
      testApi.delete(testPath)
        .then((response) => {
          expect(response.config.headers).to.contain.keys('X-Amz-Date', 'Authorization', 'Host');
          expect(response.status).to.eq(200);
          done();
        })
        .catch(error => done(error));
    });
  });
});
