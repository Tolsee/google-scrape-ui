import React from 'react';
import { mount } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthContext } from 'context/authContext';

import Alert from 'antd/lib/alert';

import Signup from '../Signup';

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

describe('Signup Component', () => {
  it('renders successfully', () => {
    renderWithState(<Signup />, {
      signup: {
        errors: null,
        loading: false
      }
    });
  });

  it('shows error message', () => {
    const wrapper = renderWithState(<Signup />, {
      signup: {
        errors: {
          email: [ 'test error 1', 'test error 2' ]
        },
        loading: false
      }
    });

    expect(wrapper.find(Alert)).toHaveLength(2);
    expect(wrapper.find(Alert).get(0).props.message).toEqual('Email test error 1');
    expect(wrapper.find(Alert).get(1).props.message).toEqual('Email test error 2');
  })
});
