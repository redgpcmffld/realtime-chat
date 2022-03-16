const { HttpRequest } = require('./http/HttpRequest');
const { HttpResponse } = require('./http/HttpResponse');
const HttpStatus = require('./http/HttpStatus');

module.exports = {
  httpRequest: new HttpRequest(),
  httpResponse: new HttpResponse(),
  HttpStatus,
};
