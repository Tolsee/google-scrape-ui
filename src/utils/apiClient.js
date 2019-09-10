const TOKEN_KEY = '__google_scrape_token__';
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

function request(path, method, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(TOKEN_KEY);
  const headers = {'content-type': 'application/json'};
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body)
  }

  let response;
  return window
    .fetch(`${BASE_URL}/${path}`, config)
    .then(r => {
      response = r;
      return r.json()
    })
    .then(responseBody => ({
      response,
      body: responseBody
    }));
}

export function get(path, config) {
  return request(path, 'GET', config);
}

export function post(path, config) {
  return request(path, 'POST', config);
}

export function put(path, config) {
  return request(path, 'PUT', config);
}

export function patch(path, config) {
  return request(path, 'PATCH', config);
}

export function del(path, config) {
  return request(path, 'DELETE', config);
}
