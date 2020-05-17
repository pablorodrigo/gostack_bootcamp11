import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import './config/ReactotronConfig';
import Routes from './routes/index';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
