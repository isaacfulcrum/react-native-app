import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
  },
});

export const BackgroundView = ({ style, backgroundImage, children }) => {
  const styles = useStyles();
  return (
    <SafeAreaView>
      <ImageBackground
        style={[styles.root, style]}
        resizeMode="cover"
        source={backgroundImage}>
        <ScrollView contentContainerStyle={styles.view}>{children}</ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
