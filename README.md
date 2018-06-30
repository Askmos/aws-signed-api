# AWS Signed Api for Mos services

## Installation

```shell
npm install --save Askmos/aws-signed-api
```

or

```shell
yarn add Askmos/aws-signed-api
```

## Usage

```javascript
const API = require('aws-signed-api');

const userApi = new API('http://api.mos.com');

userApi.post('/user/1', { firstName: 'Jane' })
  .then(response => console.log(response))
  .catch(error => console.error(error));
userApi.put('/user/1', { firstName: 'John' })
  .then(response => console.log(response))
  .catch(error => console.error(error));
userApi.get('/user/1')
  .then(response => console.log(response))
  .catch(error => console.error(error));
userApi.delete('/user/1')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```
