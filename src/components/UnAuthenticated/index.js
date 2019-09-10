import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import Login from './Login';
import Signup from './Signup';

const StyledRow = styled(Row)`
  height: 100vh;
`;

function Layout({children}) {
  return (
    <StyledRow type="flex" justify="center" align="middle">
      <Col xs={12} sm={8}>
        {children}
      </Col>
    </StyledRow>
  )
}
export default function UnAuthenticated() {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/login" />
      </Switch>
    </Layout>
  )
}
