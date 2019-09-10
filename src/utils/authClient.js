// @flow
import { get, post, del } from 'utils/apiClient';

const TOKEN_KEY = '__google_scrape_token__';

type loginParams = {
  email: string;
  password: string;
}

function getAuthorization() {
  return window.localStorage.getItem(TOKEN_KEY)
}

function setAuthorization(headers) {
  const authorizationHeader = headers.get('Authorization') && headers.get('Authorization').split(' ').pop();
  window.localStorage.setItem(TOKEN_KEY, authorizationHeader);
}

export async function login({ email, password }: loginParams) {
  const { response, body } = await post('login', { body: { user: { email, password } } });
  if (response.status < 400) setAuthorization(response.headers);
  return {
    status: response.status,
    body
  };
}

export async function logout() {
  const { response } = await del('logout');
  if (response.status < 400) window.localStorage.removeItem(TOKEN_KEY);
  return { status: response.status };
}

export async function singup({ email, password }) {
  const { response, body } = await post('signup', { body: { user: { email, password } } });
  if (response.status < 400) setAuthorization(response.headers);
  return {
    status: response.status,
    body
  };
}

export async function getUser() {
  const token = getAuthorization();
  if (!token) {
    return null;
  }
  const { response, body } = await get('me');
  if (response.status >= 400) {
    window.localStorage.removeItem(TOKEN_KEY);
    return null;
  }
  return body;
}


