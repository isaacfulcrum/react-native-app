import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { theme } from 'app/constants/theme';
import { MainStack } from 'app/screens/MainStack';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <MainStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
