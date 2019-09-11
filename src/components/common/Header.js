import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'context/authContext';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Typography from 'antd/lib/typography';

const { Text } = Typography;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 999;
  padding: 0 5vw;
  height: 64px;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: white;
`;

const Email = styled(Text)`
  margin-right: 8px;
`;

export default function Header() {
  const { state: { user: { email } }, logout } = useAuth();

  return (
    <HeaderWrapper>
      <Email>{email}</Email>
      <Button onClick={logout}>
        <Icon type="logout" />
        Logout
      </Button>
    </HeaderWrapper>
  );
}
