import React from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

export const FullView = ({ style, backgroundImage, children }) => {
  const styles = useStyles();
  return (
    <SafeAreaView>
      {(backgroundImage && (
        <ImageBackground style={[styles.root, style]} source={backgroundImage}>
          {children}
        </ImageBackground>
      )) || <View style={[styles.root, style]}>{children}</View>}
    </SafeAreaView>
  );
};
