// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from 'context';

import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import { GlobalStyle, theme } from 'styled';

// TODO: Import only the required css
// eslint-disable-next-line
import 'antd/dist/antd.min.css';

const AppWithProvider = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppProviders>
        <App />
        <GlobalStyle />
      </AppProviders>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(
  <AppWithProvider />
  , document.getElementById('root'));

registerServiceWorker();
