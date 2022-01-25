import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// Assets
import { AHSOKA } from '../assets/images';

const Home = () => {
  return (
    <View>
      <Text style={styles.title}>Ahsoka</Text>
      <Image source={AHSOKA} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  image: {
    paddingHorizontal: 20,
    maxWidth: '40%',
    maxHeight: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Home;
