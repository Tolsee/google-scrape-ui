import React from 'react';
import { mount } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthContext } from 'context/authContext';

import Alert from 'antd/lib/alert';

import Login from '../Login';

function renderWithState(component, state) {
  return mount(
    <BrowserRouter>
      <ThemeProvider theme={{}}>
        <AuthContext.Provider value={{ state }}>
          {component}
        </AuthContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

describe('Login Component', () => {
  it('renders successfully', () => {
    renderWithState(<Login />, {
      login: {
        error: null,
        loading: false
      }
    });
  });

  it('shows error message', () => {
    const wrapper = renderWithState(<Login />, {
      login: {
        error: 'Test error message',
        loading: false
      }
    });

    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).get(0).props.message).toEqual('Test error message');
  })
});
