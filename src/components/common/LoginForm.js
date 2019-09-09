// @flow
import React from 'react';
import styled from 'styled-components';

import Form from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

type FormProps = {
  onSubmit: Function;
  type: 'login' | 'signup';
  loading: boolean;
}

const StyledFrom = styled(Form)`
  width: 100%;
`;

function LoginForm(props: FormProps) {
  const { type, onSubmit, loading, form: { getFieldDecorator } } = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) onSubmit(values);
    });
  }

  const buttonText = type === 'login' ? 'Log in' : 'Sign up';
  const linkText = type === 'login' ? 'register now!' : 'log in!';
  const link = type === 'login' ? '/signup' : '/login';
  return (
    <StyledFrom onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please provide valid email!'}
          ],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email Address"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: 'Please input your Password!' },
            { min: 6, message: 'Password should be at least 6 characters!' }
          ],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
          {buttonText}
        </Button>
        {' '} Or <Link to={link}>{linkText}</Link>
      </Form.Item>
    </StyledFrom>
  );
}

export default Form.create({ name: 'login_form' })(LoginForm);
