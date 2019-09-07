// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';

import AppDecorator from './decorators';
import App from '../App';

storiesOf('App', module)
  .addDecorator(story => <AppDecorator>{story()}</AppDecorator>)
  .add('App component.', () => <App />);
