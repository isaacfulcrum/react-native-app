import { SidebarView } from 'app/components/SidebarView';
import { FormView } from 'app/layouts/FormView';
import { userCount } from 'app/services/home';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { makeStyles } from 'react-native-elements';
import { BRAND } from 'app/assets/images';
import { RunnerCard } from 'app/components/RunnerCard';

const runners = [
  {
    name: 'brynn',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    name: 'thot leader',
    avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
  },
  {
    name: 'thot leader',
    avatar:
      'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
  },
];

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
  const styles = useStyles();

  const get = async () => {
    await userCount().then(({ data }) => {
      setCount(data);
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
          {runners.map((item, index) => (
            <RunnerCard
              key={index}
              avatar={item.avatar}
              name={item.name}
              placement={index + 1}
            />
          ))}
        </View>
      </FormView>
    </SidebarView>
  );
};
