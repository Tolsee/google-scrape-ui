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
  margin-bottom: 12px;
`;

export default function Signup() {
  const { state: { signup: { errors, loading } }, signup } = useAuth();

  return (
    <Card>
      <Row type="flex" justify="center">
        <Title level={1}>
          Signup
        </Title>
      </Row>
      {
        errors && Object.keys(errors).map(key => (
          errors[key].map(error => (
            <ErrorContainer>
              <Alert message={`${key[0].toUpperCase() + key.substring(1)} ${error}`} type="error" />
            </ErrorContainer>
          ))
        ))
      }
      <Row type="flex" justify="center">
        <LoginFrom
          type="signup"
          onSubmit={signup}
          loading={loading}
        />
      </Row>
    </Card>
  );

}

