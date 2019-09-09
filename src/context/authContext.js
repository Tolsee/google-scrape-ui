// @flow
import React, { useReducer, useEffect } from 'react'
import actionCreator from 'utils/actionCreator';
import * as authClient from 'utils/authClient';

const AuthContext = React.createContext();

const LOGIN = 'login';
const LOGIN_ERROR = 'login_error';
const LOGIN_SUCCESS = 'login_success';

const LOGOUT = 'logout';
const LOGOUT_SUCCESS = 'logout_success';

const SIGNUP = 'signup';
const SIGNUP_ERROR = 'signup_error';
const SIGNUP_SUCCESS = 'signup_success';

const login = actionCreator(LOGIN);
const loginError = actionCreator(LOGIN_ERROR);
const loginSuccess = actionCreator(LOGIN_SUCCESS);

const signup = actionCreator(SIGNUP);
const signupError = actionCreator(SIGNUP_ERROR);
const signupSuccess = actionCreator(SIGNUP_SUCCESS);

const logout = actionCreator(LOGOUT);
const logoutSuccess = actionCreator(LOGOUT_SUCCESS);

const initialState = {
  login: {
    error: null,
    loading: false
  },
  signup: {
    errors: null,
    loading: false
  },
  user: null
};

function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: {
          error: null,
          loading: true,
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          error: null,
          loading: false
        },
        user: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          error: action.payload,
          loading: false
        },
        user: null
      };
    case SIGNUP:
      return {
        ...state,
        signup: {
          errors: action.payload,
          loading: false
        },
        user: null
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          errors: null,
          loading: false
        },
        user: action.payload
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signup: {
          errors: action.payload,
          loading: false
        },
        user: null
      };
    case LOGOUT:
      return {
        ...state,
        logout: {
          error: action.payload,
          loading: false
        },
        user: null
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          error: null,
          loading: false
        },
        user: null
      };
    default:
      throw new Error();
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    (async function() {
      try {
        const user = await authClient.getUser();
        if (user) dispatch(loginSuccess(user));
        // eslint-disable-next-line no-empty
      } catch (e) { }
    })()
  }, []);

  async function handleLogin(form) {
    try {
      dispatch(login());
      const { status, body } = await authClient.login(form);
      if (status >= 400) dispatch(loginError(body.error));
      else dispatch(loginSuccess(body));
    } catch (e) {
      dispatch(loginError());
    }
  }

  async function handleSignup(form) {
    dispatch(signup());
    try {
      const { status, body } = await authClient.singup(form);
      if (status >= 400) dispatch(signupError(body.errors));
      else dispatch(signupSuccess(body));
    } catch (e) {
      dispatch(signupError());
    }
  }

  async function handleLogout() {
    try {
      dispatch(logout());
      await authClient.logout();
      dispatch(logoutSuccess());
      // eslint-disable-next-line no-empty
    } catch (e) { }
  }

  return (
    <AuthContext.Provider value={{state, login: handleLogin, logout: handleLogout, signup: handleSignup }}>
      {children}
    </AuthContext.Provider>
  )
}
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context;
}

export {AuthProvider, useAuth};
