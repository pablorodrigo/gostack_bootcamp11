import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp';

import { AuthProvider } from './context/AuthContext';

// depending on you put this 'tag', the pages will have the access
// AuthContext.Provider

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);
export default App;
