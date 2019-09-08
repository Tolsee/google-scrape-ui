import { get, post, del, patch, put } from '../apiClient';

const url = path => `${process.env.REACT_APP_API_URL}/${path}`

describe('apiClient', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({ json: () => Promise.resolve() });
  });

  it('should call with base url with base config', async () => {
    await get('test', {});
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(url('test'), {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
  });

  it('adds authorization header when present in localStorage', async () => {
    window.localStorage.setItem('__google_scrape_token__', 'TEST_TOKEN');
    await get('test');
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(url('test'), {
      method: 'GET',
      headers: {
        Authorization: 'Bearer TEST_TOKEN',
        'content-type': 'application/json',
      },
    });
    window.localStorage.removeItem('__google_scrape_token__');
  });

  describe('get', () => {
    it('sets method as GET', async () => {
      await get('test', {});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('test'), {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
    });
  });

  describe('post', () => {
    it('sets method as POST', async () => {
      await post('test', {});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('test'), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
    });
  });

  describe('put', () => {
    it('sets method as PUT', async () => {
      await put('test', {});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('test'), {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
      });
    });
  });

  describe('patch', () => {
    it('sets method as PATCH', async () => {
      await patch('test', {});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('test'), {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
      });
    });
  });

  describe('del', () => {
    it('sets method as DELETE', async () => {
      await del('test', {});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('test'), {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
    });
  });
});
