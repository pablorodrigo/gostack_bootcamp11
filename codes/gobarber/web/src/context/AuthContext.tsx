import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// children -> everything receive as child
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    console.log('singIn');

    const response = await api.post('/sessions', {
      email,
      password,
    });

    console.log(response.data);

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn }}>{children}</AuthContext.Provider>;
};

export function userAuth(): AuthContextData {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}
