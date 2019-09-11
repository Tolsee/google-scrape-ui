// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import CsvUploader from 'components/common/CsvUploader';
import AppDecorator from './decorators';

storiesOf('Csv Uploader', module)
  .addDecorator(story => <AppDecorator>{story()}</AppDecorator>)
  .add('Normal csv uploader.', () => <CsvUploader />);
