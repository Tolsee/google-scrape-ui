import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0px;
    background: #f6f8fb;
    font-family: Lato;
  }
`;

export const theme = {
  primary: '#1890ff',
  success: '#52c41a',
  danger: '#f5222d',
  warning: '#fadb14'
};

