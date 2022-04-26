import { SidebarView } from 'app/components/SidebarView';
import { userCount } from 'app/services/home';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { makeStyles } from 'react-native-elements';
import { BRAND } from 'app/assets/images';
import { BoardCard } from 'app/components/BoardCard';
import { FlatList } from 'react-native';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    backgroundColor: theme.colors.secondary,
    flexDirection: 'column',
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 350,
    resizeMode: 'contain',
  },
  userCount: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
  },
}));

export const Home = () => {
  const [count, setCount] = useState(0);
  const [runners, setRunners] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const styles = useStyles();

  const get = async () => {
    setRefreshing(true);
    await userCount()
      .then(({ data }) => {
        setCount(data.total);
        setRunners(data.corredores);
      })
      .catch(console.error);
    setRefreshing(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <SidebarView>
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={get}
          refreshing={refreshing}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Image source={BRAND} style={styles.logo} />
              <Text style={styles.userCount}>
                Usuarios registrados: {`${count}`}
              </Text>
            </View>
          }
          data={runners}
          renderItem={({ item, index }) => (
            <BoardCard
              key={index}
              avatar={item?.foto}
              name={item?.nombre}
              vel={parseInt(item?.velocidad, 10)}
              placement={index + 1}
            />
          )}
        />
      </View>
    </SidebarView>
  );
};
