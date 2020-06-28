import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
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
  updateUser(user: IUser): void;
}

interface IAuthState {
  token: string;
  user: IUser;
}

const Auth = createContext<IAuthContextData>({} as IAuthContextData);

// children -> everything receive as child
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

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

    // console.log(response.data);

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer: ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <Auth.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </Auth.Provider>
  );
};

export function useAuth(): IAuthContextData {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(Auth);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}
