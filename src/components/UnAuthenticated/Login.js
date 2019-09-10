import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'context/authContext';

import LoginFrom from 'components/common/LoginForm';
import Row from 'antd/lib/row';
import Typography from 'antd/lib/typography';
import Alert from 'antd/lib/alert';
import Card from 'antd/lib/card';

const { Title } = Typography;

const ErrorContainer = styled(Row)`
  && {
    margin-bottom: 12px;
  } 
`;

export default function Login() {
  const { state: { login: { error, loading } }, login } = useAuth();

  return (
    <Card>
      <Row type="flex" justify="center">
        <Title level={1}>
          Login
        </Title>
      </Row>
      {
        error && (
          <ErrorContainer>
            <Alert message={error} type="error" />
          </ErrorContainer>
        )
      }
      <Row type="flex" justify="center">
        <LoginFrom
          type="login"
          onSubmit={login}
          loading={loading}
        />
      </Row>
    </Card>
  )
}
