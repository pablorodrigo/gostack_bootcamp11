import React from 'react';
import ToastContainer from './components/ToastContainer';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp';

// providers
import AppProvider from './hooks';

// depending on you put this 'tag', the pages will have the access
// AuthContext.Provider

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>
    <GlobalStyle />
  </>
);
export default App;
