const axios = require('axios');
const { HttpRequest } = require('../http/HttpRequest');

jest.mock('axios');

describe('HttpRequest', () => {
  const httpRequest = new HttpRequest();
  it('should be defined', () => {
    expect(httpRequest).toBeDefined();
  });

  test('baseUrl getter setter', () => {
    httpRequest.baseUrl = 'http://foo';
    expect(httpRequest.baseUrl).toBe('http://foo');
  });

  test('GET method', async () => {
    jest.spyOn(axios, 'get').mockImplementation((url, { params }) => {
      return Promise.resolve({ data: params });
    });

    const getResponse = await httpRequest.get({
      url: '/foo',
      params: { foo: 'bar' },
    });

    expect(getResponse).toEqual({ data: { foo: 'bar' } });
    expect(axios.get).toHaveBeenCalledWith('http://foo/foo', {
      params: { foo: 'bar' },
    });
  });

  test('POST method', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => {
      return Promise.resolve({ data: 'foo' });
    });

    const postResponse = await httpRequest.post({
      url: '/foo',
      data: { bar: 'baz' },
    });

    expect(postResponse).toEqual({ data: 'foo' });
    expect(axios.post).toHaveBeenCalledWith(
      'http://foo/foo',
      { bar: 'baz' },
      { params: undefined }
    );
  });
});
