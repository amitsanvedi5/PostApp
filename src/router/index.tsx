import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './Home';

const Router = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Router;
