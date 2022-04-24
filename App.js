import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { theme } from 'app/constants/theme';
import { MainStack } from 'app/screens/MainStack';
import axios from 'axios';
import baseURL from 'app/constants/baseUrl';
import { MarathonProvider } from 'app/context';
axios.defaults.baseURL = baseURL;

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <MarathonProvider>
          <MainStack />
        </MarathonProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
