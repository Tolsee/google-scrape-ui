import React from 'react';
import { mount } from 'enzyme';

import { KeywordsProvider } from 'context/keywordsContext';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthContext } from 'context/authContext';
import { UserProvider } from 'context/userContext';
import Authenticated from '../index';


describe('Authenticated Component', () => {
  it('renders successfully', () => {
    mount(
      <BrowserRouter>
        <ThemeProvider theme={{}}>
          <AuthContext.Provider value={{ state: { user: { email: 'test@test.com' }}}}>
            <UserProvider>
              <KeywordsProvider>
                <Authenticated />
              </KeywordsProvider>
            </UserProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    );
  });
});
