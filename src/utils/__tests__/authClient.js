import { login, singup, logout, getUser } from '../authClient';

const url = path => `${process.env.REACT_APP_API_ENDPOINT}/${path}`

describe('authClient', () => {
  describe('login', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
    });

    afterEach(() => {
      localStorage.setItem.mockRestore();
    });

    it('should set authorization token on successful login', async () => {
      const headers = new Headers();
      headers.append('Authorization', 'Bearer TEST_TOKEN');
      window.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(),
        headers,
        status: 200
      });
      await login({});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch.mock.calls[0][0]).toEqual(url('login'));
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('__google_scrape_token__', 'TEST_TOKEN');
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'removeItem');
    });

    afterEach(() => {
      localStorage.removeItem.mockRestore();
    });

    it('should remove authorization token', async () => {
      window.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(),
        status: 200
      });
      await logout();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch.mock.calls[0][0]).toEqual(url('logout'));
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('__google_scrape_token__');
    });
  });

  describe('signup', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
    });

    afterEach(() => {
      localStorage.setItem.mockRestore();
    });

    it('should set authorization token on successful login', async () => {
      const headers = new Headers();
      headers.append('Authorization', 'Bearer TEST_TOKEN');
      window.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(),
        headers,
        status: 200
      });
      await singup({});
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch.mock.calls[0][0]).toEqual(url('signup'));
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('__google_scrape_token__', 'TEST_TOKEN');
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'getItem');
    });

    afterEach(() => {
      localStorage.getItem.mockRestore();
    });

    it('should get user when authorization token is present', async () => {
      const user = { email: 'test@gmail.com' };
      window.localStorage.setItem('__google_scrape_token__', 'TEST_TOKEN');
      window.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(user),
        status: 200
      });
      const body = await getUser();
      expect(window.localStorage.getItem).toHaveBeenCalledWith('__google_scrape_token__');
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('me'), {
        method: 'GET',
        headers: {
          Authorization: 'Bearer TEST_TOKEN',
          'content-type': 'application/json',
        },
      });
      expect(body).toEqual(user);
      window.localStorage.removeItem('__google_scrape_token__');
    });

    it('should return null when when authorization token is present', async () => {
      const body = await getUser();
      expect(body).toEqual(null);
    });

    it('should get user when authorization token is present', async () => {
      jest.spyOn(Storage.prototype, 'removeItem');

      window.localStorage.setItem('__google_scrape_token__', 'TEST_TOKEN');
      window.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(),
        status: 401
      });
      const body = await getUser();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(url('me'), {
        method: 'GET',
        headers: {
          Authorization: 'Bearer TEST_TOKEN',
          'content-type': 'application/json',
        },
      });
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('__google_scrape_token__');
      expect(body).toEqual(null);
      window.localStorage.removeItem('__google_scrape_token__');
      localStorage.removeItem.mockRestore();
    });
  });
});
