import { SidebarView } from 'app/components/SidebarView';
import { userCount } from 'app/services/home';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  userCount: {
    fontSize: 20,
  },
});

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
      <Text style={styles.userCount}>Usuarios registrados: {`${count}`}</Text>
    </SidebarView>
  );
};
