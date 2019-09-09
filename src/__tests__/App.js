import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import AppProviders from 'context';

import App from '../App';

jest.mock('components/common/LoginForm');

describe('App component', () => {
  it('should render app component', () => {
    mount(
      <BrowserRouter>
        <ThemeProvider theme={{}}>
          <AppProviders>
            <App />
          </AppProviders>
        </ThemeProvider>
      </BrowserRouter>
    );
  });
});
