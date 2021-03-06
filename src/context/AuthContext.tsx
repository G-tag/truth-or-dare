import React, { useState, createContext, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({
  user: null,
  admin: null,
  userId: null,
  displayName: null,
  photoURL: null,
  authenticated: null,
  setUser: (e: any) => { },
  setAdmin: (e: any) => { }
});

export default ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // @ts-ignore
  const { uid, displayName, photoURL } = user || {};

  const authenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user: user,
        admin: admin,
        userId: uid,
        displayName: displayName,
        photoURL: photoURL,
        // @ts-ignore
        authenticated: authenticated,
        setUser: setUser,
        setAdmin: setAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
