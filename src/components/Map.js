import React, { useEffect, useState } from 'react';
import { LogBox, Text, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { makeStyles, useTheme } from 'react-native-elements';
import { MAP_TOKEN } from '@env';
import { userKm } from 'app/services/map';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
  'Mapbox error Failed to obtain location update',
  'Switching glyphsRasterizationMode to NoGlyphsRasterizedLocally mode.',
]);

MapboxGL.setAccessToken(MAP_TOKEN);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.secondary,
  },
  map: {
    flex: 1,
  },
  page: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: theme.colors.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  metersContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  meter: {
    marginHorizontal: 10,
  },
  meterText: {
    color: 'white',
    marginTop: 20,
    fontSize: 13,
  },
}));

const RNMap = () => {
  const styles = useStyles();
  const [kilometros, setKilometros] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const { theme } = useTheme();

  const get = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value === null) return;
    await userKm(JSON.parse(value).codigo)
      .then(({ data }) => {
        setKilometros(Number(data));
      })
      .catch(console.error);
  };

  useEffect(() => {
    get();
  }, []);

  const onUpdate = (e) => {
    setCoordinates([e.coords.longitude, e.coords.latitude]);
  };

  useEffect(() => {
    // console.log(coordinates)
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi avance</Text>
      <View style={styles.metersContainer}>
        <AnimatedCircularProgress
          style={styles.meter}
          arcSweepAngle={180}
          rotation={-90}
          size={120}
          width={15}
          fill={kilometros * 10}
          tintColor={theme.colors.main.blue}
          backgroundColor="#3d5875">
          {() => <Text style={styles.meterText}>{kilometros} / 10 km</Text>}
        </AnimatedCircularProgress>
        <AnimatedCircularProgress
          style={styles.meter}
          arcSweepAngle={180}
          rotation={-90}
          size={120}
          width={15}
          fill={60}
          tintColor={theme.colors.main.blue}
          backgroundColor="#3d5875">
          {() => <Text style={styles.meterText}>3 / 5 dias</Text>}
        </AnimatedCircularProgress>
      </View>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={16}
        centerCoordinate={[20.66611, -103.35607]}>
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={[3.33624, 6.57901]}
          animationMode={'flyTo'}
          animationDuration={0}
          followUserLocation
        />
        <MapboxGL.UserLocation onUpdate={onUpdate} visible />
      </MapboxGL.MapView>
    </View>
  );
};

export default RNMap;
