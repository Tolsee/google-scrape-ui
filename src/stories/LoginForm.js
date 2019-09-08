// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LoginForm from 'components/common/LoginForm';
import AppDecorator from './decorators';

storiesOf('Login Form', module)
  .addDecorator(story => <AppDecorator>{story()}</AppDecorator>)
  .add('Login form with type login.', () => <LoginForm type="login" onSubmit={action('submit form')} />)
  .add('Login form with type signup.', () => <LoginForm type="signup" onSubmit={action('submit form')} />)
  .add('Login form with loading.', () => <LoginForm type="signup" loading onSubmit={action('submit form')} />)
