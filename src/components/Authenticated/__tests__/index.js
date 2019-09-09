import React from 'react';
import { mount } from 'enzyme';
import Authenticated from '../index';

describe('Authenticated Component', () => {
  it('renders successfully', () => {
    mount(<Authenticated />);
  });
});
