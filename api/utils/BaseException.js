//TODO: namespace?

class BaseException extends Error {
  constructor() {}
}

class BadRequestException extends BaseException {
  constructor() {}
}

class UnauthorizedException extends BaseException {
  constructor() {}
}

class ForbiddenException extends BaseException {
  constructor() {}
}

// and so on...

module.exports = {
  BaseException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
};
