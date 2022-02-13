import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'app/screens/Login';
import { SignUp } from './SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
      </Navigator>
    </NavigationContainer>
  );
};
