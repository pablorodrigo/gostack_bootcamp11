import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp';

import { AuothProvider } from './context/AuthContext';

// depending on you put this 'tag', the pages will have the access
// AuthContext.Provider

const App: React.FC = () => (
  <>
    <AuothProvider>
      <SignIn />
    </AuothProvider>
    <GlobalStyle />
  </>
);
export default App;
