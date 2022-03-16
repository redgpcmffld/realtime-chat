const HttpStatus = require('./HttpStatus');

class HttpResponse {
  constructor() {}

  ok({ res, data }) {
    return res.status(HttpStatus.OK).json({ data });
  }

  created({ res, data }) {
    return res.status(HttpStatus.CREATED).json({ data });
  }

  noContent({ res }) {
    return res.status(HttpStatus.NO_CONTENT);
  }

  error({ res, error }) {
    const errorCode = error.code || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = error.message || 'UNKNOWN ERROR';
    return res
      .status(errorCode)
      .json({ code: errorCode, message: errorMessage });
  }
}

module.exports = { HttpResponse };
