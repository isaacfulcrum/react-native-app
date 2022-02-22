import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { makeStyles } from 'react-native-elements';
import { BRAND_HORIZONTAL } from 'app/assets/images';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    maxHeight: 70,
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
    alignSelf: 'center',
  },
}));

export const Header = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={BRAND_HORIZONTAL} style={styles.logo} />
      </View>
    </SafeAreaView>
  );
};
