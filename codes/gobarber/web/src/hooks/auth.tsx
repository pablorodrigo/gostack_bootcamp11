import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

interface IAuthState {
  token: string;
  user: IUser;
}

const Auth = createContext<IAuthContextData>({} as IAuthContextData);

// children -> everything receive as child
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer: ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
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

    api.defaults.headers.authorization = `Bearer: ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setData({} as IAuthState);
  }, []);

  return <Auth.Provider value={{ user: data.user, signIn, signOut }}>{children}</Auth.Provider>;
};

export function useAuth(): IAuthContextData {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(Auth);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}
