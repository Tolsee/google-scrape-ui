import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

describe('App component', () => {
  it('should render app component', () => {
    const component = mount(<App />);

    expect(component).toMatchSnapshot();
  });
});
