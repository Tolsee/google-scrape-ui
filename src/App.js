// @flow
import React from 'react';
import { useUser } from 'context/userContext';
import Authenticated from 'components/Authenticated';
import UnAuthenticated from 'components/UnAuthenticated';

export default function App() {
  const user = useUser();

  return user ? <Authenticated /> : <UnAuthenticated />;
}

