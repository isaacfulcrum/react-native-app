import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  makeStyles,
  Button,
  Avatar,
  useTheme,
  Icon,
} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    backgroundColor: theme.colors.secondary,
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
    zIndex: 10,
  },
}));

export const SidebarView = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ window, screen });
  const [user, setUser] = useState({});
  const { theme } = useTheme();

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

  const get = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      setUser(JSON.parse(value));
    }
  };

  useEffect(() => {
    get();
  }, []);

  const DrawerContent = () => {
    return (
      <View style={styles.drawer}>
        <View style={styles.imenu}>
          <Avatar
            size={180}
            rounded
            source={{
              uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
            }}
            title="Picture">
            <Avatar.Accessory size={23} />
          </Avatar>
        </View>
        <Text style={styles.tmenu}>{user.nombre}</Text>
        <Text style={styles.tmenu}>{user.codigo}</Text>
        <Text style={styles.tmenu}>{user.centro}</Text>
        <Button title="Cerrar" onPress={toggleOpen} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MenuDrawer
        open={open}
        position={'left'}
        drawerContent={DrawerContent()}
        drawerPercentage={85}
        animationTime={250}
        overlay={true}
        opacity={1}>
        <View
          style={[
            styles.collapse,
            { marginLeft: dimensions.window.width - 60 },
          ]}>
          <Icon
            name="menu"
            type="material"
            color={theme.colors.secondary}
            onPress={toggleOpen}
          />
        </View>
        <View style={styles.content}>{children}</View>
      </MenuDrawer>
    </View>
  );
};
