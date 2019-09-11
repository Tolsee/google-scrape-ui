import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';

import { KeywordsProvider } from 'context/keywordsContext';

import Header from 'components/common/Header';
import KeywordUpload from 'components/Authenticated/KeywordUpload';
import Keywords from 'components/Authenticated/Keywords';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

function Layout({children}) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
export default function Authenticated() {
  return (
    <KeywordsProvider>
      <Layout>
        <Switch>
          <Route exact path="/" component={Keywords} />
          <Route path="/upload" component={KeywordUpload} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </KeywordsProvider>
  )
}
