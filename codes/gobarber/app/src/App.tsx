import 'react-native-gesture-handler';

import React from 'react';
import { Text, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import './config/ReactotronConfig';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
