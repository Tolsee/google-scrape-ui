import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import LoginForm from '../LoginForm';

function mountUtil(component) {
  return mount(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('LoginForm', () => {
  it('should render appropriately for login', () => {
    const component = mountUtil(<LoginForm type="login" />);
    expect(component.find('button').text())
      .toEqual('Log in');
  });

  it('should render appropriately for signup', () => {
    const component = mountUtil(<LoginForm type="signup" />);
    expect(component.find('button').text())
      .toEqual('Sign up');
  });

  it('should provide values onSubmit', () => {
    const onSubmit = jest.fn();
    const component = mountUtil(<LoginForm loading={false} type="login" onSubmit={onSubmit}/>);

    component
      .find('input')
      .get(0)
      .props
      .onChange(({ target: { value: 'test@gmail.com' } }));

    component.update();

    component
      .find('input')
      .get(1)
      .props
      .onChange(({ target: { value: 'testing' } }));

    component.update();

    component
      .find('form')
      .simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'testing'
    });
  });
});
