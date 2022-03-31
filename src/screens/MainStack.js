import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'app/screens/Login';
import { SignUp } from './SignUp';
import { Header } from 'app/components/Header';
import { makeStyles } from 'react-native-elements';
import { Home } from './Home';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const get = async () => {
    await AsyncStorage.getItem('user').then((value) => {
      if (value !== null) {
        setIsSignedIn(true);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: styles.headerStyle,
          headerTitleAlign: 'center',
        }}>
        {isSignedIn ? (
          <>
            <Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
