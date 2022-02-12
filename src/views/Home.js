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
  image: {
    alignSelf: 'center',
    maxHeight: 300,
    maxWidth: '40%',
    paddingHorizontal: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Home;
