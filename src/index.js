// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import { GlobalStyle, theme } from 'styled';

// TODO: Import only the required css
// eslint-disable-next-line
import 'antd/dist/antd.min.css';

export const AppWithProvider = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <>
        <App />
        <GlobalStyle />
      </>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(
  <AppWithProvider />
  , document.getElementById('root'));

registerServiceWorker();
