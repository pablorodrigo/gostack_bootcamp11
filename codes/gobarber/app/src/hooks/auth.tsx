import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}
interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextData {
  user: IUser;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
}

interface AuthState {
  token: string;
  user: IUser;
}

const Auth = createContext<AuthContextData>({} as AuthContextData);

// children -> everything receive as child
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      /* const token = await AsyncStorage.getItem('@Gobarber:token');
      const user = await AsyncStorage.getItem('@Gobarber:user'); */

      const [token, user] = await AsyncStorage.multiGet(['@Gobarber:token', '@Gobarber:user']);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    console.log('singIn');

    const response = await api.post('/sessions', {
      email,
      password,
    });

    console.log(response.data);

    const { token, user } = response.data;

    /*  await AsyncStorage.setItem('@Gobarber:token', token);
    await AsyncStorage.setItem('@Gobarber:user', JSON.stringify(user)); */

    await AsyncStorage.multiSet([
      ['@Gobarber:token', token],
      ['@Gobarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    /* await AsyncStorage.removeItem('@Gobarber:token');
    await AsyncStorage.removeItem('@Gobarber:user'); */
    await AsyncStorage.multiRemove(['@Gobarber:token', '@Gobarber:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: IUser) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <Auth.Provider value={{ user: data.user, loading, signIn, signOut, updateUser }}>
      {children}
    </Auth.Provider>
  );
};

export function useAuth(): AuthContextData {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(Auth);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}
