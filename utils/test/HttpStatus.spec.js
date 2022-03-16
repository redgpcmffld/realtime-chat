const { constants } = require('http2');
const HttpStatus = require('../http/HttpStatus');

describe('HttpStatus', () => {
  test('http status code', () => {
    expect(HttpStatus.OK).toBe(constants.HTTP_STATUS_OK);
    expect(HttpStatus.CREATED).toBe(constants.HTTP_STATUS_CREATED);
    expect(HttpStatus.BAD_REQUEST).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    expect(HttpStatus.UNAUTHORIZED).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
    expect(HttpStatus.FORBIDDEN).toBe(constants.HTTP_STATUS_FORBIDDEN);
    expect(HttpStatus.NOT_FOUND).toBe(constants.HTTP_STATUS_NOT_FOUND);
    expect(HttpStatus.INTERNAL_SERVER_ERROR).toBe(
      constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
    );
  });
});
