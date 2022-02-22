import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'app/screens/Login';
import { SignUp } from './SignUp';
import { Header } from 'app/components/Header';
import { makeStyles, useTheme } from 'react-native-elements';

const { Navigator, Screen } = createNativeStackNavigator();

const useStyles = makeStyles((theme) => ({
  headerStyle: {
    backgroundColor: theme.colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
}));

export const MainStack = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: styles.headerStyle,
          headerLeft: null,
        }}>
        <Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerTitle: (props) => <Header {...props} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
