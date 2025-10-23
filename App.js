import React from 'react';
import {StatusBar} from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      <DashboardScreen />
    </>
  );
};

export default App;