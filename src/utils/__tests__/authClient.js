import { login, singup, logout } from '../authClient';

const url = path => `${process.env.REACT_APP_API_URL}/${path}`

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
});
