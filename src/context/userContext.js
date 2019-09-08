import React from 'react'
import {useAuth} from './authContext'

const UserContext = React.createContext();

function UserProvider({ children }) {
  const {
    state: { user },
  } = useAuth();
  return (
    <UserContext.Provider value={user} >
      {children}
    </UserContext.Provider>
  )
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export {UserProvider, useUser};
