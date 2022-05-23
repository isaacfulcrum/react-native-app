import React, { useEffect, useState } from 'react';
import { Alert, LogBox, Text, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Button, makeStyles, useTheme } from 'react-native-elements';
import { MAP_TOKEN } from '@env';
import { save, userKm } from 'app/services/map';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SidebarView } from './SidebarView';
import { getDistance } from 'geolib';
import { secondsToHours, hoursToSeconds } from 'app/utils/carreraUtils';

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
  line: {
    lineColor: 'red',
    lineWidth: 5,
  },
}));

const RNMap = () => {
  const styles = useStyles();
  const [kilometros, setKilometros] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(null);
  const [route, setRoute] = useState(null);

  const { theme } = useTheme();

  const get = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value === null) return;
    await userKm(JSON.parse(value).codigo)
      .then(({ data }) => {
        setKilometros(Number(data.distancia));
        setSeconds(hoursToSeconds(Number(data.tiempo)));
      })
      .catch(console.error);
  };

  useEffect(() => {
    get();
  }, []);

  const onUpdate = (e) => {
    if (!isRecording) return;
    const lat = e.coords.latitude;
    const lon = e.coords.longitude;
    setCoordinates([...coordinates, [Number(lon), Number(lat)]]);
  };

  const onSave = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value === null) return;
    setIsRecording(false);
    clearInterval(timer);
    await save(JSON.parse(value).codigo, kilometros, secondsToHours(seconds))
      .then(({ data }) => {
        if (data === 1) {
          Alert.alert(
            'Avance registro con éxito',
            'Puedes consultar tu lugar en la tabla de marcadores',
          );
        } else {
          Alert.alert('Ocurrió un error', 'Vuelve a intentarlo');
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const len = coordinates.length;
    if (coordinates.length < 2) return;
    const newRoute = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    const distance = getDistance(
      { latitude: coordinates[len - 1][1], longitude: coordinates[len - 1][0] },
      { latitude: coordinates[len - 2][1], longitude: coordinates[len - 2][0] },
    );

    setRoute(newRoute);
    setKilometros(kilometros + distance / 1000);
  }, [coordinates]);

  const startRace = () => {
    setIsRecording(true);
    setTimer(setInterval(() => setSeconds((s) => Number(s + 1)), 1000));
  };

  return (
    <SidebarView>
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
            {() => (
              <Text style={styles.meterText}>
                {kilometros.toFixed(2)} / 10 km
              </Text>
            )}
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            style={styles.meter}
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={secondsToHours(seconds) * 20}
            tintColor={theme.colors.main.blue}
            backgroundColor="#3d5875">
            {() => (
              <Text style={styles.meterText}>
                {secondsToHours(seconds)} / 5 horas
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}>
          <MapboxGL.Camera
            zoomLevel={16}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserLocation
          />
          <MapboxGL.UserLocation
            onUpdate={onUpdate}
            visible
            minDisplacement={5}
          />
          {route && (
            <MapboxGL.ShapeSource id="line1" shape={route}>
              <MapboxGL.LineLayer id="linelayer1" style={styles.line} />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
        <Button
          title={isRecording ? 'Guardar avance' : 'Iniciar carrera'}
          onPress={!isRecording ? startRace : onSave}
        />
      </View>
    </SidebarView>
  );
};

export default RNMap;
