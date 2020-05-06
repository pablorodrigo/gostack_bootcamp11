import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <SignIn />
    <GlobalStyle />
  </>
);
export default App;
