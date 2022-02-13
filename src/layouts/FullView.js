import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export const FullView = ({ style, children }) => {
  const styles = useStyles();
  return (
    <SafeAreaView>
      <View style={[styles.root, style]}>{children}</View>
    </SafeAreaView>
  );
};
