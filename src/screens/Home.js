import { SidebarView } from 'app/components/SidebarView';
import { FormView } from 'app/layouts/FormView';
import { userCount } from 'app/services/home';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { makeStyles } from 'react-native-elements';
import { BRAND } from 'app/assets/images';
import { BoardCard } from 'app/components/BoardCard';

const useStyles = makeStyles((theme) => ({
  formView: {
    backgroundColor: theme.colors.secondary,
  },
  mainContainer: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: theme.colors.secondary,
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
  const styles = useStyles();

  const get = async () => {
    await userCount().then(({ data }) => {
      setCount(data.num_corredores);
      console.log(JSON.parse(data.marcador)?.length);
      setRunners(JSON.parse(data.marcador)?.map(JSON.parse));
    });
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <SidebarView>
      <FormView style={styles.formView}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Image source={BRAND} style={styles.logo} />
          </View>
          <Text style={styles.userCount}>
            Usuarios registrados: {`${count}`}
          </Text>
          {runners?.map((item, index) => (
            <BoardCard
              key={index}
              avatar={item?.foto}
              name={item?.nombre}
              km={item?.distancia}
              time={item?.tiempo}
              placement={index + 1}
            />
          ))}
        </View>
      </FormView>
    </SidebarView>
  );
};
