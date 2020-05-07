import React, { createContext, useCallback, useContext, useState } from 'react';

import { uuid } from 'uuidv4';
import { Omit } from '@unform/core';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;

  removeToast(id: string): void;
}

const Toast = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      console.log('addToast');
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      // copy all and create again
      setMessages([...messages, toast]);
      // or you can create on other way
      // setMessages((oldMessages) => [...oldMessages, toast]);
    },
    [messages],
  );

  const removeToast = useCallback(
    (id: string) => {
      console.log('removeToast');

      setMessages((state) => state.filter((message) => message.id !== id));
    },
    [[]],
  );

  return (
    <Toast.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </Toast.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(Toast);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}
