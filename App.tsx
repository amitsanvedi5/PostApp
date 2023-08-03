/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Toast from 'react-native-toast-message';

import Router from './src/router';

function App(): JSX.Element {
  return (
    <>
      <Router />
      <Toast position="bottom" />
    </>
  );
}

export default App;
