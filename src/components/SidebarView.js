import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { makeStyles, Button, Avatar, Icon } from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from 'app/services/auth';
import { actionTypes, MarathonContext } from 'app/context';
import { location } from 'app/utils/permissions';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  drawer: {
    minHeight: '100%',
    backgroundColor: theme.colors.main.blue,
    paddingHorizontal: 15,
  },
  tmenu: {
    fontSize: 25,
    marginBottom: 15,
    color: 'white',
  },
  imenu: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  collapse: {
    display: 'flex',
    position: 'absolute',
    height: 60,
    width: 60,
    marginTop: 10,
    zIndex: 1110,
    borderRadius: 30,
  },
  icon: {
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  buttonIcon: {
    marginRight: 10,
  },
  button: {
    marginVertical: 10,
  },
  content: {
    height: '100%',
  },
}));

export const SidebarView = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ window, screen });
  const [user, setUser] = useState({});
  const { dispatch } = useContext(MarathonContext);
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });

  const styles = useStyles();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout().then(() => {
      dispatch({ type: actionTypes.logout });
    });
  };

  const get = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      setUser(JSON.parse(value));
    }
  };

  useEffect(() => {
    get();
  }, []);

  const navigateMap = () => {
    navigation.navigate('Map');
  };

  const DrawerContent = () => {
    return (
      <View style={styles.drawer}>
        <View style={styles.imenu}>
          <Avatar
            size={180}
            rounded
            source={{
              uri:
                user.foto ??
                'https://ablatival-pools.000webhostapp.com/images/default.jpg',
            }}
            title="Picture">
            <Avatar.Accessory size={23} />
          </Avatar>
        </View>
        <Text style={styles.tmenu}>{user.nombre}</Text>
        <Text style={styles.tmenu}>{user.codigo}</Text>
        <Text style={styles.tmenu}>{user.centro}</Text>
        <Button
          containerStyle={styles.button}
          title="Mapa"
          onPress={navigateMap}
          raised
          icon={
            <Icon
              containerStyle={styles.buttonIcon}
              name="map"
              type="material"
              color="white"
            />
          }
        />
        <Button
          containerStyle={styles.button}
          title="Permisos"
          onPress={location}
          raised
          icon={
            <Icon
              containerStyle={styles.buttonIcon}
              name="location-on"
              type="material"
              color="white"
            />
          }
        />
        <Button
          containerStyle={styles.button}
          title="Cerrar sesión"
          onPress={handleLogout}
          raised
          icon={
            <Icon
              containerStyle={styles.buttonIcon}
              name="logout"
              type="material"
              color="white"
            />
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MenuDrawer
        open={open}
        position={'left'}
        drawerContent={DrawerContent()}
        drawerPercentage={80}
        animationTime={250}
        overlay={true}
        opacity={1}>
        <View
          style={[
            styles.collapse,
            { marginLeft: dimensions.window.width - 60 },
          ]}>
          <Icon
            containerStyle={styles.icon}
            name={open ? 'arrow-back-ios' : 'menu'}
            type="material"
            color="white"
            onPress={toggleOpen}
          />
        </View>
        <View style={styles.content}>{children}</View>
      </MenuDrawer>
    </View>
  );
};
